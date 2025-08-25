import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic server-side validation (never trust client)
    const required = [
      "firstName","lastName","country","address",
      "city","province","zipCode","phone","email",
      "cartItems","subtotal","discount","total","orderDate","paymentMethod"
    ];
    for (const key of required) {
      if (body[key] === undefined || body[key] === null || body[key] === "") {
        return NextResponse.json({ success: false, message: `Missing: ${key}` }, { status: 400 });
      }
    }
    if (!Array.isArray(body.cartItems) || body.cartItems.length === 0) {
      return NextResponse.json({ success: false, message: "Cart is empty." }, { status: 400 });
    }

    // Sanity expects refs like {_type:'reference', _ref:'...'}
    const cartItems = body.cartItems.map((idOrRef: any) =>
      typeof idOrRef === "string"
        ? { _type: "reference", _ref: idOrRef }
        : idOrRef
    );

    const doc = {
      _type: "order",
      ...body,
      cartItems,
    };

    const created = await client.create(doc);

    return NextResponse.json({ success: true, orderId: created._id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
























// import { NextResponse } from "next/server";
// import { client } from "@/sanity/lib/client"

// export async function POST(req: Request) {
//   try {
//     const { shippingInfo, paymentMethod, items, total } = await req.json();

//     const doc = {
//       _type: "order",
//       ...shippingInfo,
//       paymentMethod,
//       totalAmount: total,
//       status: "pending",
//       items: items.map((i: any) => ({
//         _type: "orderItem",
//         productId: i.id,
//         name: i.name,
//         color: i.color,
//         size: i.size,
//         price: i.price,
//         quantity: i.quantity,
//       })),
//       createdAt: new Date().toISOString(),
//     };

//     const result = await client.create(doc);

//     return NextResponse.json({ success: true, orderId: result._id });
//   } catch (err: any) {
//     console.error("Error saving order:", err);
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   }
// }