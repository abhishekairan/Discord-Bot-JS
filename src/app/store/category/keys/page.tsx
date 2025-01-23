"use client"

import CartDialog from '@/components/cartDialog'
import { Button } from '@/components/ui/button'
import { keys } from '@/mcinfo'
import { useStore } from '@/store/store'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function page() {
  const { selectedCurrency, exchangeRate } = useStore();


  return (
    <div className=" 2xl:px-4 mx-auto w-full ">
      <h1 className=" text-4 text-4xl font-bold text-white mb-8">
        Keys
      </h1>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          keys.map(key => (
            <div
              key={key.id}
              className="rounded-lg h-full w-[100%] cursor-pointer"
              onClick={()=>{
                const modal = document.getElementById(`${key.id}`);
                if (modal) (modal as HTMLDialogElement).showModal();
              }}
            >
              <div className="category-card"  >
                <Image
                  src={key.image}
                  alt={`${key.name} Image`}
                  width={160}
                  height={160}
                  className=" h-[160px] w-auto"
                />
                <div className="text-white flex flex-col px-4 items-center text-center" >
                  <h2 className="text-xl text-orange-500 font-bold">{key.name}</h2>
                  <p className="text-sm font-light mt-2" >Recieve Crate Key to use in-game</p>
                  <h3 className="text-xl font-bold p-2">{parseFloat((key.price * exchangeRate).toFixed(2))} {selectedCurrency.toUpperCase()}</h3>
                </div>
                <Button
                  className="w-[fit-content] bg-amber-700 hover:bg-amber-800 rounded-3xl text-white text-lg font-bold transition duration-300 transform hover:scale-105"
                  onClick={()=>{
                    const modal = document.getElementById(`${key.id}`);
                    if (modal) (modal as HTMLDialogElement).showModal();
                  }}
                >
                  <ShoppingCart /> Buy
                </Button>
              </div>
              <CartDialog id={`${key.id}`} name={key.name} image={key.image} desc={"Recieve Crate Key to use in-game"} price={key.price} />
            </div>  
          ))
        }

      </div>


    </div>
  )
}
