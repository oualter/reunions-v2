'use client'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { sendEmail } from '../../lib/send-email'

export type FormData = {
  username: string
  usermail: string
  usermessage: string
}

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>()

  function onSubmit(data: FormData) {
    sendEmail(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // className="py-4 mt-4 flex flex-col gap-5 max-w-xl mx-auto"
      className="py-4 mt-4 flex flex-col gap-5 mx-auto"
    >
      <label htmlFor="username">Prénom et nom :</label>
      <input
        type="text"
        placeholder="Prénom et nom"
        id="username"
        {...register('username', { required: true })}
      />

      <label htmlFor="usermail">Email :</label>
      <input
        type="email"
        id="usermail"
        placeholder="tartempion@pétété.fr"
        {...register('usermail', { required: true })}
      />

      <label htmlFor="usermessage">Message :</label>
      <textarea
        placeholder="Entrez votre message ici. &Ccedil;a restera entre nous "
        className="h-32"
        id="usermessage"
        {...register('usermessage', { required: true })}
      />

      <button
        type="submit"
        className="hover:shadow-form bg-slate-700 p-3 text-white font-bold"
      >
        Envoyer
      </button>
    </form>
  )
}
export default Contact
