import Image from "next/image";
import Link from "next/link";
import ZoeHereLogo from "@/public/ZoeHereLogo.svg";
import logoACF from "@/public/logoACF.png";
import html from "@/public/icons/html.svg";
import css from "@/public/icons/css.svg";
import js from "@/public/icons/js.svg";
import ts from "@/public/icons/ts.svg";
import nodeJS from "@/public/icons/nodejs.svg";
import git from "@/public/icons/git.svg";
import react from "@/public/icons/react.svg";
import nextJS from "@/public/icons/nextjs.svg";
import php from "@/public/icons/php.svg";
import python from "@/public/icons/python.svg";
import figma from "@/public/icons/figma.svg";
import canva from "@/public/icons/canva.svg";

const technologies = [
  { name: "HTML5", icon: html },
  { name: "CSS3", icon: css },
  { name: "JavaScript ES6+", icon: js },
  { name: "TypeScript", icon: ts },
  { name: "Node.js", icon: nodeJS },
  { name: "Git", icon: git },
  { name: "React", icon: react },
  { name: "Next.js", icon: nextJS },
  { name: "PHP", icon: php },
  { name: "Python", icon: python },
  { name: "Figma", icon: figma },
  { name: "Canva", icon: canva },
];

export default function OtherPage() {
  return <div className="flex flex-col gap-4 justify-between">
    <div className="flex justify-between">
      {technologies.map((technology) => (
        <div key={technology.name}>
          <Image src={technology.icon} height={50} alt={technology.name} />
        </div>
      ))}
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-lg mt-8 mb-4">Do you like this website? Feel free to
        <Link href="/contact" className="text-accent-500 hover:text-accent-600 ease-in-out duration-300"> get in touch </Link>
        if you&apos;d like a similar one for your business! And be sure to check out some of the other software development projects I&apos;ve worked on:</p>
    </div>
    <div className="flex flex-col md:flex-row gap-16 justify-evenly items-center">
      <div className='flex flex-col gap-2 md:gap-4 justify-center items-center my-0 md:my-8'>
        <Link href="https://app.zoehere.com/login" target="_blank" >
          <div className='flex flex-col gap-4 justify-center items-center'>
            <Image src={ZoeHereLogo} height={150} alt="ZoeHere app logo" quality={80} />
            <p className="text-lg text-center md:text-xl hover:text-accent-600 ease-in-out duration-300">Insurance AI Agents</p>
          </div>
        </Link>
      </div>
    </div>
  </div >
}
