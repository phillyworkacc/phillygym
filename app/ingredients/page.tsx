import { redirectUnauthorized } from "@/helpers/redirects";
import IngredientsPage from "./IngredientsPage";

export default async function Ingredients () {
   await redirectUnauthorized();
   return <IngredientsPage />
}