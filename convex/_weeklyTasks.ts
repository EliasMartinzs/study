// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";

// export const getTask = query({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       return [];
//     }

//     return await ctx.db
// .query("tasks")
// .filter((q) => q.eq(q.field("tasksId"), identity.subject))
// .collect();
//   },
// });

// export const createTask = mutation({
//   args: {
//     title: v.string(),
//     description: v.string(),
//     isSelected: v.boolean(),
//     weekly: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("not authenticated");
//     }
//     const task = ctx.db.insert("tasks", {
//       description: args.description,
//       isSelected: args.isSelected,
//       title: args.title,
//       tasksId: identity.subject,
//       weekly: args.weekly,
//     });
//     return task;
//   },
// });
