'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import Spacing from "@/components/Spacing/Spacing"
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import ProfileImageChanger from "@/components/ProfileImageChanger/ProfileImageChanger";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import BackTick from "@/components/BackTick/BackTick";
import { FormContent, Heading, SubHeading } from "@/components/CourseFormats/CourseFormats"
import { useState } from "react";
import { useSessionUser } from "@/helpers/useSessionUser";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ChangeProfilePictureForm () {
   const router = useRouter();
   const { data: session, status, update } = useSession();
   const { updatePicture } = useSessionUser();
   const [imageFile, setImageFile] = useState<File | null>(null);

   const handleSaveChanges = async (callback: Function) => {
      if (imageFile == null) {
         toast.error("Please choose a profile picture");
         callback();
         return;
      }
      const pictureUrl = await updatePicture(imageFile);
      if (pictureUrl) {
         toast.success("Updated your profile picture!");
         await update({
            user: { picture: pictureUrl }
         });
         router.refresh()
      } else toast.error("Failed to update your profile picture");
      callback();
   }

   if (status == "loading") return <LoadingPage />

   return (
      <AppWrapper>
         <BackTick action={() => router.push("/account")}>Back to Account</BackTick>
         <Heading>Account Details</Heading>
         <SubHeading>Change Profile Picture</SubHeading>
         <Spacing />
         <FormContent>
            <ProfileImageChanger
               onChange={img => setImageFile(img)}
            />
         </FormContent>
         <Spacing />
         <FormContent>
            <AwaitButton className="xs pd-15 pdx-5" onClick={handleSaveChanges}>
               Change
            </AwaitButton>
         </FormContent>
      </AppWrapper>
   )
}
