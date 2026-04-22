'use client'
import "./CommunityPost.css"
import { CustomUserIcon } from "../Icons/Icon"
import { BoldColour, SubHeading } from "../CourseFormats/CourseFormats"
import { useModal } from "../Modal/ModalContext"
import { CreatePostReplyModalForm, UserProfileViewer } from "../ModalForms/ModalForms"
import { FullPost, FullReply, User } from "@/types/types"
import { timeAgo } from "@/utils/date"
import { formatNumber } from "@/utils/num"
import { Heart, Trash2 } from "lucide-react"
import { useSessionUser } from "@/helpers/useSessionUser"
import { useState } from "react"
import { deletePost, deletePostReply, likePost, removePostLike } from "@/app/actions/community"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ellipsisText } from "@/utils/utils"
import MultiActionDropdown from "../MultiActionDropdown/MultiActionDropdown"
import AwaitButton from "../AwaitButton/AwaitButton"
import Card from "../Card/Card"

type CommunityPostProps = {
   ref?: any;
   fullPost: FullPost;
   postInFeed: boolean;
   hideReplies?: boolean;
}

export default function CommunityPost ({ ref, fullPost, postInFeed, hideReplies }: CommunityPostProps) {
   const [post, setPost] = useState<FullPost>(fullPost);
   const { user } = useSessionUser();
   const { showModal, close } = useModal();
   const router = useRouter();

   if (user == null) return null;

   function handleAddReply () {
      function addReplyOptimistic (dummyReply: FullReply) {
         setPost(p => ({ ...p, replies: [ dummyReply, ...p.replies ] }));
      }
      showModal({ content: (<><CreatePostReplyModalForm post={post} addOptimistic={addReplyOptimistic} /></>) })
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

   function handleDeletePost () {
      async function deleteThisPost (callback: Function) {
         const deleted = await deletePost(post.postid);
         if (deleted) {
            toast.success("Post Deleted!");
            close();
            router.push("/community");
         } else {
            toast.error("Failed to delete post");
         }
         callback();
      }

      showModal({
         content: <div className="box full dfb column align-center pdx-2 pd-2">
            <SubHeading styles={{ textAlign: "center" }}>Are you sure you want to delete this post ?</SubHeading>
            <div className="box full pd-15 mb-2 dfb column gap-10">
               <AwaitButton className="xxs delete tiny-shadow pd-1 full" onClick={deleteThisPost}>
                  <Trash2 size={18} /> Yes, Delete this Post!
               </AwaitButton>
               <button className="xxs outline-black tiny-shadow pd-1 full" onClick={close}>No</button>
            </div>
         </div>
      })
   }
   
   function handleDeletePostReply (reply: FullReply) {
      async function deleteThisPostReply (callback: Function) {
         const deleted = await deletePostReply(post.postid, reply.replyid);
         if (deleted) {
            toast.success("Reply Deleted!");
            setPost(p => ({ ...p, replies: [ ...p.replies.filter(r => (r.replyid !== reply.replyid)) ] }));
            close();
         } else {
            toast.error("Failed to delete reply");
         }
         callback();
      }

      const postCardStyles: React.CSSProperties = {
         width: "100%", borderRadius: "15px",
         padding: "10px", border: "1px solid #0a0a0a"
      }

      showModal({
         content: <div className="box full dfb column align-center pdx-2 pd-2">
            <SubHeading styles={{ textAlign: "center" }}>Are you sure you want to delete this reply ?</SubHeading>
            <div className="box full pd-1">
               <Card styles={postCardStyles} cursor>
                  <div className="box full dfb align-center gap-10">
                     <div className="box fit h-full">
                        <CustomUserIcon size={35} url={reply.user.profileImage!} round />
                     </div>
                     <div className="box full dfb column">
                        <div className="text-xxs full bold-700 line-height-13">{reply.user.name}</div>
                        <div className="text-xxxs full grey-4 line-height-13">{timeAgo(parseInt(reply.created))}</div>
                     </div>
                  </div>
                  <div className="text-xxxs full line-height-14 mt-1">
                     {ellipsisText(reply.content, 120)}
                  </div>
               </Card>
            </div>
            <div className="box full pd-15 mb-2 dfb column gap-10">
               <AwaitButton className="xxs delete tiny-shadow pd-1 full" onClick={deleteThisPostReply}>
                  <Trash2 size={18} /> Yes, Delete this Reply!
               </AwaitButton>
               <button className="xxs outline-black tiny-shadow pd-1 full" onClick={close}>No</button>
            </div>
         </div>
      })
   }

   function openCommunityPost () {
      if (postInFeed) router.push(`/community/${fullPost.postid}`);
   }

   if (!user) return null;
   
   return (
      <div 
         ref={ref} 
         className={`community-post ${postInFeed ? "cursor-pointer" : ""}`} 
      >
         <div className="box full dfb align-center" onClick={openCommunityPost}>
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
            {(post.userid === user.userid || user.type === "admin") && (<div className="box fit h-full">
               <MultiActionDropdown 
                  actions={[
                     {  action: handleDeletePost, label: <><Trash2 size={17} /> Delete Post</>, appearance: "delete" }
                  ]}
               />
            </div>)}
         </div>
         <div className="post-content" onClick={openCommunityPost}>{post.content}</div>
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
                        <div className="box full dfb align-center" onClick={openCommunityPost}>
                           <div className="reply-user cursor-pointer" onClick={() => handleViewUser(reply.user)}>
                              <div className="box fit h-full">
                                 <CustomUserIcon size={28} url={reply.user.profileImage} round />
                              </div>
                              <div className="text-xs full bold-700">{reply.user.name}</div>
                           </div>
                           {(reply.userid === user.userid || user.type === "admin") && (<div className="box fit h-full">
                              <MultiActionDropdown 
                                 actions={[
                                    {  action: () => handleDeletePostReply(reply), label: <><Trash2 size={17} /> Delete Reply</>, appearance: "delete" }
                                 ]}
                              />
                           </div>)}
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
