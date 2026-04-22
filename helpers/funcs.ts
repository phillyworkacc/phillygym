import { getSessionUser } from "@/app/actions/user";
import { UserType, User } from "@/types/types";

export async function useAuthorizedUser (operation: (user: User) => any) {
   const sessionUser = await getSessionUser();
   if (sessionUser === "no-session") return "no-user"
   if (sessionUser === null) return "no-user";
   return operation(sessionUser);
}

export async function useAllowedUserType (userType: UserType, operation: (user: User) => any) {
   const sessionUser = await getSessionUser();
   if (sessionUser === "no-session") return "no-user"
   if (sessionUser === null) return "no-user";
   if (sessionUser.type !== userType) return "not-allowed";
   return operation(sessionUser)
}