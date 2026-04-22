import { redirectUnauthorized } from "@/helpers/redirects";
import InstallGuide from "./InstallGuide";

export default async function InstallPage () {
   await redirectUnauthorized();
   return <InstallGuide />
}