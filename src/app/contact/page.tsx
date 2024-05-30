import Contact from './../components/ContactForm'
export const metadata = {
  title: 'Contact',
}
export default function contact() {
  return (
    // <article className="generic-content lg:max-w-[700px] min-h-screen mx-auto my-6">
    <article className="generic-content lg:max-w-[600px] h-full mx-auto my-6 px-2 lg:px-0">
      <h1 className="text-3xl lg:text-5xl mb-4">Contact</h1>
      <Contact />
    </article>
  )
}
