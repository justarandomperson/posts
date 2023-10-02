import { connect } from "@/dbConfig/dbConfig.js"
import User from "@/models/User.js"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

/**
 *
 * @param {NextRequest} req
 */

export async function POST(req) {
  try {
    const reqBody = await req.json()
    const { username, password } = reqBody

    const user = await User.findOne({ username })
    let error = false
    if (!user) {
      error = true
    } else if (!(await bcrypt.compare(password, user.password))) {
      error = true
    }
    if (error) {
      return NextResponse.json(
        {
          message: "Invalid password and/or email",
        },
        {
          status: 400,
        }
      )
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    }
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    })

    const response = NextResponse.json(
      {
        message: "Logged in successfully",
        success: true,
      },
      {
        status: 200,
      }
    )
    response.cookies.set("token", token, { httpOnly: true })

    return response
  } catch (err) {
    return NextResponse.json(
      {
        error: "Something went wrong\nPlease try again",
      },
      {
        status: 500,
      }
    )
  }
}
