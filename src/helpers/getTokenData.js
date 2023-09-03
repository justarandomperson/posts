import { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export const getTokenData = async (req) => {
  try {
    const token = (await req.cookies.get("token"))
    if (token) {
      const data = jwt.verify(token.value, process.env.TOKEN_SECRET)
      return data
    }
    return false
  } catch (err) {
    throw new Error(err.message)
  }
}
