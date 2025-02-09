import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  storySubject: text("story_subject").notNull(),
  storyType: varchar("story_type").notNull(),
  imageStyle: varchar("image_style").notNull(),
  ageGroup: varchar("age_group").notNull(),
  coverImage: text("cover_image").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});