// app/api/auth/logout/route.ts (if using App Router)
import { NextResponse } from "next/server"

export async function POST() {
  // You can clear cookies or session here if you are using them
  return NextResponse.json({ message: "Logged out successfully" }, { status: 200 })
}
