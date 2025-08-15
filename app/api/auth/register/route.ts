import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@sanity/client"

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
    const { fullName, email, password } = body

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existing = await client.fetch(`*[_type == "user" && email == $email][0]`, { email })
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    const result = await client.create({
      _type: "user",
      fullName,
      email,
      password, // For production use, hash this password
    })

    return NextResponse.json({ success: true, userId: result._id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
