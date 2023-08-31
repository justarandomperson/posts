"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  })
  const [Loading, setLoading] = React.useState(false)

  useEffect(() => {
    const signupButton = document.querySelector('[name="signup"]')
    const isValid =
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0 &&
      !Loading
    if (isValid) {
      signupButton.classList.remove("opacity-50")
    } else {
      signupButton.classList.add("opacity-50")
    }
    signupButton.disabled = !isValid
  }, [user, Loading])

  const onSignup = async () => {
    try {
      setLoading(true)
      await axios.post("/api/users/signup", user)
      router.push("/login")
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error)
      } else {
        toast.error("Something went wrong.\nPlease try again.")
      }
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Signup</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="text-black p-1 mb-3 rounded"
        id="username"
        value={user.username}
        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      ></input>
      <label htmlFor="email">email</label>
      <input
        className="text-black p-1 mb-3 rounded"
        id="email"
        type="email"
        value={user.email}
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      ></input>
      <label htmlFor="password">password</label>
      <input
        className="text-black p-1 rounded"
        id="password"
        type="password"
        value={user.password}
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      ></input>
      <button
        className="border p-2 w-1/12 my-5 rounded h-10"
        onClick={onSignup}
        name="signup"
      >
        {Loading ? (
          <svg className="animate-spin h-full w-full" viewBox="0 0 24 24">
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "Signup"
        )}
      </button>
      <Link href="/login" className="mb-40">
        Login
      </Link>
    </div>
  )
}
