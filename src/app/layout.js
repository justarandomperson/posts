import "./globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import Navigation from "./components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "next",
  description: "lol",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " overflow-hidden"}>
        <Navigation isAuth={true} />
        <Toaster />
        {children}
      </body>
    </html>
  )
}
