import { redirectUnauthorized } from "@/helpers/redirects";
import { getSessionUser } from "@/app/actions/user";
import sanitise from "@/utils/sanitise";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import AddInstagramForm from "./AddInstagramForm";

export default async function AddInstagramPage () {
   await redirectUnauthorized();

   const user = await getSessionUser();

   if (user == "no-session") return <LoadingPage />;
   if (!user) return <LoadingPage />;

   return <AddInstagramForm user={sanitise(user)} />
}