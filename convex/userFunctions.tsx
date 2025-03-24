import { getAuthUserId } from "@convex-dev/auth/server";
import { internalAction, mutation, query } from "./_generated/server";
import { getAuthSessionId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api"
 
export const currentSession = query({
  args: {},
  handler: async (ctx) => {
    const sessionId = await getAuthSessionId(ctx);
    if (sessionId === null) {
      return null;
    }
    return await ctx.db.get(sessionId);
  },
});
 
export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const updateUser = mutation({
  args: {
    id: v.id('users'),
    name: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    about: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      phone: args.phone,
      address: args.address,
      about: args.about,
    })
    console.log(ctx.db.get(args.id));
    return ctx.db.get(args.id);
  }
})

export const updateUserImage = mutation({
  args: {
    id: v.id('users'),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      image: args.image
    })
    console.log(ctx.db.get(args.id));
    return ctx.db.get(args.id);
  }
})

// Get Sellers
export const getSellers = query({
  args: {},
  handler: async (ctx, args) => {
      const users = (await ctx.db.query("users").collect()).filter((user) => user.role === "seller")
      return users
  }
})

// Add to Cart
// export const addToCart = mutation({
//   args: {
//     id: v.id('users'),
//     product: v.object({
//       productId: v.string(),
//       name: v.string(),
//       quantity: v.number(),
//       price: v.number(),
//       seller: v.string()
//     }),
//   },
//   handler: async (ctx, args) => {
//     const userId = await getAuthUserId(ctx);
//     if (userId === null) {
//       return null;
//     }
//     const user = await ctx.db.get(userId);
//     if(user?.cart?.find((product)=> product == args.product)){
//       for (let i = 0; i < user?.cart.length; i++) {
//         const element = user?.cart[i];
//         if (element.productId == args.product.productId) {
//           user.cart[i].quantity += args.product.quantity
//           break
//         }
//       }
//     }else{
//       user?.cart?.push(args.product)
//     }
//     await ctx.db.patch(args.id, {
//       cart: user?.cart,
//     })
//     console.log(ctx.db.get(args.id));
//     return ctx.db.get(args.id);
//   }
// })

// Product Functions
export const createProduct = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    image: v.string(),
    price: v.number(),
    // quantity: v.number(),
    seller: v.string()
  },
  handler: async (ctx, args) => {
      await ctx.db.insert("products", {
          name: args.name,
          description: args.description,
          image: args.image,
          price: args.price,
          // quantity: args.quantity,
          seller: args.seller
      })
  }
})

export const getProducts = query({
  args: {},
  handler: async (ctx) => {
      const products = await ctx.db.query("products").order("desc").take(50)
      return products.reverse()
  }
})

export const getProductById = query({
  args: {
    id: v.id('products')
  },
  handler: async (ctx, args) => {
      const product = (await ctx.db.query("products").collect()).find((product) => product._id === args.id)
      return product
  }
})

export const getProductsBySellerEmail = query({
  args: {
    email: v.string()
  },
  handler: async (ctx, args) => {
      const products = (await ctx.db.query("products").withIndex("seller", (q)=> q.eq("seller", args.email)).collect())
      return products
  }
})

// Order Functions
export const createOrder = mutation({
  args: {
    user: v.string(),
    deliveryAddress: v.string(),
    products: v.array(v.object({
      _id: (v.string()),
      name: v.string(),
      quantity: v.number(),
      price: v.number(),
      seller: v.string(),
    })),
    amountPaid: v.number(),
    vat: v.number(),
    deliveryFee: v.number(),
  },
  handler: async (ctx, args) => {
    console.log("Handler running");
    // const data = await ctx.scheduler.runAfter(0, internal.userFunctions.FLW_Payment, {})
    // console.log(data);
    
      const order = await ctx.db.insert("orders", {
          user: args.user,
          deliveryAddress: args.deliveryAddress,
          products: args.products,
          total: args.amountPaid,
          vat: args.vat,
          deliveryFee: args.deliveryFee,
          paid: false
      })

      return order
  }
})

export const PS_Payment_VerifyCALLER = mutation({
  args: {
    ref: v.string(),
  },
  handler: async (ctx, args) => {
    const data = await ctx.scheduler.runAfter(0, internal.userFunctions.PS_Payment_Verify, {
      ref: args.ref
    })
    console.log(data);
  }
})

export const payment_approval = mutation({
  args: {
    id: v.id('orders'),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      paid: true,
      status: "Order Confirmed"
    })
    console.log(ctx.db.get(args.id));
    return ctx.db.get(args.id);
  }
})

export const deliveryInProgress = mutation({
  args: {
    id: v.id('orders'),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "Delivery In Progress"
    })
    console.log(ctx.db.get(args.id));
    return ctx.db.get(args.id);
  }
})

export const deliveryConfirmation = mutation({
  args: {
    id: v.id('orders'),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "Order Completed"
    })
    console.log(ctx.db.get(args.id));
    return ctx.db.get(args.id);
  }
})

export const PS_Payment_Init = internalAction({
  args: {
    user: v.string(),
    amount: v.number()
  },
  handler: async (ctx, args)=> {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        // Authorization: 'Bearer sk_live_790ca10be60c9d063f28efa9afe056d9124a03e0',
        Authorization: 'Bearer sk_test_1b47f03b1f6fa448055fd36ca63c091c05f3264d',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: args.user,
        amount: args.amount+"00",
        currency: "NGN",
        // metadata: {
        //   cancel_action: ""
        // }
      })
    };
    
    await fetch('https://api.paystack.co/transaction/initialize', options)
      .then(res => res.json())
      // .then(res => console.log(res))
      .catch(err => err);
      
  }
})

export const PS_Payment_Verify = internalAction({
  args: {
    ref: v.string(),
  },
  handler: async (ctx, args)=> {
    const options = {
      headers: {
        accept: 'application/json',
        // Authorization: 'Bearer sk_live_790ca10be60c9d063f28efa9afe056d9124a03e0',
        Authorization: 'Bearer sk_test_1b47f03b1f6fa448055fd36ca63c091c05f3264d',
        'Content-Type': 'application/json'
      },
    };
    
    try {
        const response = await fetch('https://api.paystack.co/transaction/verify/'+args.ref, options)
        const json = await response.json();
        return json.data.status
        // return json;
    } catch (error) {
        return "failed"
    }
  }
})

export const getOrders = query({
  args: {},
  handler: async (ctx) => {
      const orders = await ctx.db.query("orders").order("desc").take(50)
      return orders.reverse()
  }
})

export const getOrderById = query({
  args: {
    id: v.id('orders')
  },
  handler: async (ctx, args) => {
      const order = (await ctx.db.query("orders").collect()).find((order) => order._id === args.id)
      return order
  }
})

export const getOrdersByUserEmail = query({
  args: {
    email: v.string()
  },
  handler: async (ctx, args) => {
      const orders = await ctx.db.query("orders").withIndex("user", (q)=> q.eq("user", args.email)).collect()
      return orders
  }
})

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});