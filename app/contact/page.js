import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from 'next/link';
import LinkButton from '@/app/_components/LinkButton';
import Image from 'next/image';
import qr from '@/public/qr.jpg';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const contactInfo = [
  {
    icon: <MailOutlineIcon />,
    value: 'singaporesquashcoach@gmail.com',
    link: 'mailto:singaporesquashcoach@gmail.com'
  },
  {
    icon: <WhatsAppIcon />,
    value: '+65 8095 3490',
    link: 'https://wa.me/6580953490'
  }
]

const benefits = [
  "Enjoy discounts on all the sessions",
  "Find a free slot and book your session online",
  "Learn about upcoming events in advance",
];

export default function ContactPage() {
  return <div className="flex flex-col gap-4">
    <h1 className="md:text-4xl text-3xl text-accent-600 md:mb-4 mb-0 font-medium">
      Get in touch
    </h1>
    <div className="flex md:flex-row flex-col md:gap-16 gap-8 justify-center md:items-start items-center md:mt-8 mt-4">
      <div className="flex flex-col gap-6 justify-center md:items-end items-center">
        {contactInfo.map((item, index) => (
          <Link href={item.link} key={index} target="_blank" className='hover:text-accent-600'>
            <div key={index} className="flex items-center justify-center gap-2">
              {item.icon}
              <p className="md:text-xl text-lg">{item.value}</p>
            </div>
          </Link>
        ))}
        <div className="flex justify-center items-center">
          <Image src={qr} placeholder="blur" width={120} height={120} alt="qr code to WhatsApp" />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 md:border-l-4 border-t-4 md:border-t-0 border-accent-600 md:pl-16 pl-0 md:pt-0 pt-8">
        <p className="text-xl uppercase font-semibold mb-2">Benefits of getting a monthly pass</p>
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckCircleOutlineIcon className="text-accent-600" />
            <p className="md:text-xl text-lg">{benefit}</p>
          </div>
        ))}
        <div className='flex mt-4 md:mt-0 justify-center md:justify-start'>
          <LinkButton href='/members'>
            Get a monthly pass!
          </LinkButton>
        </div>
      </div>
    </div>
  </div>
}