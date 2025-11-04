import PaymentOptionCard from "@/app/_components/PaymentOptionCard"

const options = [
  {
    title: "1 session",
    price_single: 120,
    price_group: 150,
    currency: "SGD",
    description: ["One 60-minute session with the coach", 'Regular price per session (120 SGD/session)', 'Use it anytime']
  },
  {
    title: "Bundle",
    price_single: 1080,
    price_group: 1350,
    currency: "SGD",
    description: ["10 sessions (60min) with the coach", "-10% discount included (108 SGD/session)", 'Use it within 90 days from buying'],
  },
  {
    title: 'Monthly pass',
    price_single: 500,
    currency: "SGD",
    description: ["5 sessions (60min) included in the pass", '-17% discount included (100 SGD/session)', 'Use it within 30 days from buying'],
  }
]

export default function PricePage() {
  return <div className="flex flex-col gap-4">
    <h1 className="md:text-4xl text-3xl text-accent-600 md:mb-4 mb-0 font-medium">
      Discover the pricing options
    </h1>
    <div className="flex justify-center items-center lg:flex-row flex-col gap-12">
      {options.map((option) => <PaymentOptionCard key={option.title} option={option} />)}
    </div>
  </div>
}