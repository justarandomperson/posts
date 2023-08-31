import { connect } from "@/dbConfig/dbConfig.js"
import User from "@/models/User.js"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

connect()

/**
 *
 * @param {NextRequest} req
 */

export async function POST(req) {
  try {
    const reqBody = await req.json()
    const { username, email, password } = reqBody
    let error
    if (await User.findOne({ email })) {
      error = "Email is already used"
    }
    if (await User.findOne({ username })) {
      error += "\n Username is already used"
    }
    if (error) {
      return NextResponse.json(
        {
          error: error,
        },
        {
          status: 400,
        }
      )
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({
      username,
      email,
      password: hashedPassword,
    })
    const result = await user.save()
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        user: result,
      },
      {
        status: 201,
      }
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    )
  }
}
