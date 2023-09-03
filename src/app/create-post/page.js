"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"


export default function createPostPage() {
    const [post, setPost] = useState({})
    const router = useRouter()
    const createPost = async () => {
        try {
            const res = await axios.post('api/posts', post)
            if (!res.data.success) {
                throw new Error()
            }
            router.push("/")
        } catch(err) {
            toast.error("Sorry, something went wrong.")
        }

    }
    return (
        <main className="h-screen w-screen mt-10">
            <div className="mx-auto w-1/2 h-4/5 border border-white">
                <input className="w-full h-[10%] bg-transparent text-center p-2 text-2xl" placeholder="title" alue = {
                    post.title} onChange={(e) => setPost({ ...post, title: e.target.value })}></input>
                <hr/>
                <textarea className="h-[90%] w-full bg-transparent resize-none border-none outline-none text-xl p-2" placeholder="content" 
                value = {post.content} onChange={(e) => setPost({ ...post, content: e.target.value })}/>
                <button className="float-right border border-white p-2 mt-0 w-20 hover:bg-gray-500" onClick={createPost} >POST</button>
            </div>
        </main>
    )
}