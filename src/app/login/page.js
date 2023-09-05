"use client"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"
import LoadingCircle from "../components/LoadingCircle"

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  })
  const [Loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const loginButton = document.querySelector('[name="login"]')
    const isValid =
      user.username.length > 0 && user.password.length > 0 && !Loading
    if (isValid) {
      loginButton.classList.remove("opacity-50")
    } else {
      loginButton.classList.add("opacity-50")
    }
    loginButton.disabled = !isValid
  }, [user, Loading])
  const onLogin = async () => {
    try {
      setLoading(true)
      const res = await axios.post("/api/users/login", user)
      router.push("/profile")
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error)
      } else {
        toast.error("Something went wrong.mPlease try again.")
      }
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 >Login</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="text-black p-1 mb-3 rounded"
        id="username"
        value={user.username}
        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      ></input>
      <label htmlFor="password" >password</label>
      <input
        className="text-black p-1 rounded"
        id="password"
        type="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      ></input>
      <button
        className="border p-2 w-1/12 my-5 rounded h-10 "
        onClick={onLogin}
        name="login"
      >
        {Loading ? (
         <LoadingCircle height={"h-full"}/>
        ) : (
          "Login"
        )}
      </button>
      <Link href="/signup" className="mb-40 text-white">
        Sign up
      </Link>
    </div>
  )
}
