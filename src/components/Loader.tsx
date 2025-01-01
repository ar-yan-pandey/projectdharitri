'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const Loader = () => {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }

    handleRouteChange() // Initial load
  }, [pathname, searchParams]) // This will trigger whenever the route changes

  if (!loading) return null

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="animate-bounce">
        <Image
          src="/logo.png"
          alt="Dharitri Logo"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default Loader
