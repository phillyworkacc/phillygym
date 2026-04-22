'use client'
import "./ProfileImageChanger.css"
import Spacing from "../Spacing/Spacing";
import { ChangeEvent, useState } from "react";
import { useSession } from "next-auth/react";

type ProfileImageChangerProps = {
   onChange: (file: File) => void;
}

export default function ProfileImageChanger ({ onChange }: ProfileImageChangerProps) {
   const { data: session, status } = useSession();
   const [newImage, setNewImage] = useState("");

   function handleImgUpload (event: ChangeEvent<HTMLInputElement>) {
      const file = event.target.files![0];
      if (!file) return;
      onChange(file);
      
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
         setNewImage(ev?.target?.result! as string);
      };
      fileReader.readAsDataURL(file);
   }

   if (status == "loading") return null;

   return (
      <div className="profile-image-changer">
         <div className="info-label">
            <div className="text-xs fit">Click to change picture</div>
         </div>
         <Spacing />
         <label htmlFor="file">
            <div className="profile-image-viewer">
               <img src={(newImage == "") ? session?.user?.image! : newImage} alt="profile-image" />
            </div>
            <input 
               type="file" name="file" id="file"
               onChange={handleImgUpload}
               accept=".jpg,.png"
            />
         </label>
      </div>
   )
}
