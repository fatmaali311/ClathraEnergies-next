'use client';

import React, { useState } from 'react'
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

import { getLocalizedValue } from '../../utils/localizationUtils'

export default function ContactFormFormik({ formConfig = {}, colors = {}, dict = {}, lang = 'en' }) {
  // prefer camelCase mainColor, fallback to snake_case main_color for older payloads
  const baseColor = colors.mainColor || colors.main_color || 'var(--primary-green)'
  const secondaryColor = colors.secondaryColor || colors.secondary_color || '#afcbe5'

  const v = dict?.validation || {}

  const ContactSchema = Yup.object().shape({
    fullName: Yup.string().required(v.fullNameRequired || dict?.validation?.fullNameRequired || 'Full Name is required.'),
    company: Yup.string(),
    email: Yup.string().email(v.invalidEmail || dict?.validation?.invalidEmail || 'Email is invalid.').required(v.emailRequired || dict?.validation?.emailRequired || 'Email is required.'),
    interest: Yup.string().required(v.interestRequired || dict?.validation?.interestRequired || 'Please select an area of interest.'),
    represent: Yup.string().required(v.representRequired || dict?.validation?.representRequired || 'Please select who you represent.'),
    message: Yup.string().required(v.messageRequired || dict?.validation?.messageRequired || 'Message is required.'),
  })

  const initialValues = {
    fullName: '',
    company: '',
    email: '',
    interest: '',
    represent: '',
    message: '',
  }

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:3000'
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

      const res = await fetch(`${API_BASE}/contact-us`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        toast.success(dict?.common?.sentSuccessfully || 'Your message has been sent successfully!')
        resetForm()
      } else {
        const err = await res.json().catch(() => null)
        console.error('Contact submit failed', res.status, err)

        let errorMsg = `Submission failed: ${res.status}`
        if (err?.message) {
          if (Array.isArray(err.message)) {
            errorMsg = err.message.join(' | ')
          } else {
            errorMsg = err.message
          }
        }
        toast.error(errorMsg)
      }
    } catch (err) {
      console.error(err)
      toast.error(dict?.common?.errorSending || 'Failed to send message. Please try again later.')
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
                <label htmlFor="fullName" className="text-gray-500 font-medium text-lg mb-2">{getLocalizedValue(formConfig.full_name_title, lang) || dict?.common?.fullName || 'Full Name'}</label>
                <Field name="fullName" className="w-full px-4 py-2.5 md:py-4.5 rounded-md focus:outline-none" style={{ background: bg, color: 'white', border: `1px solid ${borderColor}` }} placeholder={getLocalizedValue(formConfig.full_name_title, lang) || dict?.common?.fullName || 'Full Name'} />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex flex-col">
                <label htmlFor="company" className="text-gray-500 font-medium text-lg mb-2">{getLocalizedValue(formConfig.organization_title, lang) || dict?.common?.organization || 'Organization / Company'}</label>
                <Field name="company" className="w-full px-4 py-2.5 md:py-4.5 rounded-md focus:outline-none" style={{ background: bg, color: 'white', border: `1px solid ${borderColor}` }} placeholder={getLocalizedValue(formConfig.organization_title, lang) || dict?.common?.organization || 'Organization / Company'} />
              </div>
            </div>

            <div className="mt-3 md:mt-5 flex flex-col">
              <label htmlFor="email" className="text-gray-500 font-medium text-lg mb-2">{getLocalizedValue(formConfig.email_title, lang) || dict?.common?.emailAddress || 'Email Address'}</label>
              <Field name="email" type="email" className="w-full px-4 py-2.5 md:py-4.5 rounded-md focus:outline-none" style={{ background: bg, color: 'white', border: `1px solid ${borderColor}` }} placeholder={dict?.common?.emailPlaceholder || 'Email Address'} />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mt-3 md:mt-5 flex flex-col relative">
              <label htmlFor="interest" className="text-gray-500 font-medium text-lg mb-2">{getLocalizedValue(formConfig.area_of_interest?.field_title, lang) || dict?.common?.areaOfInterest || 'Area of Interest'}</label>
              <Field as="select" name="interest" className="w-full px-4 py-2.5 md:py-4.5 rounded-md focus:outline-none appearance-none" style={{ background: bg, color: 'white', border: `1px solid ${borderColor}` }}>
                <option value="">{dict?.common?.select || 'Select Area of Interest'}</option>
                {(formConfig.area_of_interest?.field_menu_points || []).map((p, i) => (
                  <option key={i} value={getLocalizedValue(p.value, lang)}>{getLocalizedValue(p.value, lang)}</option>
                ))}
              </Field>
              <div className="absolute right-4 top-2/3 -translate-y-1/2 pointer-events-none text-white text-3xl">▾</div>
              <ErrorMessage name="interest" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mt-3 md:mt-5 flex flex-col relative">
              <label htmlFor="represent" className="text-gray-500 font-medium text-lg mb-2">{getLocalizedValue(formConfig.i_represent_field?.field_title, lang) || dict?.common?.iRepresent || 'I Represent'}</label>
              <Field as="select" name="represent" className="w-full px-4 py-2.5 md:py-4.5 rounded-md focus:outline-none appearance-none" style={{ background: bg, color: 'white', border: `1px solid ${borderColor}` }}>
                <option value="">{dict?.common?.select || 'Select Representation'}</option>
                {(formConfig.i_represent_field?.field_menu_points || []).map((p, i) => (
                  <option key={i} value={getLocalizedValue(p.value, lang)}>{getLocalizedValue(p.value, lang)}</option>
                ))}
              </Field>
              <div className="absolute right-4 top-2/3 -translate-y-1/2 pointer-events-none text-white text-3xl">▾</div>
              <ErrorMessage name="represent" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mt-3 md:mt-5 flex flex-col">
              <label htmlFor="message" className="text-gray-500 font-medium text-lg mb-2">{getLocalizedValue(formConfig.message_title, lang) || dict?.common?.message || 'Message'}</label>
              <Field as="textarea" name="message" rows="5" className="w-full px-4 py-2.5 md:py-4.5 rounded-md focus:outline-none" style={{ background: bg, color: 'white', border: `1px solid ${borderColor}` }} placeholder={getLocalizedValue(formConfig.message_title, lang) || dict?.common?.message || 'Message'} />
              <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mt-5 md:mt-6 w-full">
              <GButton type="submit" className="w-full" bgColor={`linear-gradient(to bottom, ${baseColor}, ${secondaryColor})`}>
                {getLocalizedValue(formConfig.submit_button_title, lang) || dict?.common?.submit || 'Send Inquiry'}
              </GButton>
            </div>
          </Form>
        )}
      </Formik>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}
