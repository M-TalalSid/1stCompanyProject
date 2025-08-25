import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Product ID",
      type: "number",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price",
      type: "number",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "subcategory",
      title: "Subcategory",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "colors",
      title: "Colors",
      type: "array",
      of: [
        defineField({
          name: "color",
          title: "Color",
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "value", title: "Value", type: "string" },
            { name: "hex", title: "Hex Code", type: "string" },
          ],
        }),
      ],
    }),
    defineField({
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "object",
      fields: [
        { name: "Material", title: "Material", type: "string" },
        { name: "Care", title: "Care Instructions", type: "string" },
        { name: "Origin", title: "Origin", type: "string" },
        { name: "Fit", title: "Fit", type: "string" },
      ],
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
    }),
    defineField({
      name: "reviewCount",
      title: "Review Count",
      type: "number",
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
    }),
    defineField({
      name: "stockCount",
      title: "Stock Count",
      type: "number",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "isSale",
      title: "Is On Sale",
      type: "boolean",
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [{ type: "string" }], // can later extend to review object
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
    }),
  ],
});