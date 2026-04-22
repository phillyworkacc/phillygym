import { redirectUnauthorized } from "@/helpers/redirects";
import { getSessionUser } from "@/app/actions/user";
import sanitise from "@/utils/sanitise";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import AddTiktokForm from "./AddTiktokForm";

export default async function AddTikTokPage () {
   await redirectUnauthorized();

   const user = await getSessionUser();

   if (user == "no-session") return <LoadingPage />;
   if (!user) return <LoadingPage />;

   return <AddTiktokForm user={sanitise(user)} />
}