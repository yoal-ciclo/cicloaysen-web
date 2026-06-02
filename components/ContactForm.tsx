'use client'

import { useState, FormEvent } from 'react'

type FormState = 'idle' | 'sending' | 'success' | 'error'

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePhone(phone: string) {
  return phone === '' || /^[\d\s+\-().]{7,20}$/.test(phone)
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'El nombre es requerido'
    if (!form.email.trim()) e.email = 'El correo es requerido'
    else if (!validateEmail(form.email)) e.email = 'Correo inválido'
    if (!validatePhone(form.phone)) e.phone = 'Teléfono inválido'
    if (!form.message.trim()) e.message = 'El mensaje es requerido'
    return e
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validation = validate()
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    setState('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/ydiaz@cicloaysen.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Nombre: form.name,
          Email: form.email,
          Teléfono: form.phone || 'No indicado',
          Empresa: form.company || 'No indicada',
          Mensaje: form.message,
          _subject: `Contacto web — ${form.name}`,
          _captcha: 'false',
        }),
      })
      const data = await res.json()
      if (data.success === 'true' || data.success === true) {
        setState('success')
        setForm({ name: '', email: '', phone: '', company: '', message: '' })
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-semibold text-dark mb-2">¡Mensaje enviado!</h3>
        <p className="text-gray-600 text-sm mb-5">
          Gracias por contactarnos. Te responderemos en menos de 48 horas hábiles.
        </p>
        <button
          onClick={() => setState('idle')}
          className="text-primary font-medium text-sm hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-dark mb-1.5" htmlFor="name">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Tu nombre completo"
          className={`w-full border rounded-lg px-4 py-3 text-dark placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
            errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary'
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-dark mb-1.5" htmlFor="email">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tu@empresa.com"
          className={`w-full border rounded-lg px-4 py-3 text-dark placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
            errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary'
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Teléfono + Empresa (fila) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-dark mb-1.5" htmlFor="phone">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+56 9 XXXX XXXX"
            className={`w-full border rounded-lg px-4 py-3 text-dark placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
              errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1.5" htmlFor="company">
            Empresa u organización
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            placeholder="Nombre de tu empresa"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-dark placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label className="block text-sm font-medium text-dark mb-1.5" htmlFor="message">
          Mensaje <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Cuéntanos sobre tu proyecto o consulta ambiental..."
          className={`w-full border rounded-lg px-4 py-3 text-dark placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors resize-none ${
            errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary'
          }`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      {state === 'error' && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          Hubo un error al enviar el mensaje. Por favor intenta nuevamente o escríbenos directamente a ydiaz@cicloaysen.com
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {state === 'sending' ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Enviando…
          </>
        ) : (
          'Enviar mensaje'
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Tu información es confidencial y nunca será compartida con terceros.
      </p>
    </form>
  )
}
