import { createUserAccount } from "@/app/actions/user";
import { db } from "@/db";
import { usersTable } from "@/db/schemas";
import { hashedPassword } from "@/utils/uuid";
import { and, eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
   session: {
      strategy: "jwt"
   },
   providers: [
      CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {},
				password: {}
			},
         async authorize (credentials, req) {
            if (credentials?.email == "" || credentials?.password == "") {
               return null;
            } else {
               const results = await db
                  .select().from(usersTable)
                  .where(and(
                     eq(usersTable.email, credentials?.email!),
                     eq(usersTable.password, hashedPassword(credentials?.password!))
                  )).limit(1);
               
               if (results.length > 0) {
                  return {
                     id: results[0].userid,
                     email: results[0].email,
                     name: results[0].name == "" ? results[0].email : results[0].name,
                     image: results[0].profileImage
                  }
               } else {
                  const result = await createUserAccount(credentials?.email!, credentials?.email!, credentials?.password!);
                  if (result) {
                     return {
                        id: '',
                        email: credentials?.email!,
                        name: credentials?.email!,
                        image: 'user-default.jpg'
                     }
                  } else return null;
               }
            }
         }
      })
   ],
   callbacks: {
      async session ({ session, token }) {
         // Example: attach latest user data
         if (session.user) {
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.image = token.picture;
         }
         return session;
      },
      jwt: async ({ user, token, trigger, session }) => {
         if (trigger == "update") {
            return { ...token, ...session.user }
         }
         return { ...token, ...user }
      }
   }
}