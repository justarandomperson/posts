"use client"
import Link from "next/link"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navigation(req) {
  const [isAuth, SetIsAuth] = useState(false)
  const [Loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    try {
      const getUser = async () => {
        const response = await axios.get("/api/users/user")
        SetIsAuth(response.data.user ? true : false)
        setLoading(false)
      }
      getUser()
    } catch {}
  }, [pathname])

  const Logout = async () => {
    try {
      await axios.get("/api/users/logout")
      router.push("/login")
    } catch (err) {
      toast.error("There was an issue logging out.\nPlease try again.")
    }
  }

  return (
    <nav className="border border-white border-t-0 border-l-0 border-r-0 w-full h-12">
      {Loading ? (
        <svg className="animate-spin h-2/3 w-full" viewBox="0 0 24 24">
          <path
            className="opacity-75 h-5"
            fill="white"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <div className="flex mx-5 items-center h-full w-full">
          <Link href={"/"} className="text-gray-300 hover:text-white mr-5">
          Posts
          </Link>
          {isAuth ? (
            <div className="flex w-full">
              <Link href={"/profile"} className="text-gray-300 hover:text-white">Profile</Link>
              <div className="flex justify-end w-full mr-10">
                <button
                className="text-gray-300 hover:text-white"
                onClick={Logout}
                >
                Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end w-full mr-10">
              <Link
                href={"/signup"}
                className="mr-5 text-gray-300 hover:text-white"
              >
                Signup
              </Link>
              <Link href={"/login"} className="text-gray-300 hover:text-white">
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
