'use client'
import "./PostsViewer.css"
import type { FullPost } from "@/types/types"
import { useCallback, useEffect, useRef, useState } from "react";
import { SearchUsersForm } from "../ModalForms/ModalForms";
import { Heading } from "../CourseFormats/CourseFormats";
import { Search } from "lucide-react";
import { useModal } from "../Modal/ModalContext";
import { getPosts } from "@/app/actions/community";
import { toast } from "sonner";
import { CustomSpinner } from "../Spinner/Spinner";
import CommunityPost from "../CommunityPost/CommunityPost";

type PostsViewerProps = {
   allPosts: FullPost[];
   nextCursor?: any;
   singlePost?: boolean;
   hideReplies?: boolean;
}

export default function PostsViewer ({ allPosts, nextCursor, singlePost, hideReplies }: PostsViewerProps) {
   const [deviceType, setDeviceType] = useState<"desktop" | "mobile">("mobile");
   const { showModal } = useModal();
   
   const [allCommunityPosts, setAllCommunityPosts] = useState<FullPost[]>(allPosts);
   const [cursor, setCursor] = useState<number | undefined>(nextCursor || undefined);
   const [loading, setLoading] = useState(false);
   const [hasMore, setHasMore] = useState(true);

   const observerRef = useRef<IntersectionObserver | null>(null);

   async function fetchPosts () {
      if (loading || !hasMore) return;
      setLoading(true);

      const data = await getPosts(cursor || undefined);
      if (data == false) {
         setLoading(false);
         toast("Failed to load more posts", { position: "bottom-center" });
         return;
      }
      console.log(data.posts);

      setAllCommunityPosts(prev => [...prev, ...data.posts])
      setCursor(data.nextCursor)
      setHasMore(!!data.nextCursor)

      setLoading(false)
   }

   useEffect(() => {
      setDeviceType(window.innerWidth >= 900 ? "desktop" : "mobile");
      window.addEventListener('resize', () => {
         setDeviceType(window.innerWidth >= 900 ? "desktop" : "mobile");
      })
   }, []);

   // intersection observer
   const lastElementRef = useCallback((node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting && hasMore) {
            fetchPosts();
         }
      })

      if (node) observerRef.current.observe(node)
   }, [loading, hasMore, cursor]);

   function handleSearchUsers () {
      showModal({ content: (<SearchUsersForm />) });
   }

   return (
      <>
         <div className="box full dfb align-center gap-10 mb-15">
            <Heading>Feed</Heading>
            {deviceType == "mobile" && (
               <button className="pd-1 pdx-1 radius-20" onClick={handleSearchUsers}>
                  <Search size={20} />
               </button>
            )}
         </div>

         <div className="post-viewer">
            <div className="posts-container">
               {allCommunityPosts.map((post, index) => {
                  const isLast = index === allCommunityPosts.length - 1;
                  return (
                     <CommunityPost 
                        key={post.id} 
                        ref={singlePost ? null : (isLast ? lastElementRef : null)}
                        fullPost={post} 
                        postInFeed={!singlePost}
                        hideReplies={hideReplies}
                     />
                  )
               })}
               {(!singlePost) && (<>
                  {loading && (
                     <div className="box full dfb align-center justify-center">
                        <CustomSpinner size={20} color="#000" />
                     </div>
                  )}

                  {!hasMore && (
                     <div className="text-xxxs full text-center grey-5">No more posts</div>
                  )}
               </>)}
            </div>
            {(deviceType == "desktop") && (<SearchUsersForm />)}
         </div>
      </>
   )
}

export function PostsViewerPlain ({ allPosts, singlePost, hideReplies }: PostsViewerProps) {
   const [deviceType, setDeviceType] = useState<"desktop" | "mobile">("mobile");

   useEffect(() => {
      setDeviceType(window.innerWidth >= 900 ? "desktop" : "mobile");
      window.addEventListener('resize', () => {
         setDeviceType(window.innerWidth >= 900 ? "desktop" : "mobile");
      })
   }, []);

   return (
      <div className="post-viewer-plain">
         <div className="posts-container-plain">
            {allPosts.map(post => (
               <CommunityPost 
                  key={post.id} 
                  fullPost={post} 
                  postInFeed={false}
                  hideReplies={hideReplies}
               />
            ))}
         </div>
      </div>
   )
}
