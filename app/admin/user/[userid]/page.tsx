import { db } from "@/db";
import { usersTable } from "@/db/schemas";
import { useAllowedUserType } from "@/helpers/funcs";
import { allowOnlyUserTypeRedirect, redirectUnauthorized } from "@/helpers/redirects";
import { eq } from "drizzle-orm";
import AdminViewUser from "./AdminViewUser";
import sanitise from "@/utils/sanitise";

type AdminViewUserPageProps = {
   params: Promise<{
      userid: string;
   }>
}

export default async function AdminViewUserPage ({ params }: AdminViewUserPageProps) {
   await redirectUnauthorized();
   await allowOnlyUserTypeRedirect("admin");

   const { userid } = await params;
   const user = await useAllowedUserType("admin", async (user) => {
      const res = await db.select().from(usersTable)
         .where(eq(usersTable.userid, userid)).limit(1);
      return res;
   })

   if (!user) return null;

   return <AdminViewUser user={sanitise(user[0])}  />
}
