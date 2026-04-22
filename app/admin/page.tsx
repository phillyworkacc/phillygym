import { allowOnlyUserTypeRedirect, redirectUnauthorized } from "@/helpers/redirects";
import { useAllowedUserType } from "@/helpers/funcs";
import { db } from "@/db";
import { usersTable } from "@/db/schemas";
import { redirect } from "next/navigation";
import sanitise from "@/utils/sanitise";
import AdminPage from "./AdminPage";

export default async function page() {
   await redirectUnauthorized();
   await allowOnlyUserTypeRedirect("admin");

   const result = await useAllowedUserType("admin", async (user) => {
      return await db.select().from(usersTable);
   });

   if (result == "no-user") return null;
   if (result == "not-allowed") redirect("/account");

   return <AdminPage users={sanitise(result)} />
}
