import Link from "next/link"
import PriceItem from "@/app/_components/PriceItem"
import PriceItemMonthly from "@/app/_components/PriceItemMonthly"
import { Card, Stack } from "@mui/material"
import { ACCENT_600, ACCENT_300 } from "@/app/constants"

export default function PaymentOptionCard({ option }) {
  return <Link href="/contact" className="hover:scale-105 transition-all duration-300">
    <Card sx={{
      p: { xs: 2, sm: 3 },
      backgroundColor: '#E1E8EF',
      border: `2px solid ${ACCENT_600}`,
      width: '22rem',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        backgroundColor: '#D1D8DF',
        transition: 'background-color 0.3s ease'
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        bottom: '25px',
        left: '-20px',
        right: '-20px',
        height: '140px',
        backgroundColor: ACCENT_300,
        transform: 'skewY(-3deg)',
        zIndex: 0,
        borderRadius: '8px'
      }
    }}>
      <Stack sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
        <h2 className="text-4xl font-semibold text-center my-6 uppercase">{option.title}</h2>
        <div className="flex flex-col gap-4 justify-center items-center flex-grow">
          {option?.price_group
            ?
            <>
              <PriceItem title="1 person" price={option.price_single} currency={option.currency} />
              <PriceItem title="2-3 people" price={option.price_group} currency={option.currency} />
            </>
            :
            <>
              <PriceItemMonthly title="/month" price={option.price_single} currency={option.currency} />
              <PriceItemMonthly title="/each next session" price={'+' +option.price_single / 5} currency={option.currency} />
            </>
          }
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-center text-lg font-medium mt-8 uppercase">Details</p>
          {option.description.map((item, index) => <p className="text-center text-lg font-light" key={index}>{item}</p>)}
        </div>
      </Stack>
    </Card>
  </Link>
}