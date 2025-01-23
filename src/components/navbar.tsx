"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const links = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/wiki", label: "Wiki" },
]

export default function Navbar() {


  return (
    <header className="py-4 pb-16 font-bold text-2xl text-white">
      <div className="lg:mx-auto sm:mx-8 max-w-full lg:w-[60rem] xl:w-[64rem] grid grid-cols-1 gap-2 sm:gap-0 sm:flex justify-between items-center">
        <div className="flex gap-4 items-center mx-auto sm:mx-0">
          <Image src={"/images/logo/logo.png"} alt="server logo" height={64} width={64} />
          <CopyButton />
        </div>

        

        <nav className="flex gap-4 sm:gap-8 md:gap-12 underline mx-auto sm:mx-0">
          {
            links.map(link => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))
          }
        </nav>
      </div>

    </header>
  )
}


export function CopyButton() {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText("play.clubcolony.in");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button className="flex flex-col cursor-pointer" onClick={handleClick}>
      <p className="text-base">PLAY.CLUBCOLONY.IN</p>
      <p
        className="relative inline-flex pr-4 overflow-hidden font-medium transition duration-300 ease-out group"
      >
        <span
          className={`absolute inset-0 flex w-full h-full text-white duration-300 ${
            isCopied ? "translate-x-0" : "-translate-x-full"
          } ease text-sm text-green-600 font-bold`}
        >
          Copied!
        </span>
        <span
          className={`absolute flex w-full h-full text-white transition-all duration-300 transform ${
            isCopied ? "translate-x-full" : "translate-x-0"
          } ease font-light text-sm text-white/50`}
        >
          Click to Copy
        </span>
        <span className="relative text-sm font-lgiht invisible">
          Click to copy
        </span>
      </p>
    </button>
  )
}