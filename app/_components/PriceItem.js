export default function PriceItem({ title, price, currency }) {
  return <div className="flex justify-evenly gap-2 items-center">
    <p className="text-xl font-light text-center">{title}</p>
    <p className="text-4xl text-accent-600 font-medium">{price}</p>
    <p className="text-xl text-accent-600 font-bold ">{currency}</p>
  </div>
}