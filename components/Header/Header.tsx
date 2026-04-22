'use client'
import "./Header.css"
import { CustomUserIcon, PhillyGymLogo } from "../Icons/Icon"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { ChevronDown, Download, Home, MessageCircle } from "lucide-react";
import { useModal } from "../Modal/ModalContext";
import { posterBannerImage } from "@/utils/images";
import Spacing from "../Spacing/Spacing";

export default function Header() {
   const router = useRouter();
   const { data: session } = useSession();
   const { showModal, close } = useModal();

   const openNavigation = () => {
      const openLink = (url: string) => {
         router.push(url);
         close();
      }
      showModal({
         modalBoxStyles: { padding: 0, overflow: "hidden" },
         content: (<>
            <img 
               src={posterBannerImage} 
               alt="poster image" 
               style={{
                  width: "100%", height: "200px",
                  borderRadius: "15px 15px 0 0",
                  objectFit: "cover", objectPosition: "center"
               }} 
            />
            <Spacing />
            <div className="box full pd-1 pdx-2">
               <div className="text-sm bold-600 full cursor-pointer dfb align-center gap-10" onClick={() => openLink("/")}>
                  <Home size={18} strokeWidth={3} /> Home
               </div>
            </div>
            <div className="box full pd-1 pdx-2">
               <div className="text-sm bold-600 full cursor-pointer dfb align-center gap-10" onClick={() => openLink("/community")}>
                  <MessageCircle size={18} strokeWidth={3} /> Community
               </div>
            </div>
            <div className="box full pd-1 pdx-2">
               <div className="text-sm bold-600 full cursor-pointer dfb align-center gap-10" onClick={() => openLink("/install")}>
                  <Download size={18} strokeWidth={3} /> Install as App
               </div>
            </div>
            <div className="box full pd-15 pdx-2">
               <button
                  className="xxs outline-black tiny-shadow pd-1 full"
                  onClick={close}
               >
                  Close
               </button>
            </div>
         </>),
         noCloseBtn: true,
      })
   }

   return (
      <div className='header'>
         <div className="header-container">
            <div className="box full dfb align-center">
               <div className="box full dfb align-center justify-start">
                  <div className="box fit dfb align-center justify-start gap-5 cursor-pointer" onClick={openNavigation}>
                     <PhillyGymLogo size={20} />
                     <ChevronDown strokeWidth={4} size={20} />
                  </div>
               </div>
               <div className="box fit cursor-pointer" onClick={() => router.push("/account")}>
                  <CustomUserIcon url={session?.user?.image!} size={35} round />
               </div>
            </div>
         </div>
      </div>
   )
}
