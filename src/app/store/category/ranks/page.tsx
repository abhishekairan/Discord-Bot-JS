'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Loader, ShoppingCart, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

import { discordLink, features, ranksTable } from '@/mcinfo'
import { useStore } from '@/store/store'

import CartDialog from '@/components/cartDialog'


export default function RanksPage() {
  const { user } = useStore()
  const [loading, setLoading] = useState(false)

  const { selectedCurrency, exchangeRate } = useStore();
  const { toast } = useToast()
  const router = useRouter()


  const handlePurchaseBtnClick = async (e: React.FormEvent, rank: typeof ranksTable[0] | null, id: string) => {
    e.preventDefault()
    if (!user) {
      router.replace('/login')
      toast({ title: 'You need to be logged in to purchase ranks', variant: "destructive" })
    }
    const modal = document.getElementById(id);
    if (modal) (modal as HTMLDialogElement).showModal();
  }

  

  return (
    <div className="py-8 2xl:px-4 mx-auto max-w-6xl ">
      <h1 className=" text-4 text-4xl font-bold text-white mb-8">
        Ranks
      </h1>

      <div className="grid gap-4 grid-cols-1 min-[450px]:grid-cols-2 sm:hidden mt-16 text-yellow-400">
        {
          ranksTable.map((rank) => (
            <div key={rank.id} className="border-4 bg-[#1A1A1A]/90 border-yellow-600 py-4 px-2" >
              <div className="relative w-full h-48 mx-auto">
                <Image
                  src={rank.image}
                  alt={rank.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold mt-2 minecraft-font text-center text-[#FFA500]">
                {rank.name}
              </h2>
              <p className="text-2xl text-[#FFD700] text-center mb-2">{parseFloat((rank.price * exchangeRate).toFixed(2))} {selectedCurrency.toUpperCase()} per month</p>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white transition duration-300 transform hover:scale-105"
                onClick={(e) => handlePurchaseBtnClick(e, rank, `${rank.id}abc`)}
              >
                <ShoppingCart /> Buy Now
              </Button>
              <CartDialog id={`${rank.id}abc`} name={rank.name} image={rank.image} desc={"Recieve In-game Ranks to get extra perks"} price={rank.price} />
            </div>
          ))
        }
      </div>

      <div className="mt-16 lg:overflow-hidden overflow-x-auto  rounded-lg max-w-5xl mx-auto">
        <table className="w-full border-separate border-spacing-x-2 rounded-lg text-wrap">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 text-2xl text-[#FFA500]">
                &nbsp;
              </th>
              {ranksTable.map((rank) => (
                <th
                  key={rank.id}
                  className="px-2 py-4 bg-[#1A1A1A] text-yellow-400 border border-yellow-600 "
                >
                  <div className="hidden lg:block relative w-full h-48 mx-auto">
                    <Image
                      src={rank.image}
                      alt={rank.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-3xl font-bold mt-2 minecraft-font text-center text-[#FFA500]">
                    {rank.name}
                  </h2>
                  <p className="text-2xl text-[#FFD700] text-center mb-2">{parseFloat((rank.price * exchangeRate).toFixed(2))} {selectedCurrency.toUpperCase()} per month</p>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white transition duration-300 transform hover:scale-105"
                    onClick={(e) => handlePurchaseBtnClick(e, rank, `${rank.id}def`)}
                  >
                    <ShoppingCart /> Buy Now
                  </Button>
                  <CartDialog id={`${rank.id}def`} name={rank.name} image={rank.image} desc={"Recieve In-game Ranks to get extra perks"} price={rank.price} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              features.map((feature, featureIdx) => (
                <tr key={featureIdx}>
                <td className={`sticky left-0 px-2 py-4 ${featureIdx % 2 == 0 ? "bg-[#2C2C2C]" : "bg-[#1A1A1A]"} text-yellow-400 font-bold border border-zinc-600`}>
                  {feature}
                </td>
                {ranksTable.map((rank, rankIdx) => (
                  <td
                    key={rankIdx}
                    className={`px-2 py-4  ${featureIdx % 2 == 0 ? "bg-[#2C2C2C]" : "bg-[#1A1A1A]"} text-gray-300 border border-yellow-600 text-center`}
                  >
                    {rank.features[featureIdx] === true ? (
                      <Check color="green" className="flex justify-center w-full" />
                    ) : rank.features[featureIdx] === false ? (
                      <X color="red" className="flex justify-center w-full"/>
                    ) : (
                      rank.features[featureIdx]
                    )}
                    
                  </td>
                ))}
              </tr>
              ))
            }

            <tr>
              <td className="sticky left-0 z-10" >&nbsp;</td>
              {ranksTable.map((rank) => (
                <td className="px-2 py-4 border border-yellow-600 text-center bg-[#1A1A1A]" key={rank.id} >
                  <Button
                    className=" bg-green-600 hover:bg-green-700 rounded-3xl text-black transition duration-300 transform hover:scale-105"
                    onClick={(e) => handlePurchaseBtnClick(e, rank, `${rank.id}ghi`)}
                  >
                    <ShoppingCart /> Buy
                    
                  </Button>
                  <CartDialog id={`${rank.id}ghi`} name={rank.name} image={rank.image} desc={"Recieve In-game Ranks to get extra perks"} price={rank.price} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

