'use client'

import Logo from "@/app/_components/Logo"
import Navigation from "@/app/_components/Navigation"
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className='border-b border-primary-700 md:px-8 px-4 py-5'>
      <div className='flex flex-col md:flex-row md:justify-between justify-center items-center max-w-7xl mx-auto'>
        <span className="mb-4 md:mb-0 flex"><Logo /></span>
        {pathname !== '/login' && pathname !== '/reset-password' && pathname !== '/update-password' && <Navigation />}
      </div>
    </header>
  )
}