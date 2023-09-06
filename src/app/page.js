"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useState, useEffect } from "react"
import Post from "./components/Post"
import Link from "next/link"
import LoadingCircle from "./components/LoadingCircle"

export default function GetPostsPage() {
  const [posts, setPosts] = useState([])
  const [isAuth, setAuth] = useState(false)
  const [Loading, setLoading] = useState(true)
  const [user, setUser] = useState("")
  const router = useRouter()
  
  useEffect(() => {
    try {
      const GetPosts = async () => {
        const isAuthres = await axios.get("api/users/user")
        setAuth(isAuthres.data.user ? true : false)
        setUser({username: isAuthres.data.user.username, isAdmin: isAuthres.data.user.isAdmin})
        const response = await axios.get("/api/posts")
        setLoading(false)
        setPosts(response.data.posts)
      }
      GetPosts()
    } catch(err) {
      toast.error("There was an issue loading the page.\nPlease try again.")
      router.push("/profile")
    }
  }, [])
  return (
   <main className="h-screen">
    {Loading ? (
      <div className="text-center">
        <h1 className="mt-10 text-4xl mb-10">Loading posts</h1>
        <LoadingCircle height={"h-10"}/>
      </div>
    ) : (
    <div className="flex flex-wrap">
    {posts.map(post => (
      <Post key = {post._id} post={post} user={user} posts={posts} setPosts={setPosts}/>
    ))}
    {isAuth ? (
          <div className="absolute bottom-10 w-full text-center">
          <Link href={"/create-post"} className="w-35 p-5 text-xl border border-white hover:bg-gray-500 ">Create new post</Link>
          </div>
    ): (
      ""
    )}
      </div>
  )}
    </main>
  )
}
