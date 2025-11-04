'use client';

import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventIcon from '@mui/icons-material/Event';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/app/_components/AuthProvider";

const navLinks = [
  {
    name: "Home",
    href: "/members",
    icon: <HomeIcon className="text-primary-600" />,
  },
  {
    name: "Book a session",
    href: "/members/bookings",
    icon: <DateRangeIcon className="text-primary-600" />,
  },
  {
    name: "Your profile",
    href: "/members/profile",
    icon: <AccountCircleIcon className="text-primary-600" />,
  },
  {
    name: "Events",
    href: "/members/events",
    icon: <EventIcon className="text-primary-600" />,
  }
];

export default function SideNavigation() {
  const pathname = usePathname();
  const { signOut } = useAuthContext();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="border-r border-primary-700 h-full">
      <ul className="flex flex-col gap-2 text-md">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200"
              href={link.href}
            >
              {link.icon}
              <span className={`${pathname === link.href ? "text-accent-500 font-semibold" : ""}`}>{link.name}</span>
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={handleSignOut}
            className="w-full py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200"
          >
            <ExitToAppIcon className="text-primary-600" />
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}