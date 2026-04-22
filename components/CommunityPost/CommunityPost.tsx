'use client'
import "./CommunityPost.css"
import { CustomUserIcon } from "../Icons/Icon"
import { BoldColour } from "../CourseFormats/CourseFormats"
import { useModal } from "../Modal/ModalContext"
import { CreatePostReplyModalForm, UserProfileViewer } from "../ModalForms/ModalForms"
import { FullPost, User } from "@/types/types"
import { timeAgo } from "@/utils/date"
import { formatNumber } from "@/utils/num"
import { Heart } from "lucide-react"
import { useSessionUser } from "@/helpers/useSessionUser"
import { useState } from "react"
import { likePost, removePostLike } from "@/app/actions/community"
import { useRouter } from "next/navigation"

type CommunityPostProps = {
   ref?: any;
   fullPost: FullPost;
   postInFeed: boolean;
   hideReplies?: boolean;
}

export default function CommunityPost ({ ref, fullPost, postInFeed, hideReplies }: CommunityPostProps) {
   const [post, setPost] = useState<FullPost>(fullPost);
   const { user } = useSessionUser();
   const { showModal } = useModal();
   const router = useRouter();


   function handleAddReply () {
      showModal({ content: (<><CreatePostReplyModalForm post={post} /></>) })
   }
   
   function handleViewUser (user: User) {
      if (postInFeed) return;
      showModal({ content: (<><UserProfileViewer user={user} /></>) })
   }

   function isLikedByUser () {
      if (!user) return false;
      return (post.likes.filter(like => like.userid == user.userid).length > 0);
   }

   async function toggleLikePost () {
      if (!user) return;
      if (post.likes.filter(like => like.userid == user.userid).length > 0) {
         setPost(p => ({
            ...p, 
            likes: [
               ...p.likes.filter(like => like.userid !== user.userid)
            ]
         }))
         await removePostLike(post.postid);
      } else {
         setPost(p => ({
            ...p, 
            likes: [
               ...p.likes,
               {
                  likeid: "liked-id",
                  user, userid: user.userid,
                  postid: p.postid, id: 900
               }
            ]
         }))
         await likePost(post.postid);
      }
   }

   if (!user) return null;
   
   return (
      <div 
         ref={ref} 
         className={`community-post ${postInFeed ? "cursor-pointer" : ""}`} 
         onClick={() => {
            if (postInFeed) router.push(`/community/${fullPost.postid}`);
         }}
      >
         <div 
            className="post-owner cursor-pointer" 
            onClick={() => handleViewUser(post.user)}
         >
            <div className="box fit h-full">
               <CustomUserIcon size={40} url={post.user.profileImage!} round />
            </div>
            <div className="box full dfb column">
               <div className="text-xs full bold-700">{post.user.name}</div>
               <div className="text-xxxs full grey-4">{timeAgo(parseInt(post.created))}</div>
            </div>
         </div>
         <div className="post-content">{post.content}</div>
         <div className="box full pd-05">
            <div 
               className={`post-like-container ${isLikedByUser() ? "liked" : ""}`}
               onClick={toggleLikePost}
            >
               <div className="post-like-btn">
                  <Heart size={18} fill={isLikedByUser() ? "#ff163d" : "#fff"} />
               </div>
               <div className="text-xxs bold-500 fit">
                  {formatNumber(post.likes.length, { useCommas: true, useShorthand: true, showDecimals: false })}
               </div>
            </div>
         </div>
         {(!hideReplies) && (<>
            <div className="box fit" onClick={handleAddReply}>
               <BoldColour>Add a reply</BoldColour>
            </div>
            {(post.replies.length > 0) && (<>
               <div className="post-replies">
                  <div className="text-xs bold-700 full">Replies</div>
                  {post.replies.slice(0,3).map(reply => (
                     <div key={reply.replyid} className="post-reply">
                        <div className="reply-user cursor-pointer" onClick={() => handleViewUser(reply.user)}>
                           <div className="box fit h-full">
                              <CustomUserIcon size={28} url={reply.user.profileImage} round />
                           </div>
                           <div className="text-xs full bold-700">{reply.user.name}</div>
                        </div>
                        <div className="reply-content">{reply.content}</div>
                     </div>
                  ))}
                  {(post.replies.length > 3) && (<>
                     <div className="box fit pdx-2">
                        <BoldColour>View more replies</BoldColour>
                     </div>
                  </>)}
               </div>
            </>)}
         </>)}
      </div>
   )
}
