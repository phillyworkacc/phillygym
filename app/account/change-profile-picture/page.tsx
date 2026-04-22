import { redirectUnauthorized } from "@/helpers/redirects";
import ChangeProfilePictureForm from "./ChangeProfilePictureForm";

export default async function AccountPage () {
   await redirectUnauthorized();
   return <ChangeProfilePictureForm />
}