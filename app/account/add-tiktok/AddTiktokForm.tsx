'use client'
import { User } from "@/types/types"
import { Heading, SubHeading, FormContent } from "@/components/CourseFormats/CourseFormats"
import { CourseItemsNavBar } from "@/components/CourseItems/CourseItems"
import { useState } from "react"
import { updateSocials } from "@/app/actions/user"
import { toast } from "sonner"
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import AwaitButton from "@/components/AwaitButton/AwaitButton"

export default function AddTiktokForm ({ user }: { user: User }) {
   const [tiktokUsername, setTiktokUsername] = useState(user.tiktok || "");

   async function handleUpdateTiktokUser (callback: Function) {
      const updated = await updateSocials({ tiktok: tiktokUsername });
      if (updated) toast.success("Updated!"); else toast.error("Failed to update your instagram username");
      callback();
   }

   return (
      <AppWrapper>
         <CourseItemsNavBar />
         <Heading>TikTok Username</Heading>
         <SubHeading>Please enter your tiktok user, so that it can be visible by other members</SubHeading>
         <FormContent styles={{ padding: "10px 0" }}>
            <input 
               type="text"
               className="xs pd-14 pdx-2"
               placeholder="TikTok Username"
               value={tiktokUsername}
               onChange={e => setTiktokUsername(e.target.value)}   
            />
         </FormContent>
         <div className="text-xxxs full grey-5 pd-05">
            If you don't want your tiktok to show on your profile, just leave the box empty.
         </div>
         <FormContent styles={{ padding: "20px 0" }}>
            <AwaitButton
               className="xs pd-15 pdx-6"
               onClick={handleUpdateTiktokUser}
            >
               Add
            </AwaitButton>
         </FormContent>
      </AppWrapper>
   )
}
