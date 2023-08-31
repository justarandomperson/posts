import { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export const getTokenData = async (req) => {
  try {
    const token = (await req.cookies.get("token").value) || ""
    const data = jwt.verify(token, process.env.TOKEN_SECRET)
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}
