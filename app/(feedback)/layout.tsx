'use client'
import Header from '@/components/ui/header'
import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

export default function StepsLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  useEffect(() => {
    AOS.init({
      once: true,
      //disable: 'phone',
      duration: 500,
      easing: 'ease-out-cubic',
    })
  })
  return (
    <>
      <Header/>

      <main className="grow bg-gray-50">
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-20 pb-12 md:pt-28 md:pb-20">

              {children}

            </div>
          </div>
        </section>
      </main>
    </>
  )
}
