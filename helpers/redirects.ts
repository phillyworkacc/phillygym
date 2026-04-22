import { getSessionUser } from "@/app/actions/user";
import { authOptions } from "@/lib/authOptions";
import { UserType } from "@/types/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const loginUrl = "/login"
const userTypeUrlRedirects: Record<UserType, string> = {
   "admin": '/admin',
   "user": '/account'
}

export async function redirectUnauthorized () {
   const session = await getServerSession(authOptions);
   if (!session?.user) redirect(loginUrl);
   const sessionUser = await getSessionUser();
   if (sessionUser === "no-session") redirect(loginUrl);
   if (sessionUser === null) redirect(loginUrl);
   if (sessionUser.banned) redirect("/banned");
}

export async function redirectAuthorized () {
   const sessionUser = await getSessionUser();
   if (sessionUser === "no-session") return;
   if (sessionUser === null) return;
   if (sessionUser.banned) redirect("/banned");
   if (sessionUser.type == "admin") redirect(userTypeUrlRedirects[sessionUser.type]);
   if (sessionUser.type == "user") redirect(userTypeUrlRedirects[sessionUser.type]);
}

export async function redirectAdminOnly () {
   const sessionUser = await getSessionUser();
   if (sessionUser === "no-session") redirect(loginUrl)
   if (sessionUser === null) return;
   if (sessionUser.banned) redirect("/banned");
   if (sessionUser.type == "user") return;
   if (sessionUser.type === "admin") redirect(userTypeUrlRedirects[sessionUser.type]);
}

export async function allowOnlyUserTypeRedirect (userType: UserType) {
   const sessionUser = await getSessionUser();
   if (sessionUser === "no-session") redirect(loginUrl);
   if (sessionUser === null) redirect(loginUrl);
   if (sessionUser.banned) redirect("/banned");
   if (sessionUser.type !== userType) redirect(userTypeUrlRedirects[sessionUser.type]);
}