// sanity/schemas/user.ts

export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    { name: "fullName", title: "Full Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "password", title: "Password", type: "string" },
    {
      name: "resetToken",
      title: "Reset Token",
      type: "string",
    },
    {
      name: "resetTokenExpiry",
      title: "Reset Token Expiry",
      type: "datetime",
    },
    {
      name: "tokenExpires",
      title: "Token Expires",
      type: "datetime",
    },
    {
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Admin", value: "admin" },
          { title: "User", value: "user" },
        ],
        layout: "radio",
      },
    },
  ],
};
