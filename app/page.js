import Image from "next/image"
import Link from "next/link"
import dmp from "@/public/dmp.png"

export default function HomePage() {
  return (
    <div className="flex items-center justify-center gap-16">
      <Image src={dmp} fill placeholder="blur" className="object-cover blur-[3px] brightness-[0.45]" alt='Two people playing squash on the glass court' />
      <div className="z-10 flex flex-col items-center justify-center mt-40 md:mt-28">
        <h1 className="md:text-5xl text-3xl text-center text-primary-100 mb-8 tracking-light font-normal">
          Are you ready to start learning or get better?
        </h1>
        <Link href='/about' className="md:text-xl text-lg bg-accent-600 md:px-6 md:py-4 px-4 py-3 text-primary-950 font-semibold hover:bg-accent-500 ease-in-out duration-300">
          Let&apos;s go!
        </Link>
      </div>
    </div>
  )
}