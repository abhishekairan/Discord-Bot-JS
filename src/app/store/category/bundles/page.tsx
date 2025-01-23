"use client"

import CartDialog from '@/components/cartDialog';
import { Button } from '@/components/ui/button';
import { bundles } from '@/mcinfo';
import { useStore } from '@/store/store';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

export default function Bundles() {
  const { exchangeRate, selectedCurrency } = useStore();

  return (
    <div className="2xl:px-4 mx-auto w-full">
      
      <h1 className=" text-4 text-4xl font-bold text-white mb-8">
        Bundles
      </h1>

      <div role="tablist" className="tabs tabs-bordered w-full grid-cols-3">
        <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl h-10" aria-label="VIP & Keys" defaultChecked/>
        <div role="tabpanel" className="tab-content rounded-box p-6">
          <TabOne exchangeRate={exchangeRate} selectedCurrency={selectedCurrency} />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl h-10" aria-label="VIP+ & Keys"/>
        <div role="tabpanel" className="tab-content rounded-box p-6">
          <TabTwo exchangeRate={exchangeRate} selectedCurrency={selectedCurrency} />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl h-10" aria-label="MVP & Keys" />
        <div role="tabpanel" className="tab-content rounded-box p-6">
         <TabThree exchangeRate={exchangeRate} selectedCurrency={selectedCurrency} />
        </div>
      </div>
    </div>
  )
}


function TabOne({exchangeRate, selectedCurrency}: {exchangeRate: number, selectedCurrency: string}) {

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {
          bundles[0].map(bundle => (
            <div
              key={bundle.id}
              className="rounded-lg h-full w-[100%] cursor-pointer"
              onClick={()=>{
                const modal = document.getElementById(`${bundle.id}`);
                if (modal) (modal as HTMLDialogElement).showModal();
              }}
            >
              <div className="category-card"  >
                <Image
                  src={bundle.image}
                  alt={`${bundle.name} Image`}
                  width={160}
                  height={160}
                  className=" h-[160px] w-auto"
                />
                <div className="text-white flex flex-col px-4 items-center text-center" >
                  <h2 className="text-xl text-orange-500 font-bold">{bundle.name}</h2>
                  <p className="text-sm font-light mt-2" >Recieve In-game money to use in-game</p>
                  <h3 className="text-xl font-bold p-2">{parseFloat((bundle.price * exchangeRate).toFixed(2))} {selectedCurrency.toUpperCase()}</h3>
                </div>
                <Button
                  className="w-[fit-content] bg-amber-700 hover:bg-amber-800 rounded-3xl text-white text-lg font-bold transition duration-300 transform hover:scale-105"
                  onClick={()=>{
                    const modal = document.getElementById(`${bundle.id}`);
                    if (modal) (modal as HTMLDialogElement).showModal();
                  }}
                >
                  <ShoppingCart /> Buy
                </Button>
              </div>
              <CartDialog id={`${bundle.id}`} name={bundle.name} image={bundle.image} desc={"Recieve In-game money to use in-game"} price={bundle.price} />
            </div>  
          ))
        }

    </div>
  )
}


function TabTwo({exchangeRate, selectedCurrency}: {exchangeRate: number, selectedCurrency: string}) {
  

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {
          bundles[1].map(bundle => (
            <div
              key={bundle.id}
              className="rounded-lg h-full w-[100%] cursor-pointer"
              onClick={()=>{
                const modal = document.getElementById(`${bundle.id}`);
                if (modal) (modal as HTMLDialogElement).showModal();
              }}
            >
              <div className="category-card"  >
                <Image
                  src={bundle.image}
                  alt={`${bundle.name} Image`}
                  width={160}
                  height={160}
                  className=" h-[160px] w-auto"
                />
                <div className="text-white flex flex-col px-4 items-center text-center" >
                  <h2 className="text-xl text-orange-500 font-bold">{bundle.name}</h2>
                  <p className="text-sm font-light mt-2" >Recieve In-game money to use in-game</p>
                  <h3 className="text-xl font-bold p-2">{parseFloat((bundle.price * exchangeRate).toFixed(2))} {selectedCurrency.toUpperCase()}</h3>
                </div>
                <Button
                  className="w-[fit-content] bg-amber-700 hover:bg-amber-800 rounded-3xl text-white text-lg font-bold transition duration-300 transform hover:scale-105"
                  onClick={()=>{
                    const modal = document.getElementById(`${bundle.id}`);
                    if (modal) (modal as HTMLDialogElement).showModal();
                  }}
                >
                  <ShoppingCart /> Buy
                </Button>
              </div>
              <CartDialog id={`${bundle.id}`} name={bundle.name} image={bundle.image} desc={"Recieve In-game money to use in-game"} price={bundle.price} />
            </div>  
          ))
        }

    </div>
  )
}


function TabThree({exchangeRate, selectedCurrency}: {exchangeRate: number, selectedCurrency: string}) {
  

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {
          bundles[2].map(bundle => (
            <div
              key={bundle.id}
              className="rounded-lg h-full w-[100%] cursor-pointer"
              onClick={()=>{
                const modal = document.getElementById(`${bundle.id}`);
                if (modal) (modal as HTMLDialogElement).showModal();
              }}
            >
              <div className="category-card"  >
                <Image
                  src={bundle.image}
                  alt={`${bundle.name} Image`}
                  width={160}
                  height={160}
                  className=" h-[160px] w-auto"
                />
                <div className="text-white flex flex-col px-4 items-center text-center" >
                  <h2 className="text-xl text-orange-500 font-bold">{bundle.name}</h2>
                  <p className="text-sm font-light mt-2" >Recieve In-game money to use in-game</p>
                  <h3 className="text-xl font-bold p-2">{parseFloat((bundle.price * exchangeRate).toFixed(2))} {selectedCurrency.toUpperCase()}</h3>
                </div>
                <Button
                  className="w-[fit-content] bg-amber-700 hover:bg-amber-800 rounded-3xl text-white text-lg font-bold transition duration-300 transform hover:scale-105"
                  onClick={()=>{
                    const modal = document.getElementById(`${bundle.id}`);
                    if (modal) (modal as HTMLDialogElement).showModal();
                  }}
                >
                  <ShoppingCart /> Buy
                </Button>
              </div>
              <CartDialog id={`${bundle.id}`} name={bundle.name} image={bundle.image} desc={"Recieve In-game money to use in-game"} price={bundle.price} />
            </div>  
          ))
        }

    </div>
  )
}