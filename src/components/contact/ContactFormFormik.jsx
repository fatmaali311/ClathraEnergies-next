import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GButton from '../GButton'

// Helper: normalize colors so we can safely apply an alpha to hex colors
const isHexColor = (c) => typeof c === 'string' && /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(c)

const hexToRgb = (hex) => {
  if (!hex) return null
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((ch) => ch + ch).join('')
  if (h.length === 4) h = h.split('').slice(0, 3).map((ch) => ch + ch).join('')
  if (h.length === 8) h = h.slice(0, 6) // drop existing alpha if provided
  const bigint = parseInt(h, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return { r, g, b }
}

const withAlpha = (color, alpha = 0.8) => {
  if (!color) return color
  // If it's a CSS variable or rgb/hsl value, don't try to add hex alpha suffix
  if (typeof color === 'string' && (color.startsWith('var(') || color.startsWith('rgb') || color.startsWith('hsl'))) {
    return color
  }
  if (isHexColor(color)) {
    const rgb = hexToRgb(color)
    if (!rgb) return color
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
  }
  return color
}

const ContactSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required.'),
  company: Yup.string(),
  email: Yup.string().email('Email is invalid.').required('Email is required.'),
  interest: Yup.string().required('Please select an area of interest.'),
  represent: Yup.string().required('Please select who you represent.'),
  message: Yup.string().required('Message is required.'),
})

export default function ContactFormFormik({ formConfig = {}, colors = {} }) {
  // prefer camelCase mainColor, fallback to snake_case main_color for older payloads
  const baseColor = colors.mainColor || colors.main_color || 'var(--primary-green)'
  const secondaryColor = colors.secondaryColor || colors.secondary_color || '#afcbe5'

  const initialValues = {
    fullName: '',
    company: '',
    email: '',
    interest: '',
    represent: '',
    message: '',
  }

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Send to API endpoint using the backend's expected property names (camelCase)
      const payload = {
        fullName: values.fullName,
        organization: values.company,
        email: values.email,
        areaOfInterest: values.interest,
        representation: values.represent,
        message: values.message,
      }

      const res = await fetch((process.env.API_BASE_URL || 'http://localhost:3000') + '/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        // try to read JSON body for error details
        let errBody = null
        try { errBody = await res.json() } catch (e) { /* ignore */ }
        console.error('Contact submit failed', res.status, errBody)
        const msg = errBody?.message || (errBody && JSON.stringify(errBody)) || `Request failed with status ${res.status}`
        toast.error(msg)
        return
      }

      toast.success('Your message has been sent successfully!')
      resetForm()
    } catch (err) {
      console.error(err)
      toast.error('Failed to send message. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  // resolve a background color with alpha when source is a hex color, but keep CSS variables untouched
  const bg = withAlpha(baseColor, 0.8)
  const borderColor = baseColor

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={ContactSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="p-5 md:p-8 bg-white shadow-[8px_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 w-full" style={{ border: `2px solid ${borderColor}` }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-3">
              <div className="flex flex-col">
                <label htmlFor="fullName" className="text-gray-500 font-medium text-lg mb-2">{formConfig.full_name_title || 'Full Name'}</label>
                <Field name="fullName" className="w-full px-4 py-2.5 md:py-4.5 rounded-md focus:outline-none" style={{ background: bg, color: 'white', border: `1px solid ${borderColor}` }} placeholder="Full Name" />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex flex-col">
                <label htmlFor="company" className="text-gray-500 font-medium text-lg mb-2">{formConfig.organization_title || 'Organization / Company'}</label>
                <Field name="company" className="w-full px-4 py-2.5 md:py-4.5 rounded-md focus:outline-none" style={{ background: bg, color: 'white', border: `1px solid ${borderColor}` }} placeholder="Organization / Company" />
              </div>
            </div>

            <div className="mt-3 md:mt-5 flex flex-col">
              <label htmlFor="email" className="text-gray-500 font-medium text-lg mb-2">{formConfig.email_title || 'Email Address'}</label>
              <Field name="email" type="email" className="w-full px-4 py-2.5 md:py-4.5 rounded-md focus:outline-none" style={{ background: bg, color: 'white', border: `1px solid ${borderColor}` }} placeholder="Email Address" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mt-3 md:mt-5 flex flex-col relative">
              <label htmlFor="interest" className="text-gray-500 font-medium text-lg mb-2">{formConfig.area_of_interest?.field_title || 'Area of Interest'}</label>
              <Field as="select" name="interest" className="w-full px-4 py-2.5 md:py-4.5 rounded-md focus:outline-none appearance-none" style={{ background: bg, color: 'white', border: `1px solid ${borderColor}` }}>
                <option value="">Select Area of Interest</option>
                {(formConfig.area_of_interest?.field_menu_points || []).map((p, i) => (
                  <option key={i} value={p.value}>{p.value}</option>
                ))}
              </Field>
              <div className="absolute right-4 top-2/3 -translate-y-1/2 pointer-events-none text-white text-3xl">▾</div>
              <ErrorMessage name="interest" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mt-3 md:mt-5 flex flex-col relative">
              <label htmlFor="represent" className="text-gray-500 font-medium text-lg mb-2">{formConfig.i_represent_field?.field_title || 'I Represent'}</label>
              <Field as="select" name="represent" className="w-full px-4 py-2.5 md:py-4.5 rounded-md focus:outline-none appearance-none" style={{ background: bg, color: 'white', border: `1px solid ${borderColor}` }}>
                <option value="">Select Representation</option>
                {(formConfig.i_represent_field?.field_menu_points || []).map((p, i) => (
                  <option key={i} value={p.value}>{p.value}</option>
                ))}
              </Field>
              <div className="absolute right-4 top-2/3 -translate-y-1/2 pointer-events-none text-white text-3xl">▾</div>
              <ErrorMessage name="represent" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mt-3 md:mt-5 flex flex-col">
              <label htmlFor="message" className="text-gray-500 font-medium text-lg mb-2">{formConfig.message_title || 'Message'}</label>
              <Field as="textarea" name="message" rows="5" className="w-full px-4 py-2.5 md:py-4.5 rounded-md focus:outline-none" style={{ background: bg, color: 'white', border: `1px solid ${borderColor}` }} placeholder="Message" />
              <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mt-5 md:mt-6 w-full">
              <GButton type="submit" className="w-full" bgColor={`linear-gradient(to bottom, ${baseColor}, ${secondaryColor})`}>
                {formConfig.submit_button_title || 'Send Inquiry'}
              </GButton>
            </div>
          </Form>
        )}
      </Formik>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}
