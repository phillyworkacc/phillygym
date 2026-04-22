'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Spacing from "@/components/Spacing/Spacing";
import { userBanSetting, userSuspensionSetting } from "@/app/actions/admin";
import { BodyContent, Heading, SubHeading } from "@/components/CourseFormats/CourseFormats";
import { CustomIcon } from "@/components/Icons/Icon";
import { User } from "@/types/types"
import { formatMilliseconds } from "@/utils/date";
import { Ban, CircleOff, Flag, FlagOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AdminViewUserProps = {
   user: User;
}

export default function AdminViewUser ({ user }: AdminViewUserProps) {
   const router = useRouter();

   const handleBan = async (callback: Function) => {
      const madeBanUpdate = await userBanSetting(user.userid, user.banned ? false : true);
      if (madeBanUpdate) toast.success("Success!"); else toast.success("Failed to make change to user");
      callback();
      router.refresh();
   }
   
   const handleSuspension = async (callback: Function) => {
      const madeSuspensionUpdate = await userSuspensionSetting(user.userid, user.suspended ? false : true);
      if (madeSuspensionUpdate) toast.success("Success!"); else toast.success("Failed to make change to user");
      callback();
      router.refresh();
   }

   return (
      <AppWrapper>
         <Breadcrumb
            pages={[
               { label: "Admin", href: "/admin" },
               { label: user.name, href: "" },
            ]}
            hideDashboardLink
         />
         <Spacing />
         <CustomIcon url={user.profileImage!} size={70} round />
         <Heading>{user.name}</Heading>
         <SubHeading>{user.email}</SubHeading>
         <SubHeading>{user.premiumAccess ? "Premium User" : "Not Premium"}</SubHeading>
         <div className="box full pd-2 dfb flex-wrap gap-10">
            <AwaitButton 
               className="xxs pd-11 pdx-2 yellow"
               onClick={handleSuspension}
               blackSpinner
            >
               {(user.suspended) ? (<>
                  <FlagOff size={17 }/> Remove Suspension
               </>) : (<>
                  <Flag size={17 }/> Suspend
               </>)}
            </AwaitButton>
            <AwaitButton 
               className="xxs pd-11 pdx-2 delete"
               onClick={handleBan}
            >
               {user.banned ? (<>
                  <CircleOff size={17} /> UnBan
               </>) : (<>
                  <Ban size={17} /> Ban
               </>)}
            </AwaitButton>
         </div>
         <BodyContent>Joined on {formatMilliseconds(parseInt(user.joined!), true)}</BodyContent>
      </AppWrapper>
   )
}
