import { redirectAuthorized } from "@/helpers/redirects"
import LoginForm from "./LoginForm";

export default async function LoginPage () {
   await redirectAuthorized();
   return <LoginForm />
}
