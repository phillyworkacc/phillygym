import { redirectUnauthorized } from "@/helpers/redirects";
import MealsPage from "./MealsPage";

export default async function Meals () {
   await redirectUnauthorized();
   return <MealsPage />
}