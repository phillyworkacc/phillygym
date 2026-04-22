import { redirectUnauthorized } from "@/helpers/redirects";
import { getPosts } from "../actions/community";
import sanitise from "@/utils/sanitise";
import CommunityPage from "./CommunityPage";

export default async function Community () {
   await redirectUnauthorized();

   const allPosts = await getPosts();

   if (allPosts == false) return null;

   return <CommunityPage allPosts={sanitise(allPosts.posts)} nextCursor={allPosts.nextCursor}  />
}