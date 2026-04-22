import { redirectUnauthorized } from "@/helpers/redirects";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function ChangePasswordPage () {
   await redirectUnauthorized();
   return <ChangePasswordForm />
}
