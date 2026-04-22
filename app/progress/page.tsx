import { redirectUnauthorized } from "@/helpers/redirects";
import ProgressPage from "./ProgressPage";

export default async function page() {
   await redirectUnauthorized();
   return <ProgressPage />
}
