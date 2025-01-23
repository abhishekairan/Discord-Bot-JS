"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import player from "../../public/images/bg/player.png"
import { Button } from '@/components/ui/button'
import { Copy, ExternalLink } from 'lucide-react'
import { discordLink, votingSites } from '@/mcinfo'
import axios from 'axios'

import srvGif from "../../public/images/logo/logo.gif"
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [isCopied, setIsCopied] = useState(false);
  const [srvStatus, setSrvStatus] = useState({
    online: false,
    hostname: "",
    players: {
      online: 0,
      max: 0
    },
  });

  const [loading, setLoading] = useState(true);
  const router = useRouter()

  const handleClick = () => {
    navigator.clipboard.writeText("play.clubcolony.in");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  useEffect(() => {
    const getStatus = async () => {
      setLoading(true)
      const { data } = (await axios.get("https://api.mcsrvstat.us/3/play.clubcolony.in:25572"))
      const { online, hostname } = data

      setSrvStatus({
        online,
        hostname,
        players: {
          online: data.players.online,
          max: data.players.max
        }
      })
    }
    getStatus()
    setLoading(false)
  }, [])

  return (
    <section className="text-white py-6 sm:px-8 lg:px-2 flex flex-col gap-8">
      
      <div className="flex w-full">
        
        <div className="flex w-full md:px-12">
          <div className="grid grid-cols-4 md:grid-cols-2 gap-8 w-full sm:px-4 lg:px-12">
            <div
              className="col-span-2 md:col-span-1"
            >
              <button 
                onClick={handleClick}
                className="home-btn home-btn-green group"
              >
                <div className="text-center">
                  <h3 className="text-xl font-minecraft mb-2">COPY IP</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-green-400">ONLINE</span>
                    <Copy className="w-4 h-4 hidden group-hover:block transition-opacity" />
                  </div>
                </div>
              </button>
            </div>

            <div
              className="col-span-2 md:col-span-1"
            >
              <button 
                onClick={() => window.open(discordLink, '_blank')}
                className="home-btn home-btn-blue group"
              >
                <div className="text-center">
                  <h3 className="text-xl font-minecraft mb-2">DISCORD</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-blue-400">ONLINE</span>
                    <ExternalLink className="w-4 h-4 hidden group-hover:block transition-opacity" />
                  </div>
                </div>
              </button>
            </div>

            <div
              className="col-span-2 md:col-span-1"
              onClick={() => router.push("/store")}
            >
              <button 
                className="home-btn home-btn-red group"
              >
                <div className="text-center">
                  <h3 className="text-xl font-minecraft mb-2">STORE</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-red-400">PURCHASES</span>
                    <ExternalLink className="w-4 h-4 hidden group-hover:block transition-opacity" />
                  </div>
                </div>
              </button>
            </div>

            <div
              className="col-span-2 md:col-span-1"
              onClick={() => router.push("/wiki")}
            >
              <button 
                className="home-btn home-btn-gray group"
              >
                <div className="text-center">
                  <h3 className="text-xl font-minecraft mb-2">WIKI</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-400">PAGES</span>
                    <ExternalLink className="w-4 h-4 hidden group-hover:block transition-opacity" />
                  </div>
                </div>
              </button>
            </div>
          </div>
          
          <div>
            <Image src={player} alt="Player" className="sm:block hidden" />
          </div>    
        </div>
      
      </div>

      <div className="">
        <Image src={srvGif} alt="Server Gif" className=" h-28 sm:h-32 md:h-36 mx-auto w-auto my-8" unoptimized />
      </div>

      <div className="grid grid-cols-2 gap-4 w-full text-center">
        <div className="text-white bg-black/40 flex flex-col items-center justify-center py-8 rounded-xl hover:scale-105 active:scale-100 transition ease-in-out duration-300">
          <h2 className="text-xl text-gray-500 font-semibold">Online Players</h2>
          <h3 className="text-3xl font-bold" > {loading ? "Loading.." : `${srvStatus.players.online}/${srvStatus.players.max}`} </h3>
        </div>
        <div className="text-white bg-black/40 flex flex-col items-center justify-center py-8 rounded-xl hover:scale-105 active:scale-100 transition ease-in-out duration-300">
          <h2 className="text-xl text-gray-500 font-semibold">Server Uptime</h2>
          <h3 className="text-3xl font-bold" > 99.9% </h3>
        </div>
      </div>


      <div className=" text-center bg-gradient-to-r from-gray-800/70 to-gray-900/70 text-white flex flex-col justify-center items-center gap-4 py-6 rounded-3xl">
        <h2 className="text-4xl font-bold">Vote for our Server</h2>
        <p className="font-light text-gray-300">Support us by voting and recieve amazing rewards</p>
        <div className="flex flex-wrap justify-center items-center px-4 gap-2">
          {
            votingSites.map((site) => (
              <Link key={site.id} href={site.link} target="_blank" rel="noopener noreferrer" className="btn font-bold bg-orange-800 hover:bg-orange-900 hover:scale-105">
                {site.name}
              </Link>
            ))
          }
        </div>
      </div>
    
    </section>
  )
}
