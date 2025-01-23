"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { Banknote, CircleHelp, Coins, Crown, Gem, KeySquare, LogOut } from 'lucide-react'
import Image from 'next/image'
import { Pattaya } from 'next/font/google';
import CurrencyDropdown from './currencyDropdown'
import { useStore } from '@/store/store'
import localFont from "next/font/local"
import axios from 'axios'
import { useRouter } from 'next/navigation'


const pattaya = Pattaya({
  subsets: ["latin"],
  variable: "--font-pattaya",
  weight: ["400"]
})

const mcFont = localFont({src: "./mcfont.otf"})

const links = [
  { id: 1, href: "/store/category/ranks", label: "Ranks", icon: <Crown className="text-orange-700" /> },
  { id: 2, href: "/store/category/keys", label: "Keys", icon: <KeySquare className="text-orange-700" /> },
  { id: 3, href: "/store/category/money", label: "Money", icon: <Banknote className="text-orange-700" /> },
  { id: 4, href: "/store/category/coins", label: "Club Coins", icon: <Coins className="text-orange-700" /> },
  { id: 5, href: "/store/category/bundles", label: "Bundles", icon: <Gem className="text-orange-700" /> },
]

export default function Header() {
  const { setCurrency, user, setUser } = useStore();
  const router = useRouter()

  const handleCurrencyChange = async (currency: string) => {
    await setCurrency(currency);
  };

  const handleBtn = async (e: any) => {
    e.preventDefault();
    if (user) {
      try {
        await axios.post("/api/logout", { username: user });
        router.push("/store")
        setUser(null);
      } catch (error) {
        console.log("An internal Error occured")
      }
    }
    else {
      router.replace("/store/login")
    }
  }

  return (
    <header className="min-h-28 mb-6 flex justify-center items-center">
      <div className="mx-auto py-4 px-4 w-full xl:w-[80rem] flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between items-center" >
        <div className="flex justify-center items-center">
          <Link href="/store" className="flex gap-4 justify-center items-center">
            <Image src={"/images/logo/logo.png"} width={80} height={80} alt="club colony logo" className="lg:h-20 h-12 w-auto rounded-xl lg:hidden min-[1100px]:block"/>
            <h2 className={`text-orange-600 font-bold text-4xl ${mcFont.className} lg:flex lg:flex-col`}>Club<span> Colony</span></h2>
          </Link>
        </div>

        <nav className="flex flex-wrap justify-center items-center gap-4 lg:gap-0 lg:bg-zinc-800 border-custom text-white font-bold shadow-xl">
          {
            links.map((link) => (
              <Link href={link.href} key={link.id} className="nav-block hover:scale-110 ">
                {link.label} {link.icon}
              </Link>
            ))
          }
        </nav>

        <div className="flex flex-wrap justify-center gap-4 lg:gap-0  lg:bg-zinc-800 text-white font-bold border-custom shadow-xl">
          <button className={`${user && "hover:line-through"} bg-zinc-700 hover:bg-zinc-800 lg:bg-transparent nav-block rounded-full lg:rounded-none`} onClick={handleBtn}>
            <Image src={"https://mc-heads.net/avatar/MHF_Steve"} alt="steve" width={24} height={24} />
            <div className="">
              {user ? user : 'Login'}
            </div>
            <div className={`${!user && "hidden"}`}>
              <LogOut />
            </div>
          </button>

          <CurrencyDropdown className="nav-block flex gap-2 items-center p-2 text-base w-full h-full rounded-full lg:rounded-none justify-between lg:bg-transparent bg-zinc-700 text-gray-200 hover:bg-zinc-800 lg:hover:bg-zinc-900" onCurrencyChange={handleCurrencyChange}  />

          <Link href={"/discord"} target="_blank" rel="noopener noreferrer" className="bg-zinc-700 hover:bg-zinc-800 lg:bg-transparent nav-block rounded-full lg:rounded-none">
            <CircleHelp className="rounded-full text-white" />
          </Link>
        </div>
      </div>
    </header>
  )
}
