import { redirectUnauthorized } from "@/helpers/redirects";
import MusclesPage from "./MusclesPage";

export default async function Muscles () {
   await redirectUnauthorized();
   return <MusclesPage />
}