'use client'

// import { Button } from 'react-bootstrap'

interface ErrorPageProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <article className="sm:min-h-[500px] min-h-80 flex flex-col justify-around text-center mx-auto my-6 px-2 lg:px-0">
      <h1>Error 😵</h1>
      <p>Le gingko biloba pas</p>
      {/* <Button onClick={reset}>Try again</Button> */}
    </article>
  )
}
