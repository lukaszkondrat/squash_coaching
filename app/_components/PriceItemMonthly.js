export default function PriceItemMonthly({ title, price, currency }) {
  return <div className="flex justify-center gap-2 items-center">
    <p className="text-4xl text-accent-600 font-medium">{price}</p>
    <p className="text-xl text-accent-600 font-bold">{currency}</p>
    <p className="text-xl font-light text-center">{title}</p>
  </div>
}