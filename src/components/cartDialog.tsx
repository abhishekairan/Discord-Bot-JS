"use client"

import { useStore } from '@/store/store';
import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { discordLink } from '@/mcinfo';

interface CartDialogProps {
  id: string;
  name: string;
  image: string;
  desc: string;
  price: number;
}

export default function CartDialog({ id, name, image, desc, price }: CartDialogProps) {
    const { exchangeRate, selectedCurrency } = useStore()


  return (
    <>
      <dialog id={id} className="modal bg-transparent/50 z-[9999]">
        <div className="modal-box bg-[#1A1A1A] border-4 border-[#282828] p-0">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <br />
          <div className="p-[0.875rem] border-b border-b-[#282828] flex flex-col items-center justify-center">
            <Image
              src={image}
              alt={`${name} Image`}
              width={140}
              height={140}
              className=" h-[140px] w-auto"
            />
            <h2 className="text-2xl text-orange-500 font-bold">{name}</h2>

          </div>
          
          <div className="p-[0.875rem]">
            <p className="mb-2" />
            <p className="text-base font-light mb-2" >{desc}</p>
            <p className="mb-2" />
          </div>

          <div className="flex justify-between p-[0.875rem] border-t border-t-[#282828]">
            <h3 className="text-2xl font-bold p-2">{parseFloat((price * exchangeRate).toFixed(2))} {selectedCurrency.toUpperCase()}</h3>
            <Button
              className="w-[fit-content] bg-amber-700 hover:bg-amber-800 rounded-3xl text-white text-lg font-bold transition duration-300 transform hover:scale-105 active:scale-95 active:bg-orange-800"
              onClick={() => window.open(discordLink, '_blank')}
            >
              <img src={"/images/logo/discord.svg"} alt="discord logo" width={32} height={32} /> Join Discord To Buy
            </Button>
          </div>
        </div>
      </dialog>
    </>
  )
}
