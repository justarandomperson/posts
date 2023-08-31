"use client"
import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function ProfilePage() {
  const [user, setUser] = useState({})
  const [Loading, setLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    try {
      const getUser = async () => {
        const response = await axios.get("/api/users/user")
        setUser(response.data.user)
        setLoading(false)
      }
      getUser()
    } catch {
      toast.error("There was an issue loading the page.\nPlease try again.")
      router.push("/")
    }
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page{" "}
        <span className="block p-2 ml-2 mt-5 w-full rounded bg-orange-500 text-black">
          {Loading ? (
            <svg className="animate-spin h-10 w-full" viewBox="0 0 24 24">
              <path
                className="opacity-75"
                fill="white"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            user.username
          )}
        </span>
      </p>
    </div>
  )
}
