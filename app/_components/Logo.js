import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href='/' className="flex items-center gap-4 z-10 ">
      <Image src="/logo.png" className="rounded-full brightness-[0.9]" width={80} height={80} alt="Lukasz Kondratowicz Elite Squash Coaching logo" />
    </Link>
  )
}