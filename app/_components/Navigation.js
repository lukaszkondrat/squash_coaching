'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthContext } from "@/app/_components/AuthProvider"
import PersonIcon from '@mui/icons-material/Person'

const links = [
  {
    href: "/about",
    label: "About"
  },
  {
    href: "/price",
    label: "Price"
  },
  {
    href: "/webdev",
    label: "WebDev"
  },
  {
    href: "/contact",
    label: "Contact"
  },
  {
    href: '/members',
    label: 'Login'
  }
]

export default function Navigation() {
  const { member } = useAuthContext()
  const pathname = usePathname()

  return (
    <nav className="z-10 md:text-2xl text-lg">
      <ul className="flex md:gap-16 gap-4 items-center">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={`hover:text-accent-500 transition-colors ${pathname.startsWith(link.href) ? "text-accent-500 font-semibold" : ""}`}>
              {link.href === '/members' && member
                ? <span className="flex items-center gap-2"><PersonIcon className="w-8 h-8" />{(member.fullName || '').split(' ')[0] || 'Profile'}</span>
                : link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}