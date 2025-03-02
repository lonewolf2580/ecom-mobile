import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
 
const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(v.string()),
    address: v.optional(v.string()),
    about: v.optional(v.string()),
    // cart: v.optional(v.array(v.object({
    //     productId: v.string(),
    //     name: v.string(),
    //     quantity: v.number(),
    //     price: v.number(),
    //     seller: v.string()
    // }))),
  }).index("email", ["email"]),
  orders: defineTable({
    user: v.string(),
    products: v.array(v.object({
        productId: v.string(),
        name: v.string(),
        quantity: v.number(),
        price: v.number(),
        seller: v.string()
    }))
  }).index('user', ['user']),
  products: defineTable({
    name: v.string(),
    description: v.string(),
    image: v.string(),
    price: v.number(),
    seller: v.string()
  }).index("seller", ["seller"]),
});
 
export default schema;