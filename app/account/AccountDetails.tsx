'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import Card from "@/components/Card/Card"
import Spacing from "@/components/Spacing/Spacing"
import { Heading } from "@/components/CourseFormats/CourseFormats"
import { useSessionUser } from "@/helpers/useSessionUser"
import { ChevronRight, Crown, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { InstagramIcon, TiktokIcon } from "@/components/Icons/Icon"
import { ellipsisText } from "@/utils/utils"
import LoadingPage from "@/components/LoadingPage/LoadingPage"

export default function AccountDetails () {
   const { user } = useSessionUser();
   const router = useRouter();
   const sectionStyles: React.CSSProperties = {
      width: "100%", maxWidth: "400px",
      border: "1px solid #ececec",
      borderRadius: "20px", padding: "20px",
      background: "#efefef", cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.12)"
   }

   const sections = [
      { name: "Edit Profile", url: "/account/edit-profile" },
      { name: "Change Profile Picture", url: "/account/change-profile-picture" },
      { name: "Change Password", url: "/account/change-password" },
   ]

   if (user == null) return <LoadingPage />

   return (
      <AppWrapper>
         <Heading>Account Details</Heading>
         <Spacing />
         <div className="box full dfb column gap-10">
            {sections.map(section => (
               <Card key={section.name} styles={sectionStyles} onClick={() => router.push(section.url)}>
                  <div className="box full dfb align-center">
                     <div className="text-s bold-600 full">{section.name}</div>
                     <ChevronRight size={24} />
                  </div>
               </Card>
            ))}
            <Card styles={{ ...sectionStyles, background: "#ff7ab8" }} onClick={() => router.push("/account/add-instagram")}>
               <div className="box full dfb align-center">
                  <div className="text-s bold-600 full dfb align-center gap-5">
                     {user?.instagram == "" ? "Add Instagram" : ellipsisText(user?.instagram!, 10)} <InstagramIcon size={25} />
                  </div>
                  <ChevronRight size={24} />
               </div>
            </Card>
            <Card styles={{ ...sectionStyles, background: "#a7a7a7" }} onClick={() => router.push("/account/add-tiktok")}>
               <div className="box full dfb align-center">
                  <div className="text-s bold-600 full dfb align-center gap-5">
                     {user?.tiktok == "" ? "Add Tiktok" : ellipsisText(user?.tiktok!, 10)} <TiktokIcon size={25} />
                  </div>
                  <ChevronRight size={24} />
               </div>
            </Card>
            {(user?.type == "admin") && (<>
               <Card styles={{ ...sectionStyles, background: "#84a1ff" }} onClick={() => router.push("/admin")}>
                  <div className="box full dfb align-center">
                     <div className="text-s bold-600 full dfb align-center gap-5">Admin</div>
                     <ChevronRight size={24} />
                  </div>
               </Card>
            </>)}
            <Card styles={{ ...sectionStyles, background: "#ffb184" }}>
               <div className="box full dfb align-center">
                  <div className="text-s bold-600 full dfb align-center gap-5">Become Premium <Crown size={20} /></div>
                  <ChevronRight size={24} />
               </div>
            </Card>
            <Card styles={{ ...sectionStyles, background: "#ffe884" }} onClick={() => signOut()}>
               <div className="box full dfb align-center">
                  <div className="text-s bold-600 full dfb align-center gap-5">Sign Out</div>
                  <LogOut size={24} />
               </div>
            </Card>
         </div>
      </AppWrapper>
   )
}
