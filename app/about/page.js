import Image from "next/image"
import Link from "next/link"
import LinkButton from "@/app/_components/LinkButton"
import lukasz from "@/public/headshot.jpg"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const paragraphs = [
  "15+ years of squash coaching experience with people of all ages, skill levels and abilities",
  "Singapore National Squash Team Coach",
  "WSF Level 2 Certified Coach",
  "Ex-Polish National Squash Team member",
  "3x Polish National Squash Team Champion",
  "Creator of many successful coaching programmes, events and various other squash initiatives both in Poland & the UK."
]

const sessionsInfo = [
  "Private and group sessions are available for all ages and skill levels",
  "All sessions are tailored to the player's level, their individual needs and expectations (matches, drills, technical, tactical, etc.) ",
  "Each session is 60-minutes long, starts on the hour and has to end on the hour (example: 10:00 - 11:00)",
  "If 60 minutes session is not long enough, the next available session length is 120 minutes (example: 10:00 - 12:00)",
  "The court booking is done by the coach but the court booking fee will be covered by the participant",
  {
    text: "Sessions can be booked online if you have a monthly pass (see: ",
    link: { href: '/price', text: 'Price' },
    textAfter: ")"
  },
  "The coach will provide squash balls for the session but the participant is responsible for bringing his own racket and other equipment (rackets can be rented at the venue)",
]

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex md:flex-row flex-col-reverse gap-8 md:gap-16">
        <div className="md:space-y-8 space-y-4">
          <h1 className="md:text-4xl text-3xl text-accent-600 mb-4 font-medium">
            Meet the coach
          </h1>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="md:text-xl text-lg flex items-start ">
              <span className="mr-2 mt-[-3px]"><CheckCircleOutlineIcon className="text-accent-600" /></span>
              <span>{paragraph}</span>
            </p>
          ))}
          <div className="text-right mt-8">
            <LinkButton href='/contact'>
              Book a session with Lukasz
            </LinkButton>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src={lukasz}
            height={700}
            alt="A picture of Lukasz Kondratowicz, a squash coach in Singapore"
            placeholder="blur"
            quality={80}
          />
        </div>
      </div>
      <div className="md:space-y-8 space-y-4">
        <h1 className="md:text-4xl text-3xl text-accent-600 mb-4 mt-8 font-medium">
          About the sessions
        </h1>
        {sessionsInfo.map((info, index) => (
          <p key={index} className="md:text-xl text-lg flex items-start ">
            <span className="mr-2 mt-[-3px]"><CheckCircleOutlineIcon className="text-accent-600" /></span>
            <span>
              {typeof info === 'string' ? info : (
                <>
                  {info.text}
                  <Link href="/price" className="text-accent-500 hover:text-accent-600 ease-in-out duration-300">
                    {info.link.text}
                  </Link>
                  {info.textAfter}
                </>
              )}
            </span>
          </p>
        ))}
      </div>
    </div>
  )
}