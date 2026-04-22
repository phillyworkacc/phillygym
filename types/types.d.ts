import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { usersTable, postsTable, repliesTable, likesTable } from "@/db/schemas";

export type UserType = "admin" | "user";
export type User = Omit<InferSelectModel<typeof usersTable>, "password">;
export type NewUser = InferInsertModel<typeof usersTable>;

export type FullPost = InferSelectModel<typeof postsTable> & {
   user: User;
   replies: FullReply[];
   likes: FullLike[];
};
export type Post = InferSelectModel<typeof postsTable>;
export type NewPost = InferInsertModel<typeof postsTable>;

export type FullReply = InferSelectModel<typeof repliesTable> & {
   user: User;
};
export type Reply = InferSelectModel<typeof repliesTable>;
export type NewReply = InferInsertModel<typeof repliesTable>;

export type FullLike = InferSelectModel<typeof likesTable> & {
   user: User;
};
export type Like = InferSelectModel<typeof likesTable>;
export type NewLike = InferInsertModel<typeof likesTable>;