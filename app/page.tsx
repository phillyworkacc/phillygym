import { redirectUnauthorized } from "@/helpers/redirects";
import HomePage from "./HomePage";

export default async function page() {
	await redirectUnauthorized();
	return <HomePage />
}
