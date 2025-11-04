import Link from "next/link";

export default function LinkButton({ href, children }) {
  return <Link href={href} className="inline-block md:text-lg text-base bg-accent-600 md:px-5 px-4 md:py-3 py-2 text-primary-950 font-semibold hover:bg-accent-500 ease-in-out duration-300">
    {children}
  </Link>
}