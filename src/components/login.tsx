"use client"

import { useStore } from '@/store/store'
import axios from 'axios'
import { ChevronRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Login() {
  const pathname = usePathname()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const {setUser} = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post("/api/login", { username, url: pathname })
      setUser(username)
      if (pathname === "/store/login") {
        router.push("/store")
      } else {
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <section className="text-white">
      <h1 className="text-5xl mb-6">Login</h1>
      
      <form className="flex flex-col gap-2 items-center" onSubmit={handleSubmit}>
        <label htmlFor="username" className="text-2xl">Enter your Minecraft username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="rounded-[2rem] py-4 px-4 bg-white text-black w-[50%]"
          placeholder="Enter your Minecraft username"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <button className="flex gap-2 py-4 text-lg items-center justify-center bg-[#FF7F50] rounded-[2rem] w-[50%]">
          Continue <ChevronRight />
        </button>
      </form>

    </section>
  )
}
