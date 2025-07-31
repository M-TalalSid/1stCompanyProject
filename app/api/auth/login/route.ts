// import { NextRequest, NextResponse } from "next/server"
// import { createClient } from "@sanity/client"

// const client = createClient({
//   projectId: "ws507jcw", 
//   dataset: "production",
//   apiVersion: "2023-07-21",
//   useCdn: false,
//   token: process.env.SANITY_API_READ_TOKEN, 
// })

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()
//     const { email, password } = body

//     if (!email || !password) {
//       return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
//     }

//     // Fetch user by email
//     const user = await client.fetch(
//       `*[_type == "user" && email == $email][0]`,
//       { email }
//     )

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 })
//     }

//     // ⚠️ In production, use hashed password and bcrypt.compare()
//     if (user.password !== password) {
//       return NextResponse.json({ error: "Invalid password" }, { status: 401 })
//     }

//     return NextResponse.json({
//       success: true,
//       userId: user._id,
//       fullName: user.fullName,
//       role: user.role,
//     })
//   } catch (error) {
//     console.error("Login error", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }


import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@sanity/client"
import bcrypt from "bcryptjs"

const client = createClient({
  projectId: "ws507jcw",
  dataset: "production",
  apiVersion: "2023-07-21",
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    const user = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    )

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      userId: user._id,
      fullName: user.fullName,
      role: user.role,
    })
  } catch (error) {
    console.error("Login error", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
