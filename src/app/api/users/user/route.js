import { NextResponse, NextRequest } from "next/server"
import { getTokenData } from "@/helpers/getTokenData"
import User from "@/models/User"
import { connect } from "@/dbConfig/dbConfig"

connect()

export async function GET(req) {
  try {
    const user = await getTokenData(req)
    return NextResponse.json({
      message: "User found",
      user: user,
    })
  } catch (err) {
    return NextResponse.json(
      {
        message: err.message,
      },
      {
        status: 500,
      }
    )
  }
}
