import { redirectUnauthorized } from "@/helpers/redirects";
import AccountDetails from "./AccountDetails";

export default async function AccountPage () {
   await redirectUnauthorized();
   return <AccountDetails />
}
