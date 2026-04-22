'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import PostsViewer from "@/components/PostsViewer/PostsViewer"
import { FullPost } from "@/types/types"

export default function CommunityPostPage ({ post }: { post: FullPost }) {
   return (
      <AppWrapper>
			<PostsViewer allPosts={[post]} singlePost />
      </AppWrapper>
   )
}
