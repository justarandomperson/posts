import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { connect } from "@/dbConfig/dbConfig.js"
import { getTokenData } from "@/helpers/getTokenData"
import Post from "@/models/Post"

export async function GET(req) {
    try {
        const posts = await Post.find()
        return NextResponse.json({
            posts,
            success:true
        })
    } catch(err) {
        return NextResponse.json({
            message: "Something went wrong",
            err:err
        })
    }
}

export async function POST(req) {
   try {
    const reqBody = await req.json()
    const {title, content} = reqBody
    const creator = await getTokenData(req)
    const post = new Post({
        title, content, creator: creator.username
    })
    await post.save()
    return NextResponse.json({
        message: "Post successfully posted.",
        success: true
    })
   } catch(err) {
    return NextResponse.json({
        message: "Something went wrong",
        err: err
    })
   }
}

export async function PUT(req) {
    try {
        const reqBody = await req.json()
        const {title, content, id} = reqBody
        const user = await getTokenData(req)
        const post = await Post.findById(id)
        if (user.username !== post.creator) {throw new Error()}
        post.title = title
        post.content = content
        await post.save()
        return NextResponse.json({
            message: "Post successfully edited.",
            success: true
        })
    } catch(err) {
        console.log(err)
        return NextResponse.json({
            err:err
        })
    }
}
