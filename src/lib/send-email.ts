import { FormData } from '../app/components/ContactForm'

export async function sendEmail(data: FormData) {
  // console.log(data)

  const apiEndpoint = `api/email/`

  const sendMailRes = fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      // console.log('sendMail function res => ',response)
      alert('Le message a été envoyé')
      return response.message
      // return 'Message bien envoyé !'
    })
    .catch((err) => {
      alert(err)
    })
}
