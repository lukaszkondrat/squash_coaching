'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function LoadingBar() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsLoading(false)
    setProgress(0)
  }, [pathname, searchParams])

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
      setProgress(0)

      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + Math.random() * 15
        })
      }, 100)
    }

    const handleBeforeUnload = () => {
      handleStart()
    }

    const handleLinkClick = (e) => {
      const target = e.target.closest('a')
      if (target && target.href && !target.href.startsWith('javascript:') && !target.href.startsWith('#')) {
        const currentOrigin = window.location.origin
        const targetOrigin = new URL(target.href).origin

        if (targetOrigin === currentOrigin) {
          const currentPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
          const targetPath = new URL(target.href).pathname + new URL(target.href).search

          if (currentPath !== targetPath) {
            handleStart()
          }
        }
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('click', handleLinkClick)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [pathname, searchParams])

  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className="h-1 bg-gradient-to-r from-primary-500 to-primary-300 transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(198, 153, 99, 0.5)'
        }}
      />
    </div>
  )
} 