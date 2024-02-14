import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    userId: v.string(),
    description: v.string(),
    isCompleted: v.boolean(),
    dayOfWeek: v.string(),
    emoji: v.string(),
  }),
  users: defineTable({
    name: v.optional(v.string()),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
