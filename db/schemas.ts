import { pgTable, serial, text, boolean, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userTypeEnum = pgEnum("user_type", ["user", "admin"]);

export const usersTable = pgTable("users", {
   id: serial("id").primaryKey(),
   userid: text("userid").notNull().unique(),
   name: text("name").notNull(),
   email: text("email").notNull().unique(),
   password: text("password").notNull(),
   type: userTypeEnum("type").notNull().default("user"),
   premiumAccess: boolean("premium_access").default(false),
   profileImage: text("profile_image").notNull().default("user-default.jpg"),
   instagram: text("instagram").notNull().default(""),
   tiktok: text("tiktok").notNull().default(""),
   suspended: boolean("suspended").default(false),
   banned: boolean("banned").default(false),
   joined: text("joined").notNull(),
});

/* ---------------- POSTS ---------------- */

export const postsTable = pgTable("posts", {
   id: serial("id").primaryKey(),
   postid: text("postid").notNull().unique(),
   userid: text("userid")
      .notNull()
      .references(() => usersTable.userid, { onDelete: "cascade" }),
   content: text("content").notNull(),
   created: text("created").notNull(),
});

/* ---------------- REPLIES ---------------- */

export const repliesTable = pgTable("replies", {
   id: serial("id").primaryKey(),
   replyid: text("replyid").notNull().unique(),
   postid: text("postid")
      .notNull()
      .references(() => postsTable.postid, { onDelete: "cascade" }),
   userid: text("userid")
      .notNull()
      .references(() => usersTable.userid, { onDelete: "cascade" }),
   content: text("content").notNull(),
   created: text("created").notNull(),
});

/* ---------------- LIKES ---------------- */

export const likesTable = pgTable("likes", {
   id: serial("id").primaryKey(),
   likeid: text("likeid").notNull().unique(),
   postid: text("postid")
      .notNull()
      .references(() => postsTable.postid, { onDelete: "cascade" }),
   userid: text("userid")
      .notNull()
      .references(() => usersTable.userid, { onDelete: "cascade" }),
});

/* ---------------- RELATIONS ---------------- */

export const userRelations = relations(usersTable, ({ many }) => ({
   posts: many(postsTable),
   replies: many(repliesTable),
   likes: many(likesTable),
}));

export const postRelations = relations(postsTable, ({ one, many }) => ({
   user: one(usersTable, {
      fields: [postsTable.userid],
      references: [usersTable.userid],
   }),
   replies: many(repliesTable),
   likes: many(likesTable),
}));

export const replyRelations = relations(repliesTable, ({ one }) => ({
   post: one(postsTable, {
      fields: [repliesTable.postid],
      references: [postsTable.postid],
   }),
   user: one(usersTable, {
      fields: [repliesTable.userid],
      references: [usersTable.userid],
   }),
}));

export const likeRelations = relations(likesTable, ({ one }) => ({
   post: one(postsTable, {
      fields: [likesTable.postid],
      references: [postsTable.postid],
   }),
   user: one(usersTable, {
      fields: [likesTable.userid],
      references: [usersTable.userid],
   }),
}));