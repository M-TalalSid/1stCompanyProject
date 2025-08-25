import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({ name: "firstName", type: "string" }),
    defineField({ name: "lastName", type: "string" }),
    defineField({ name: "companyName", type: "string" }),
    defineField({ name: "country", type: "string" }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "city", type: "string" }),
    defineField({ name: "province", type: "string" }),
    defineField({ name: "zipCode", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "email", type: "string" }),

    // You send product references (by _id) — keep it as references:
    defineField({
      name: "cartItems",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),

    defineField({ name: "subtotal", type: "number" }),
    defineField({ name: "discount", type: "number" }),
    defineField({ name: "total", type: "number" }),
    defineField({ name: "orderDate", type: "datetime" }),

    // Add these for tracking:
    defineField({
      name: "paymentMethod",
      type: "string",
      options: { list: ["cash-on-delivery", "bank-transfer"] },
    }),
    defineField({
      name: "paymentStatus",
      type: "string",
      options: { list: ["unpaid", "paid", "refunded"] },
      initialValue: "unpaid",
    }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["pending", "processing", "shipped", "delivered", "cancelled"] },
      initialValue: "pending",
    }),
  ],
});









// export default {
//   name: "order",
//   title: "Orders",
//   type: "document",
//   fields: [
//     { name: "firstName", type: "string" },
//     { name: "lastName", type: "string" },
//     { name: "email", type: "string" },
//     { name: "phone", type: "string" },
//     { name: "address", type: "string" },
//     { name: "city", type: "string" },
//     { name: "state", type: "string" },
//     { name: "zipCode", type: "string" },
//     { name: "country", type: "string" },
//     { name: "paymentMethod", type: "string" },
//     { name: "totalAmount", type: "number" },
//     {
//       name: "items",
//       type: "array",
//       of: [
//         {
//           type: "object",
//           fields: [
//             { name: "productId", type: "string" },
//             { name: "name", type: "string" },
//             { name: "color", type: "string" },
//             { name: "size", type: "string" },
//             { name: "price", type: "number" },
//             { name: "quantity", type: "number" },
//           ],
//         },
//       ],
//     },
//     { name: "status", type: "string", options: { list: ["pending", "completed"] } },
//     { name: "createdAt", type: "datetime" },
//   ],
// };