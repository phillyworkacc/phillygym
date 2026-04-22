import { redirectUnauthorized } from "@/helpers/redirects";
import { getSessionUser } from "@/app/actions/user";
import EditProfileForm from "./EditProfileForm";
import sanitise from "@/utils/sanitise";
import LoadingPage from "@/components/LoadingPage/LoadingPage";

export default async function AccountPage () {
   await redirectUnauthorized();

   const user = await getSessionUser();

   if (user == "no-session") return <LoadingPage />;
   if (!user) return <LoadingPage />;

   return <EditProfileForm user={sanitise(user)} />
}