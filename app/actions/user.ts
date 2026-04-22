"use server"
import { db } from "@/db";
import { usersTable } from "@/db/schemas";
import { useAuthorizedUser } from "@/helpers/funcs";
import { authOptions } from "@/lib/authOptions"
import { User } from "@/types/types";
import { hashedPassword, generateId } from "@/utils/uuid";
import { and, eq, like, ne, or, sql } from "drizzle-orm";
import { getServerSession } from "next-auth"
import { uploadImageToCloudinary } from "./extras";


export async function getSessionUser (): Promise<"no-session" | null | User> {
   const session = await getServerSession(authOptions);
   if (!session) return "no-session";
   if (!session.user) return "no-session";

   const results = await db.select()
      .from(usersTable)
      .where(eq(usersTable.email, session.user.email!));

   return results.length > 0 ? results[0] as User : null;
}

export async function createUserAccount (name: string, email: string, password: string) {
   try {
      const userid = generateId();
      const hashedPwd = hashedPassword(password);
      const res = await db.insert(usersTable).values({
         userid, name, email, password: hashedPwd, profileImage: "user-default.jpg",
         instagram: "", tiktok: "", suspended: false, banned: false,
         joined: Date.now().toString()
      });
      return (res.rowCount > 0)
   } catch (e) {
      console.log(e)
      return false;
   }
}

export async function createAdminAccount (name: string, email: string, password: string) {
   try {
      const userid = generateId();
      const hashedPwd = hashedPassword(password);
      const res = await db.insert(usersTable).values({
         userid, name, email, password: hashedPwd, profileImage: "",
         type: "admin", joined: Date.now().toString()
      });
      return (res.rowCount > 0)
   } catch (e) {
      console.log(e)
      return false;
   }
}

export async function updateAccount (name: string, email: string) {
   try {
      const result = await useAuthorizedUser(async (user) => {
         return await db.update(usersTable)
            .set({ name, email })
            .where(and(
               eq(usersTable.userid, user.userid),
               eq(usersTable.email, user.email),
            ));
      });
      if (result == "no-user") return false;
      return (result.rowCount > 0)
   } catch (e) {
      console.log(e)
      return false;
   }
}

export async function updateAccountImage (file: File) {
   try {
      const result = await useAuthorizedUser(async (user) => {
         const profileImage = await uploadImageToCloudinary(file);
         if (profileImage === undefined) return false;

         const res = await db.update(usersTable)
            .set({ profileImage })
            .where(and(
               eq(usersTable.userid, user.userid),
               eq(usersTable.email, user.email),
            ));
         
         return (res.rowCount === 1) ? profileImage : false;
      });
      return result;
   } catch (e) {
      console.log(e)
      return false;
   }
}

type UpdateSocialsParams = {
   tiktok?: string;
   instagram?: string;
}
export async function updateSocials (updateQuery: UpdateSocialsParams) {
   try {
      const result = await useAuthorizedUser(async (user) => {
         const res = await db.update(usersTable)
            .set({ ...updateQuery })
            .where(and(
               eq(usersTable.userid, user.userid),
               eq(usersTable.email, user.email),
            ));
         
         return (res.rowCount === 1);
      });
      return result;
   } catch (e) {
      console.log(e)
      return false;
   }
}

export async function changeAccountPassword (password: string) {
   try {
      const result = await useAuthorizedUser(async (user) => {
         const res = await db.update(usersTable)
            .set({ password: hashedPassword(password) })
            .where(and(
               eq(usersTable.userid, user.userid),
               eq(usersTable.email, user.email),
            ));
         
         return (res.rowCount === 1);
      });
      return result;
   } catch (e) {
      console.log(e)
      return false;
   }
}

export async function searchUsers (searchQuery: string): Promise<User[] | false> {
   try {
      const result = await useAuthorizedUser(async (user) => {
         const res = await db.select().from(usersTable)
            .where(
               and(
                  ne(usersTable.userid, user.userid),
                  or(
                     sql`LOWER(${usersTable.name}) LIKE LOWER(${`%${searchQuery}%`})`,
                     sql`LOWER(${usersTable.instagram}) LIKE LOWER(${`%${searchQuery}%`})`,
                     sql`LOWER(${usersTable.tiktok}) LIKE LOWER(${`%${searchQuery}%`})`
                  )
               )
            );
         
         return res;
      });
      return result;
   } catch (e) {
      console.log(e)
      return false;
   }
}

export async function getFullUserProfile (userid: string) {
   try {
      const user = await db.query.usersTable.findFirst({
         where: eq(usersTable.userid, userid),
         with: {
            posts: {
               limit: 3,
               with: { likes: true, user: true, replies: { limit: 1 } }
            }
         },
      });
      return user;
   } catch (e) {
      console.log(e)
      return false;
   }
}