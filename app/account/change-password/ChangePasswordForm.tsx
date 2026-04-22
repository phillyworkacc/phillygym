'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import Spacing from "@/components/Spacing/Spacing"
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import BackTick from "@/components/BackTick/BackTick";
import { FormContent, Heading, SubHeading } from "@/components/CourseFormats/CourseFormats"
import { useState } from "react";
import { useSessionUser } from "@/helpers/useSessionUser";
import { User } from "@/types/types";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { changeAccountPassword } from "@/app/actions/user";

export default function ChangePasswordForm () {
   const router = useRouter();
   const [password, setPassword] = useState("");
   const [password2, setPassword2] = useState("");

   const handleChangePassword = async (callback: Function) => {
      if (password == "") {
         toast.error("Please enter a password");
         callback();
         return;
      }
      if (password !== password2) {
         toast.error("Passwords do not match");
         callback();
         return;
      }
      const changed = await changeAccountPassword(password);
      if (changed) {
         setPassword("");
         setPassword2("");
         toast.success("Changed your password successfully!");
      } else toast.error("Failed to change your password");
      callback();
   }

   return (
      <AppWrapper>
         <BackTick action={() => router.push("/account")}>Back to Account</BackTick>
         <Heading>Account Details</Heading>
         <SubHeading>Change Password</SubHeading>
         <Spacing />
         <FormContent>
            <input 
               type="password"
               className="xs pd-13 pdx-2"
               placeholder="Password"
               value={password}
               onChange={e => setPassword(e.target.value)}
            />
         </FormContent>
         <Spacing />
         <FormContent>
            <input 
               type="password"
               className="xs pd-13 pdx-2"
               placeholder="Password (again)"
               value={password2}
               onChange={e => setPassword2(e.target.value)}
            />
         </FormContent>
         <Spacing />
         <FormContent>
            <AwaitButton className="xs pd-15 pdx-5" onClick={handleChangePassword}>
               Change
            </AwaitButton>
         </FormContent>
      </AppWrapper>
   )
}
