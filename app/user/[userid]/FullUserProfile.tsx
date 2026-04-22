'use client'
import { CustomUserIcon, InstagramIcon, TiktokIcon } from "@/components/Icons/Icon";
import type { FullPost, User } from "@/types/types"
import { formatMilliseconds } from "@/utils/date";
import { ellipsisText } from "@/utils/utils";
import { SquareArrowOutUpRight } from "lucide-react";
import { SubHeading } from "@/components/CourseFormats/CourseFormats";
import { PostsViewerPlain } from "@/components/PostsViewer/PostsViewer";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import Card from "@/components/Card/Card";
import Link from "next/link";
import Spacing from "@/components/Spacing/Spacing";

type FullUserProfile = {
   fullUserProfile: User & {
      posts: FullPost[];
   }
}

export default function FullUserProfile ({ fullUserProfile: user }: FullUserProfile) {
   const instagramCardStyles: React.CSSProperties = {
      width: "100%", borderRadius: "15px", maxWidth: "500px",
      padding: "10px", border: "1px solid #ff7ab8"
   }

   const tiktokCardStyles: React.CSSProperties = {
      width: "100%", borderRadius: "15px", maxWidth: "500px",
      padding: "10px", border: "1px solid #0a0a0a"
   }

   return (
      <AppWrapper>
         <div className="box full pdx-2 pd-2 dfb column gap-5" style={{ minHeight: "40vh" }}>
            <div className="box full dfb align-center gap-10 mb-2">
               <div className="box fit h-full">
                  <CustomUserIcon size={130} url={user.profileImage!} round />
               </div>
            </div>
            <div className="box full dfb column">
               <div className="text-m full bold-700 line-height-13">{user.name}</div>
               <div className="text-xxs full grey-4 line-height-13">{user.premiumAccess ? "Premium" : "Member"}</div>
            </div>
            {(user.instagram !== "" && (<div className="box full pd-05">
               <Link href={`https://instagram.com/${user.instagram}`} target="_blank">
                  <Card styles={instagramCardStyles} cursor>
                     <div className="box full dfb align-center gap-10">
                        <InstagramIcon size={35} />
                        <div className="text-s bold-600 full dfb align-center gap-5">{ellipsisText(user.instagram, 10)}</div>
                        <SquareArrowOutUpRight size={24} />
                     </div>
                  </Card>
               </Link>
            </div>))}
            {(user.tiktok !== "" && (<div className="box full pd-05">
               <Link href={`https://tiktok.com/@${user.tiktok}`} target="_blank">
                  <Card styles={tiktokCardStyles} cursor>
                     <div className="box full dfb align-center gap-10">
                        <TiktokIcon size={35} />
                           <div className="text-s bold-600 full dfb align-center gap-5">{ellipsisText(user.tiktok, 10)}</div>
                        <SquareArrowOutUpRight size={24} />
                     </div>
                  </Card>
               </Link>
            </div>))}
            <div className="box full pd-15">
               <SubHeading styles={{ marginBottom: "15px" }}>Posts by {user.name}</SubHeading>
               <PostsViewerPlain
                  allPosts={user.posts}
                  singlePost
                  hideReplies
               />
            </div>
            <Spacing />
            <div className="text-xxs grey-5 full">Joined on {formatMilliseconds(parseInt(user.joined), true)}</div>
         </div>
      </AppWrapper>
   )
}
