import { NextResponse } from "next/server"
import Post from "@/models/Post"
import { getTokenData } from "@/helpers/getTokenData"


export async function GET(req, {params}) {
    try {
        const id = params.id
        const post = await Post.findById(id)
        return NextResponse.json({
            post:post,
            success:true
        })
    } catch(err) {
        return NextResponse.json({
           err:err 
        })
    }
}

export async function DELETE(req, {params}) {
    try {
        const id = params.id
        const user = await getTokenData(req)
        const post = await Post.findById(id)
        if (post.creator !== user.username) {throw new Error()}
        await Post.findByIdAndDelete(id)
        const posts = await Post.find()
        return NextResponse.json({
            posts: posts,
            success: true
        })
    } catch(err) {
        console.log(err)
        return NextResponse.json({
            err: err
        })
    }
}