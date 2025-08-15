// app/api/resetpassword/route.ts
import { client } from '@/sanity/lib/client'
import { NextResponse } from 'next/server'

const getUserQuery = (token: string) => `
  *[_type == "user" && resetToken == "${token}"][0]
`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { token, password } = body

    if (!token || !password) {
      return NextResponse.json({ message: 'Token and password are required' }, { status: 400 })
    }

    const user = await client.fetch(getUserQuery(token))
    console.log('User from Sanity:', user)

    if (!user) {
      return NextResponse.json({ message: 'Invalid token or user not found' }, { status: 400 })
    }

    // Check expiry
    const expiryDate = new Date(user.resetTokenExpiry)
    const now = new Date()

    if (isNaN(expiryDate.getTime())) {
      return NextResponse.json({ message: 'Invalid expiry date format' }, { status: 400 })
    }

    if (expiryDate < now) {
      return NextResponse.json({ message: 'Token has expired' }, { status: 400 })
    }

    // Update user password and clear token
    await client
      .patch(user._id)
      .set({
        password,
        resetToken: null,
        resetTokenExpiry: null,
      })
      .commit()

    return NextResponse.json({ message: 'Password reset successful' })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 })
  }
}
