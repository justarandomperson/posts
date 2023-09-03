"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useState, useEffect } from "react"
import Post from "./components/Post"
import Link from "next/link"

export default function getPosts() {
  const [posts, setPosts] = useState([])
  const [isAuth, setAuth] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    try {
      const getPosts = async () => {
        const isAuthres = await axios.get("api/users/user")
        setAuth(isAuthres.data.user ? true : false)
        const response = await axios.get("/api/posts")
        setPosts(response.data.posts)
      }
      getPosts()
    } catch(err) {
      toast.error("There was an issue loading the page.\nPlease try again.")
      router.push("/profile")
    }
  }, [])
  return (
   <main className="h-screen">
    <div className="flex flex-wrap mt-5 ">
    {posts.map(post => (
      <Post title={post.title} content={post.content} creator={post.creator}/>
    ))}
    </div>
    {isAuth ? (
          <div className="absolute bottom-10 w-full text-center">
          <Link href={"/create-post"} className="w-35 p-5 text-xl border border-white hover:bg-gray-500 ">Create new post</Link>
          </div>
    ): (
      ""
    )}
    </main>
  )
}
