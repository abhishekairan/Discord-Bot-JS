"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useStore } from '@/store/store'
import { webLink, discordLink } from '@/mcinfo'

import CurrencyDropdown from '@/components/currencyDropdown'
import { ShoppingCart } from 'lucide-react'
import { usePathname } from 'next/navigation'


export default function Footer() {
  const pathname = usePathname()

  return (
    <>
      {pathname.startsWith("/store") && <LegalCard />}

      <footer className="footer bg-base-200/90 text-base-content p-10 grid-cols-2 grid-flow-row min-[440px]:grid-cols-4">
        <aside className="col-span-2 lg:col-span-1">
          <Image src={"/images/logo/logo.png"} alt="sn logo" width={64} height={64} />
          <p>
            Club Colony SMP
            <br />
            Providing the best experience
          </p>
        </aside>
        <nav>
          <h6 className="footer-title text-xl">Links</h6>
          <Link href={`/`} className="link link-hover">Home</Link>
          <Link href={`/rules`} className="link link-hover">Rules</Link>
          <Link href={`/store`} className="link link-hover">Store</Link>
          <Link href={`/discord`} className="link link-hover">Discord</Link>
        </nav>
        <nav>
          <h6 className="footer-title text-xl">Legal</h6>
          <Link href={`/store/terms`} className="link link-hover">Terms</Link>
          <Link href={`/store/privacy`} className="link link-hover">Privacy</Link>
          <Link href={`/store/faq`} className="link link-hover">Faq</Link>
          <Link href={`/discord`} className="link link-hover">Support</Link>
        </nav>

        <aside className="col-span-2 min-[440px]:col-span-3 lg:col-span-1">
          <h6 className="footer-title text-xl">Support our Server</h6>
          <p className="pb-4" >Support us in delivering higher quality content and gameplay enhancements to the SMP by purchasing ranks, crate keys, and other packages from our server store. Your contribution makes a difference!</p>
          <Link href={"/store"} className="btn btn-primary">
            <ShoppingCart height={24} width={24} />
            Visit Our Store
          </Link>
        </aside>
      </footer>

      <footer className="footer bg-base-200/80 text-base-content border-base-300 border-t px-10 py-4">
        <aside className="grid-flow-col items-center">
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>


        <nav className="md:place-self-center md:justify-self-end">
          <Link href={`/discord`} rel='noopener noreferrer' target="_blank">
            <Image src={"/images/logo/discord.svg"} alt="discord logo" width={24} height={24} />
          </Link>
        </nav>
      </footer>
    </>

    
  )
}



export function LegalCard() {
  const { setCurrency } = useStore();
  
  const handleCurrencyChange = async (currency: string) => {
    await setCurrency(currency);
  };

  return (
    <footer className="bg-gray-900/90 border-y border-y-white/30">
      <div className="mx-auto md:w-full lg:w-[56rem] xl:w-[70rem] text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="space-y-4 col-span-2">
              <h2 className="text-lg font-semibold mb-4">LEGAL NOTICE</h2>
              <p className="text-blue-400 text-sm leading-relaxed">
                The Club Colony SMP is in no way affiliated with Mojang Studios, nor should it be considered a company endorsed
                by Mojang Studios. Any contributions or purchases made on this store goes to the Club Colony SMP
              </p>
              <p className="text-blue-400 text-sm">
                For support or purchase history, please send us a ticket on the{" "}
                <Link href={discordLink} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200">
                Club Colony SMP Discord
                </Link>
              </p>
              <p className="text-gray-400 text-sm italic">Minecraft ® /TM. Mojang Studios / Notch © 2009-2025</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">PAYMENT METHODS WE ACCEPT</h2>
              <div className="flex flex-wrap gap-2">
                <Image src="/images/payment/gpay.svg" alt="Google Pay" height={32} width={48} />
                <Image src="/images/payment/paypal.svg" alt="PayPal" height={32} width={48} />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Server IP:</span>
                <span className="font-medium">PLAY.CLUBCOLONY.IN</span>
              </div>

              <CurrencyDropdown className="text-gray-400 hover:text-white flex gap-2 items-center"  onCurrencyChange={handleCurrencyChange} />

              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-gray-400">
                <Link href={`/store/faq`} className="hover:text-white">FAQ</Link>
                <Link href={`/discord`} className="hover:text-white">Support</Link>
                <Link href={`/store/terms`} className="hover:text-white">Terms</Link>
                <Link href={`/store/privacy`} className="hover:text-white">Privacy</Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
