"use client"
import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import LoadingCircle from "../components/LoadingCircle"

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
    <div className="flex flex-col items-center h-screen py-2">
      <div className="text-4xl w-full text-center">
        Profile page
        <span className="block mt-10 text-center">
          {Loading ? (
            <LoadingCircle height={"h-10"}/>
          ) : (
          "Welcome, " + user.username + "."
          )}
        </span>
      </div>
    </div>
  )
}
