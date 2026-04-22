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

export default function EditProfileForm ({ user }: { user: User }) {
   const router = useRouter();
   const [name, setName] = useState(user.name);
   const [email, setEmail] = useState(user.email);
   const { data: session, update } = useSession();
   const { update: updateUser } = useSessionUser();

   const handleSaveChanges = async (callback: Function) => {
      if (name == "") {
         toast.error("Please enter your name");
         callback();
         return;
      }
      if (email == "") {
         toast.error("Please enter your email");
         callback();
         return;
      }
      const updated = await updateUser({ name, email });
      if (updated) {
         toast.success("Updated your profile successfully!");
         await update({
            user: { name, email }
         })
      }else toast.error("Failed to update your profile");
      callback();
   }

   return (
      <AppWrapper>
         <BackTick action={() => router.push("/account")}>Back to Account</BackTick>
         <Heading>Account Details</Heading>
         <SubHeading>Edit Profile</SubHeading>
         <Spacing />
         <FormContent>
            <input 
               type="text"
               className="xs pd-13 pdx-2"
               placeholder="Name"
               value={name}
               onChange={e => setName(e.target.value)}
            />
         </FormContent>
         <Spacing />
         <FormContent>
            <input 
               type="text"
               className="xs pd-13 pdx-2"
               placeholder="Email"
               value={email}
               onChange={e => setEmail(e.target.value)}
            />
         </FormContent>
         <Spacing />
         <FormContent>
            <AwaitButton className="xs pd-15 pdx-5" onClick={handleSaveChanges}>
               Save Changes
            </AwaitButton>
         </FormContent>
      </AppWrapper>
   )
}
