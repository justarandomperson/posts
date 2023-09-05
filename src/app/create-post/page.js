"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"
import EditPostPage from "../components/EditPost"
export default function createPostPage() {
    const [post, setPost] = useState({})
    const router = useRouter()
    const createPost = async () => {
        try {
            router.push("/")
            const res = await axios.post('/api/posts', post)
            if (!res.data.success) {
                throw new Error()
            }
        } catch(err) {
            toast.error("Sorry, something went wrong.")
            router.push("/create-post")
        }

    }
    return (
        <EditPostPage submit={createPost} setPost={setPost} post={post} btnText={"POST"}/>
    )
}