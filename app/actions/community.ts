"use server"
import { db } from "@/db";
import { likesTable, postsTable, repliesTable } from "@/db/schemas";
import { useAllowedUserType, useAuthorizedUser } from "@/helpers/funcs"
import { FullPost, Post } from "@/types/types";
import { generateId } from "@/utils/uuid";
import { and, desc, eq, gt, lt } from "drizzle-orm";

export async function createPost (content: string) {
   const result = await useAuthorizedUser(async (user) => {
      const res = await db.insert(postsTable).values({
         postid: generateId(),
         content, created: Date.now().toString(),
         userid: user.userid
      });
      return (res.rowCount === 1);
   });
   if (result == "no-user") return false;
   return true;
}

export async function deletePost (postid: string) {
   const result = await useAuthorizedUser(async (user) => {
      const res = await db.delete(postsTable).where(and(
         eq(postsTable.userid, user.userid),
         eq(postsTable.postid, postid)
      ));
      return (res.rowCount === 1);
   });
   if (result == "no-user") return false;
   return true;
}

export async function createPostReply (content: string, postid: string) {
   const result = await useAuthorizedUser(async (user) => {
      const res = await db.insert(repliesTable).values({
         replyid: generateId(), postid,
         content, created: Date.now().toString(),
         userid: user.userid
      });
      return (res.rowCount === 1);
   });
   if (result == "no-user") return false;
   return true;
}

export async function deletePostReply (postid: string, replyid: string) {
   const result = await useAuthorizedUser(async (user) => {
      const res = await db.delete(repliesTable).where(and(
         eq(repliesTable.userid, user.userid),
         eq(repliesTable.postid, postid),
         eq(repliesTable.replyid, replyid)
      ));
      return (res.rowCount === 1);
   });
   if (result == "no-user") return false;
   return true;
}

export async function likePost (postid: string) {
   const result = await useAuthorizedUser(async (user) => {
      const res = await db.insert(likesTable).values({
         likeid: generateId(), postid, userid: user.userid
      });
      return (res.rowCount === 1);
   });
   if (result == "no-user") return false;
   return true;
}

export async function removePostLike (postid: string) {
   const result = await useAuthorizedUser(async (user) => {
      const res = await db.delete(likesTable).where(and(
         eq(likesTable.userid, user.userid),
         eq(likesTable.postid, postid)
      ));
      return (res.rowCount === 1);
   });
   if (result == "no-user") return false;
   return true;
}

export async function getPosts (cursor?: number): Promise<false | { posts: FullPost[], nextCursor: number | undefined }> {
   const result = await useAuthorizedUser(async (user) => {
      const LIMIT = 10; // get 10 new posts every time
   
      const posts = await db.query.postsTable.findMany({
         where: cursor
            ? lt(postsTable.id, cursor) // get posts AFTER cursor
            : undefined,
         orderBy: desc(postsTable.id),
         limit: LIMIT,
         with: {
            user: true,
            replies: {
               limit: 4,
               orderBy: desc(postsTable.id),
               with: { user: true }
            },
            likes: true
         },
      });
      return { posts, nextCursor: posts.length ? posts[posts.length - 1].id : undefined };
   })

   if (result == "no-user") return false;
   return result;
}