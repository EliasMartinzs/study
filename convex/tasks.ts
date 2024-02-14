import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("tasks"), isCompleted: v.boolean() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }

    await ctx.db.patch(args.id, {
      isCompleted: args.isCompleted,
    });
  },
});

export const get = query({
  args: { dayOfWeek: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }

    const tasks = await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .filter((q) => q.eq(q.field("dayOfWeek"), args.dayOfWeek))
      .collect();

    return tasks;
  },
});

export const create = mutation({
  args: {
    description: v.string(),
    isCompleted: v.boolean(),
    dayOfWeek: v.string(),
    emoji: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }

    const task = await ctx.db.insert("tasks", {
      dayOfWeek: args.dayOfWeek,
      description: args.description,
      isCompleted: args.isCompleted,
      userId: identity.subject,
      emoji: args.emoji,
    });

    return task;
  },
});
