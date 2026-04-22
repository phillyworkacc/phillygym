'use client'
import { createPost, createPostReply } from "@/app/actions/community";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FormContent, SubHeading } from "../CourseFormats/CourseFormats";
import { useModal } from "../Modal/ModalContext";
import { searchUsers } from "@/app/actions/user";
import { FullPost, User } from "@/types/types";
import { CustomUserIcon, InstagramIcon, TiktokIcon } from "../Icons/Icon";
import { formatMilliseconds, timeAgo } from "@/utils/date";
import { SquareArrowOutUpRight } from "lucide-react";
import { ellipsisText } from "@/utils/utils";
import AwaitButton from "../AwaitButton/AwaitButton";
import LoadingCard from "../Card/LoadingCard";
import Link from "next/link";
import Card from "../Card/Card";
import Spacing from "../Spacing/Spacing";

export default function CreatePostModalForm () {
   const router = useRouter();
   const [postContent, setPostContent] = useState("");
	const { close } = useModal();

   async function handleCreate (callback: Function) {
      if (postContent.trim() == "") {
         toast.error("Enter something to post");
         callback();
         return;
      }
      const created = await createPost(postContent);
      if (created) toast.success("Posted"); else toast.error("Failed to post");
      callback();
      close();
      router.refresh();
   }

   return (
      <div className="box full pd-1 pdx-15">
         <SubHeading styles={{ marginBottom: "10px" }}>Make a Post</SubHeading>
         <textarea 
            className="xs pd-15 pdx-2 h-30 full radius-16" 
            placeholder="How's your gym progress going?"
            value={postContent}
            onChange={e => setPostContent(e.target.value)}
         />
         <div className="box full pd-15">
            <AwaitButton className="xxxs full pd-12" onClick={handleCreate}>Post</AwaitButton>
         </div>
      </div>
   )
}

export function SearchUsersForm () {
   const [searchQuery, setSearchQuery] = useState("");
   const [searchResults, setSearchResults] = useState<User[] | null>([]);
   const { showModal, close } = useModal();

   async function handleSearch (query: string) {
      setSearchQuery(query);
      if (query.trim() == "") return;
      setSearchResults(null);
      const results = await searchUsers(query);
      if (results) {
         setSearchResults(results);
      } else setSearchResults([]);
   }

   function handleViewUserProfile (user: User) {
      close();
      showModal({ content: (<><UserProfileViewer user={user} /></>) })
   }

   return (
      <div className="box full pdx-2" style={{ minHeight: "40vh" }}>
         <SubHeading styles={{ marginBottom: "10px" }}>Meet New People</SubHeading>
         <FormContent styles={{ width: "100%", maxWidth: "100%" }}>
            <input 
               type="text"
               className="xs pd-13 pdx-2 full"
               style={{ width: "100%", maxWidth: "100%" }}
               placeholder="Search..."
               value={searchQuery}
               onChange={e => handleSearch(e.target.value)}
            />
         </FormContent>
         <div className="box full pd-1 dfb column gap-10">
            {searchResults == null ? (<>
               {Array.from({ length: 3 }, (_, i) => i+1).map(i => (
                  <LoadingCard
                     key={i}
                     styles={{ width: "100%", maxWidth: "600px", height: "50px" }}
                  />
               ))}
            </>) : (<>
               {searchResults.length == 0 && (
                  <div className="box full pd-15 text-center">No one found</div>
               )}
               {searchResults.map(user => (
                  <div key={user.userid} className="search-result-user" onClick={() => handleViewUserProfile(user)}>
                     <CustomUserIcon url={user.profileImage!} size={40} round />
                     <div className="text-xxs full bold-600">{user.name}</div>
                  </div>
               ))}
            </>)}
         </div>
      </div>
   )
}

export function CreatePostReplyModalForm ({ post }: { post: FullPost }) {
   const router = useRouter();
   const [replyContent, setReplyContent] = useState("");
	const { close } = useModal();
   
   const postCardStyles: React.CSSProperties = {
      width: "100%", borderRadius: "15px",
      padding: "10px", border: "1px solid #0a0a0a"
   }

   async function handleCreateReply (callback: Function) {
      if (replyContent.trim() == "") {
         toast.error("Enter something to reply to this post");
         callback();
         return;
      }
      const created = await createPostReply(replyContent, post.postid);
      if (created) toast.success("Added Reply"); else toast.error("Failed to add reply");
      callback();
      close();
      router.refresh();
   }

   return (
      <div className="box full pd-1 pdx-15">
         <SubHeading styles={{ marginBottom: "10px" }}>Reply to {post.user.name}</SubHeading>
         <Card styles={postCardStyles} cursor>
            <div className="box full dfb align-center gap-10">
               <div className="box fit h-full">
                  <CustomUserIcon size={35} url={post.user.profileImage!} round />
               </div>
               <div className="box full dfb column">
                  <div className="text-xxs full bold-700 line-height-13">{post.user.name}</div>
                  <div className="text-xxxs full grey-4 line-height-13">{timeAgo(parseInt(post.created))}</div>
               </div>
            </div>
            <div className="text-xxxs full line-height-14 mt-1">
               {ellipsisText(post.content, 120)}
            </div>
         </Card>
         <Spacing />
         <textarea 
            className="xs pd-15 pdx-2 h-10 full radius-16" 
            placeholder="Reply..."
            style={{ maxWidth: "100%" }}
            value={replyContent}
            onChange={e => setReplyContent(e.target.value)}
         />
         <div className="box full pd-15">
            <AwaitButton className="xxxs full pd-12" onClick={handleCreateReply}>Post Reply</AwaitButton>
         </div>
      </div>
   )
}

export function UserProfileViewer ({ user }: { user: User }) {
   const router = useRouter();
   const { close } = useModal();
   const instagramCardStyles: React.CSSProperties = {
      width: "100%", borderRadius: "15px",
      padding: "10px", border: "1px solid #ff7ab8"
   }

   const tiktokCardStyles: React.CSSProperties = {
      width: "100%", borderRadius: "15px",
      padding: "10px", border: "1px solid #0a0a0a"
   }

   return (
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
         <div className="box full pd-1">
            <button 
               className="xxxs outline-black tiny-shadow full pd-05"
               onClick={() => { close(); router.push(`/user/${user.userid}`); }}
            >View Full Profile</button>
         </div>
         <div className="text-xxs grey-5 full">Joined on {formatMilliseconds(parseInt(user.joined), true)}</div>
      </div>
   )
}