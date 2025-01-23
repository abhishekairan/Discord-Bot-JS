"use client"

import Login from '@/components/login';
import React, { useEffect, useState } from 'react'

export default function CategoryLayout({children} :Readonly<{children: React.ReactNode}>) {
  const [hasSession, setHasSession] = useState(false); // Assume user is logged in initially
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    setLoading(true)
    async function checkSession() {
      const res = await fetch(window.location.href, { method: 'HEAD' });
      if (res.headers.get('x-no-session') === 'true') {
        setHasSession(false); // No session
      } else {
        setHasSession(true)
      }
    }
    checkSession();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {
        hasSession ? children : (
          <Login />
        )
      }
    </>
  )
}
