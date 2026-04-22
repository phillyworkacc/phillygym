"use server"
import { db } from "@/db";
import { usersTable } from "@/db/schemas";
import { useAllowedUserType } from "@/helpers/funcs"
import { eq } from "drizzle-orm";

export async function userBanSetting (userid: string, banState: boolean) {
   const result = await useAllowedUserType("admin", async (user) => {
      const res = await db.update(usersTable).set({ banned: banState }).where(eq(usersTable.userid, userid));
      return (res.rowCount === 1);
   });
   if (result == "no-user") return false;
   if (result == "not-allowed") return false;
   return result;
}

export async function userSuspensionSetting (userid: string, suspensionState: boolean) {
   const result = await useAllowedUserType("admin", async (user) => {
      const res = await db.update(usersTable).set({ suspended: suspensionState }).where(eq(usersTable.userid, userid));
      return (res.rowCount === 1);
   });
   if (result == "no-user") return false;
   if (result == "not-allowed") return false;
   return result;
}