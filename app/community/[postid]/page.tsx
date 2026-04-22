import { redirectUnauthorized } from "@/helpers/redirects";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { postsTable } from "@/db/schemas";
import sanitise from "@/utils/sanitise";
import CommunityPostPage from "./CommunityPostPage";

type CommunityPostPageProps = {
   params: Promise<{
      postid: string;
   }>
}

export default async function Community ({ params }: CommunityPostPageProps) {
   await redirectUnauthorized();

   const { postid } = await params;

   const post = await db.query.postsTable.findFirst({
      where: eq(postsTable.postid, postid),
      with: {
         user: true, // post owner
         likes: {
            with: {
               user: true,
            }
         },
         replies: {
            with: {
               user: true, // reply owner
            },
         },
      },
   });

   return <CommunityPostPage post={sanitise(post)}  />
}