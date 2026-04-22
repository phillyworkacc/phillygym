'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import CourseItems from "@/components/CourseItems/CourseItems";
import Spacing from "@/components/Spacing/Spacing";
import { useSessionUser } from "@/helpers/useSessionUser"

export default function HomePage() {
   const { user } = useSessionUser();;

   return (
      <AppWrapper>
         <div className="text-ml bold-700 full">Hi {user?.name.split("@")[0]}</div>
         <Spacing />
         <CourseItems />
      </AppWrapper>
   )
}