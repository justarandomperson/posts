"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import LoadingCircle from "../components/LoadingCircle"

export default function PageView({params}) {
    const [post, setPost] = useState({})
    const [Loading, setLoading] = useState(true)
    const id = params.postId
    useEffect(()=> {
        const getPostData = async() => {
            const response = await axios("/api/posts/"+id)
            const {title, content, creator} = response.data.post
            setPost({title: title, content: content, creator:creator})
            setLoading(false)
        }
        getPostData()
    }, [])

    return (
        <main className="h-screen w-screen mt-10">
        <div className="mx-auto w-1/2 h-4/5 border border-white">
            {Loading ? (
                <div className="flex items-center h-full">
                    <LoadingCircle height={"h-20"}/>
                </div>
            ) : (
                <div>
                <h1 className="w-full bg-transparent text-center p-2 text-2xl break-words">{post.title}</h1>
                <hr/>
                <h2 className="h-[90%] w-full bg-transparent resize-none border-none outline-none text-xl p-2">{post.content}</h2>
                </div>
            )}
        </div>
        </main>
    )
}