import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logoGif from "../../../public/images/logo/logo.gif"

export default function Store() {
  return (
    <section className="text-white py-6 md:px-8 sm:px-4 lg:px-2">
      <div className="mb-8 w-full flex items-center justify-center">
        <Image src={logoGif} alt="Club Colony Gif" className="h-28 w-auto" unoptimized />
      </div>

      <h1 className="text-4xl mb-8">Club Colony Store</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <div className="rounded-lg h-full animate-glow">
          <h3 className="font-bold text-lg text-center w-full bg-orange-600 rounded-t-lg py-2" >10% off</h3>
          <Link href={"/store/category/ranks"}>
            <div className="homepage-card">
              <Image
                src={"/images/rank/rankcard.png"}
                alt="Rank Card"
                width={120}
                height={120}
                className="h-[7.5rem] w-auto"
              />
              <h2 className="text-2xl">Ranks</h2>
            </div>
          </Link>
        </div>  

        <div className="rounded-lg h-full ">
          {/* <h3 className="font-bold text-lg text-center w-full bg-orange-600 rounded-t-lg py-2" >10% off</h3> */}
          <Link href={"/store/category/keys"} >
            <div className="homepage-card h-full">
              <Image
                src={"/images/cardImg/cratekey.png"}
                alt="Crate Key Image"
                width={120}
                height={120}
                className="h-[7.5rem] w-auto"
              />
              <h2 className="text-2xl">Keys</h2>
            </div>
          </Link>
        </div>
        
        <div className="rounded-lg h-full ">
          {/* <h3 className="font-bold text-lg text-center w-full bg-orange-600 rounded-t-lg py-2" >10% off</h3> */}
          <Link href={"/store/category/money"}>
            <div className="homepage-card h-full">
              <Image
                src={"/images/cardImg/chest.png"}
                alt="Chest Image"
                width={120}
                height={120}
                className="h-[7.5rem] w-auto"
              />
              <h2 className="text-2xl">Money</h2>
            </div>
          </Link>
        </div>
        
        <div className="rounded-lg h-full ">
          {/* <h3 className="font-bold text-lg text-center w-full bg-orange-600 rounded-t-lg py-2" >10% off</h3> */}
          <Link href={"/store/category/coins"}>
            <div className="homepage-card h-full">
              <Image
                src={"/images/cardImg/coin.png"}
                alt="Earth Image"
                width={120}
                height={120}
                className="h-[7.5rem] w-auto"
              />
              <h2 className="text-2xl">Club Coins</h2>
            </div>
          </Link>
        </div>
        
        <div className="rounded-lg h-full">
          {/* <h3 className="font-bold text-lg text-center w-full bg-orange-600 rounded-t-lg py-2" >10% off</h3> */}
          <Link href={"/store/category/bundles"}>
            <div className="homepage-card h-full">
              <Image
                src={"/images/cardImg/bundles.png"}
                alt="Earth Image"
                width={120}
                height={120}
                className="h-[7.5rem] w-auto"
              />
              <h2 className="text-2xl">Bundles</h2>
            </div>
          </Link>
        </div>

      </div>
    </section>
  )
}
