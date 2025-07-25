// // app/api/auth/forgot/route.ts
// import { NextResponse } from "next/server"

// export async function POST(req: Request) {
//   const { email } = await req.json()

//   if (!email) {
//     return NextResponse.json({ error: "Email is required" }, { status: 400 })
//   }

//   try {
//     // Example: Lookup user and send email
//     console.log(`Send reset link to ${email}`)

//     // Simulate success
//     return NextResponse.json({ message: "Reset link sent" }, { status: 200 })
//   } catch (err) {
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
//   }
// }



// app/api/auth/forgot/route.ts
import { NextRequest, NextResponse } from "next/server"
import { Resend } from 'resend'
import { client } from '@/sanity/lib/client'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    const userQuery = `*[_type == "user" && email == $email][0]`
    const user = await client.fetch(userQuery, { email })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const resetLink = `http://localhost:3000/resetpassword?token=${token}&email=${email}`

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Click below to reset your password</p><a href="${resetLink}">${resetLink}</a>`,
    })

    await client.patch(user._id)
      .set({ resetToken: token,resetTokenExpiry: new Date(Date.now() + 1000 * 60 * 5_000) // longer time like 3.5 days
})
      .commit()

    return NextResponse.json({ message: 'Reset email sent successfully' })
  } catch (error) {
    console.error("Forgot API Error:", error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
