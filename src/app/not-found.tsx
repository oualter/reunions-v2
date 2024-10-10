import Link from 'next/link'
export default function notFound() {
  return (
    <div className="space-y-5 text-center h-[220px] flex flex-col justify-center">
      <h1 className="text-3xl font-bold">Le gingko biloba pas</h1>
      <p>La page demandée n&apos;existe pas</p>
      <p>
        <Link className="sm:text-base hover:font-bold" href="/">
          Retournez à l&apos;accueil
        </Link>
      </p>
    </div>
  )
}
