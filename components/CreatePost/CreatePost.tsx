'use client'
import "./CreatePost.css"
import { useSessionUser } from "@/helpers/useSessionUser";
import { Plus } from "lucide-react"
import { useModal } from "../Modal/ModalContext";
import { BodyContent, SubHeading } from "../CourseFormats/CourseFormats";
import Spacing from "../Spacing/Spacing";

type CreatePostProps = {
   onClick: () => void;
}

export default function CreatePost ({ onClick }: CreatePostProps) {
   const { user } = useSessionUser();
   const { showModal, close } = useModal();

   function handleCreatePostBtn () {
      if (user?.suspended) {
         showModal({
            content: (<>
               <div className="box full pd-2 pdx-2">
                  <SubHeading>Suspension</SubHeading>
                  <BodyContent>Hi {user?.name}, you have been suspended from making posts on the PhillyGym Community</BodyContent>
                  <Spacing />
                  <button className="xxxs full outline-black tiny-shadow" onClick={close}>
                     Close
                  </button>
               </div>
            </>),
            noCloseBtn: true
         })
      } else {
         onClick();
      }
   }

   return (
      <div className="create-post-add-btn">
         <div className="pgc-container">
            <button 
               className="pd-15 pdx-15"
               onClick={handleCreatePostBtn}
            >
               <Plus size={25} />
            </button>
         </div>
      </div>
   )
}
