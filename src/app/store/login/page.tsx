"use client"

import Login from '@/components/login'
import { useStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function page() {
  const { user } = useStore()
  const router = useRouter()

  if (user) {
    router.replace("/store")
  }

  return <Login />
}
