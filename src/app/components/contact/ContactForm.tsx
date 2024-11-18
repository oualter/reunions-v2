'use client'
import { useState, useEffect } from 'react'

async function sendContactData(contactDetails) {
  //   console.log('sendcontatdata arg => ', contactDetails)
  const apiEndpoint = `api/contact`
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  // console.log('contactForm data => ', data)

  if (!response.ok) {
    // console.log('!reponse.ok')
    throw new Error(data.message || 'Something went wrong!')
  }
}

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredName, setEnteredName] = useState('')
  const [enteredMessage, setEnteredMessage] = useState('')
  const [requestStatus, setRequestStatus] = useState('') // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState('')

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null)
        setRequestError(null)
      }, 7000)

      return () => clearTimeout(timer)
    }
  }, [requestStatus])

  async function sendMessageHandler(event) {
    event.preventDefault()

    // optional: add client-side validation

    // console.log('!!!!!!!!!!!!!!!sendMessageHandler')
    setRequestStatus('pending')

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      })
      setRequestStatus('success')
      setEnteredMessage('')
      setEnteredEmail('')
      setEnteredName('')
    } catch (error) {
      setRequestError(error.message)
      setRequestStatus('error')
    }
  }

  /*let notification

 if (requestStatus === 'pending') {
   notification = {
     status: 'pending',
     title: 'Sending message...',
     message: 'Your message is on its way!',
   }
 }

 if (requestStatus === 'success') {
   notification = {
     status: 'success',
     title: 'Success!',
     message: 'Message sent successfully!',
   }
 }

 if (requestStatus === 'error') {
   notification = {
     status: 'error',
     title: 'Error!',
     message: requestError,
   }
 }*/

  return (
    <form
      className="py-4 mt-4 flex flex-col gap-5"
      onSubmit={sendMessageHandler}
    >
      <div>
        <label htmlFor="usermail">Email</label>
        <input
          type="email"
          id="usermail"
          name="usermail"
          placeholder="Email"
          aria-required
          required
          // pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
          // title="Entrez une adresse mail valide svp"
          value={enteredEmail}
          onChange={(event) => setEnteredEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Prénom et nom</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Prénom et nom"
          aria-required
          required
          value={enteredName}
          onChange={(event) => setEnteredName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="usermessage">Message</label>
        <textarea
          id="usermessage"
          name="usermessage"
          placeholder="Tapez votre message ici"
          rows={5}
          // minlength={5}
          aria-required
          required
          value={enteredMessage}
          onChange={(event) => setEnteredMessage(event.target.value)}
        ></textarea>
      </div>

      <div>
        <button>
          Envoyer
        </button>
      </div>

      {requestStatus === 'success' && <div>Message envoyé</div>}
    </form>
  )
}
