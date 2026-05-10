import React, { useState } from 'react'
import "./index.scss"
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const SendMeassage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')


  function handleSubmit(e) {
    e.preventDefault()

    const serviceId = "service_otauhlr"
    const templateId = "template_ydsk9iv"
    const publicKey = "xpRJrT1r-pIPmmBT7"

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "AMINA",
      message: message

    }

    emailjs.send(serviceId, templateId, templateParams, publicKey).then((response) => {
      setName('')
      setEmail('')
      setMessage('')
      toast.success('Mesaj göndərildi...')
    })
      .catch((error) => {
      })

  }
  return (
    <div className='send-message'>
      <div className="container">
        <form id="contactForm" onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              name="firstname"
              type="text"
              placeholder="Ad*"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              name="email"
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <textarea
              name="message"
              placeholder="Müraciətin mətni..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Mesajınızı göndərin</button>
        </form>

      </div>

    </div>
  )
}

export default SendMeassage
