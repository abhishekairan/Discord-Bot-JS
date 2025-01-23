"use client"

import CartDialog from '@/components/cartDialog'
import { Button } from '@/components/ui/button'
import { coins } from '@/mcinfo'
import { useStore } from '@/store/store'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function ClubCoins() {
  const { selectedCurrency, exchangeRate } = useStore();


  return (
    <div className=" 2xl:px-4 mx-auto w-full ">
      <h1 className=" text-4 text-4xl font-bold text-white mb-8">
        Club Coins
      </h1>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          coins.map(coin => (
            <div
              key={coin.id}
              className="rounded-lg h-full w-[100%] cursor-pointer"
              onClick={()=>{
                const modal = document.getElementById(`${coin.id}`);
                if (modal) (modal as HTMLDialogElement).showModal();
              }}
            >
              <div className="category-card"  >
                <Image
                  src={coin.image}
                  alt={`${coin.name} Image`}
                  width={160}
                  height={160}
                  className=" h-[160px] w-auto"
                />
                <div className="text-white flex flex-col px-4 items-center text-center" >
                  <h2 className="text-xl text-orange-500 font-bold">{coin.name}</h2>
                  <p className="text-sm font-light mt-2" >Recieve In-game money to use in-game</p>
                  <h3 className="text-xl font-bold p-2">{parseFloat((coin.price * exchangeRate).toFixed(2))} {selectedCurrency.toUpperCase()}</h3>
                </div>
                <Button
                  className="w-[fit-content] bg-amber-700 hover:bg-amber-800 rounded-3xl text-white text-lg font-bold transition duration-300 transform hover:scale-105"
                  onClick={()=>{
                    const modal = document.getElementById(`${coin.id}`);
                    if (modal) (modal as HTMLDialogElement).showModal();
                  }}
                >
                  <ShoppingCart /> Buy
                </Button>
              </div>
              <CartDialog id={`${coin.id}`} name={coin.name} image={coin.image} desc={"Recieve In-game money to use in-game"} price={coin.price} />
            </div>  
          ))
        }

      </div>


    </div>
  )
}
