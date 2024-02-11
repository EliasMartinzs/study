import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    user: v.id("users"),
    title: v.string(),
    description: v.string(),
    weekday: v.number(), // Representa o dia da semana (1 para Segunda, 2 para Terça, etc.)
    // Alternativamente, para mais clareza:
    // weekday: v.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
    completed: v.boolean(),
  }),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
