
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const header = req.headers.get("authorization")

  if (!header) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const user = JSON.parse(header)

    if (user.role !== "admin") {
      return NextResponse.json({ message: "Access denied" }, { status: 403 })
    }

    return NextResponse.json({ message: "Welcome Admin" })
  } catch (error) {
    return NextResponse.json({ message: "Invalid auth format" }, { status: 400 })
  }
}


