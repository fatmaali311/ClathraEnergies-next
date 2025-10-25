import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css' 
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import BorderLines from '../common/BorderLines'

const MAX_FILE_SIZE = 4 * 1024 * 1024 // 4 MB for CV and cover letter
const MAX_OTHER_FILE_SIZE = 8 * 1024 * 1024 // 8 MB for other files
  const primaryTextColor = 'text-gray-900'

const fileSections = [
  { key: 'cv', label: 'CV', required: true, accept: '.pdf,.doc,.docx,.txt' },
  { key: 'coverLetter', label: 'Cover letter', required: true, accept: '.pdf,.doc,.docx,.txt' },
  { key: 'employmentRef', label: 'Employment reference', required: false, accept: '.pdf,.doc,.docx,.jpg,.png' },
  { key: 'certificate', label: 'Certificate', required: false, accept: '.pdf,.doc,.docx,.jpg,.png' },
  { key: 'other', label: 'Other', required: false, accept: '*' },
]

function prettySize(bytes) {
  if (!bytes) return '0 B'
  const kb = bytes / 1024
  if (kb < 1024) return `${Math.round(kb)} KB`
  return `${(kb / 1024).toFixed(2)} MB`
}

export default function ApplicationForm({ formConfig = {}, positions = [], colors = {} }) {
  const [pageFormConfig, setPageFormConfig] = useState(formConfig?.pageObj?.application || {})
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    availableFrom: '',
    location: '',
    expectedSalary: '',
    positionId: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cv: '',
    coverLetter: '',
    availableFrom: '',
    location: '',
  })

  const [files, setFiles] = useState({ cv: null, coverLetter: null, employmentRef: null, certificate: null, other: null })
  const [dragging, setDragging] = useState({ cv: false, coverLetter: false, employmentRef: false, certificate: false, other: false })
  const inputRefs = useRef({ cv: null, coverLetter: null, employmentRef: null, certificate: null, other: null })
  const router = useRouter()

  useEffect(() => {
    if (router?.query?.positionId) {
      setForm((s) => ({ ...s, positionId: router.query.positionId }))
    }
  }, [router?.query?.positionId])

  useEffect(() => {
    if (typeof window !== 'undefined' && !form.positionId) {
      const params = new URLSearchParams(window.location.search)
      const pid = params.get('positionId')
      if (pid) setForm((s) => ({ ...s, positionId: pid }))
    }
  }, [])

  useEffect(() => {
    if (Object.keys(pageFormConfig).length === 0) {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:3000'
      fetch(`${API_BASE}/pages/careers`).then((r) => r.json()).then((json) => {
        if (json?.pageObj) {
          if (json.pageObj.application) setPageFormConfig(json.pageObj.application)
        }
      }).catch(() => {})
    }
  }, [])

  const labelFor = (keys, fallback) => {
    const list = Array.isArray(keys) ? keys : [keys]
    for (const k of list) {
      if (pageFormConfig && pageFormConfig[k]) return pageFormConfig[k]
    }
    for (const k of list) {
      const camel = k.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
      if (pageFormConfig && pageFormConfig[camel]) return pageFormConfig[camel]
    }
    return fallback
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
    setErrors((s) => ({ ...s, [name]: '' }))
  }

  const handleFiles = (sectionKey, incomingFiles) => {
    const file = incomingFiles[0]
    if (file) {
      const limit = (sectionKey === 'cv' || sectionKey === 'coverLetter') ? MAX_FILE_SIZE : MAX_OTHER_FILE_SIZE
      if (file.size > limit) {
        setErrors((s) => ({ ...s, [sectionKey]: `File is too large. Max ${(limit / (1024 * 1024)).toFixed(0)} MB.` }))
        return
      }
    }
    setFiles((s) => ({ ...s, [sectionKey]: file }))
    setErrors((s) => ({ ...s, [sectionKey]: '' }))
  }

  const onDrop = (e, sectionKey) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging((d) => ({ ...d, [sectionKey]: false }))
    if (e.dataTransfer?.files && e.dataTransfer.files.length) {
      handleFiles(sectionKey, e.dataTransfer.files)
    }
  }

  const onDragOver = (e, sectionKey) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging((d) => ({ ...d, [sectionKey]: true }))
  }

  const onDragLeave = (e, sectionKey) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging((d) => ({ ...d, [sectionKey]: false }))
  }

  const removeFile = (sectionKey) => {
    setFiles((s) => ({ ...s, [sectionKey]: null }))
    
    // Clear the DOM input value to avoid resubmitting the old file
    if (inputRefs.current[sectionKey]) {
      inputRefs.current[sectionKey].value = null
    }
    const sect = fileSections.find((s) => s.key === sectionKey)
    if (sect?.required) setErrors((s) => ({ ...s, [sectionKey]: 'This field is required.' }))
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { firstName: '', lastName: '', email: '', phone: '', cv: '', coverLetter: '', availableFrom: '', location: '' }

    if (!form.firstName) { newErrors.firstName = 'This field is required.'; isValid = false }
    if (!form.lastName) { newErrors.lastName = 'This field is required.'; isValid = false }
    if (!form.email) { newErrors.email = 'This field is required.'; isValid = false }
    else if (!/\S+@\S+\.\S+/.test(form.email)) { newErrors.email = 'Please enter a valid email address.'; isValid = false }
    if (!form.phone || form.phone.length < 5) { newErrors.phone = 'Please enter a valid phone number.'; isValid = false }
    
    if (!form.availableFrom) { newErrors.availableFrom = 'This field is required.'; isValid = false }
    else {
      const val = String(form.availableFrom).trim()
      const t = Date.parse(val)
      if (isNaN(t)) {
        newErrors.availableFrom = 'Please enter a valid date.'; isValid = false
      } else {
        const selected = new Date(t)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        selected.setHours(0, 0, 0, 0)
        if (selected < today) { newErrors.availableFrom = 'Date must be today or later.'; isValid = false }
      }
    }
    if (!form.location) { newErrors.location = 'This field is required.'; isValid = false }

    for (const sect of fileSections) {
      if (sect.required && !files[sect.key]) { newErrors[sect.key] = 'This field is required.'; isValid = false }
      if (files[sect.key]) {
        const limit = (sect.key === 'cv' || sect.key === 'coverLetter') ? MAX_FILE_SIZE : MAX_OTHER_FILE_SIZE
        if (files[sect.key].size > limit) { newErrors[sect.key] = `File is too large. Max ${(limit / (1024 * 1024)).toFixed(0)} MB.`; isValid = false }
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const isImageFile = (file) => { if (!file) return false; return /\.(jpg|jpeg|png|gif)$/i.test(file.name) }

  const onSubmit = async (e) => {
    e.preventDefault()
    
    // 1. Validation error
    if (!validateForm()) { 
      toast.error('Please fix the errors in the form.'); 
      return 
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:3000'
    try {
      const fd = new FormData()
      fd.append('firstName', form.firstName)
      fd.append('lastName', form.lastName)
      fd.append('email', form.email)
      
      let phoneVal = form.phone || ''
      if (phoneVal && !phoneVal.startsWith('+')) phoneVal = `+${phoneVal}`
      fd.append('phone', phoneVal)
      
      if (form.availableFrom) fd.append('availableFrom', form.availableFrom)
      if (form.location) fd.append('location', form.location)
      if (form.expectedSalary) fd.append('expectedSalary', form.expectedSalary)
      if (form.positionId) fd.append('positionId', form.positionId)

      Object.entries(files).forEach(([k, file]) => {
        if (!file) return
        if (k === 'employmentRef') fd.append('employeeReference', file)
        else fd.append(k, file)
      })

      const res = await fetch(`${API_BASE}/applications/create`, { method: 'POST', body: fd })
      
      if (res.ok) {
        // 2. Success message
        toast.success('Form submitted successfully! Application sent.')
        setForm({ firstName: '', lastName: '', email: '', phone: '', availableFrom: '', location: '', expectedSalary: '', positionId: '' })
        setFiles({ cv: null, coverLetter: null, employmentRef: null, certificate: null, other: null })
        setErrors({ firstName: '', lastName: '', email: '', phone: '', cv: '', coverLetter: '', availableFrom: '', location: '' })
      } else {
        // 3. API error message
        const err = await res.json().catch(() => null)
        console.error('Application error', res.status, err)
        toast.error(err?.message || `Submission failed: ${res.status}`)
      }
    } catch (err) {
      console.error(err)
      // 4. General error (network failure)
      toast.error('Failed to submit application. Please check your network connection.')
    }
  }

  const baseColor = colors.mainColor || colors.main_color || 'var(--primary-green)'


  return (
    <>
   <BorderLines position="left" />
    <div className="relative min-h-screen">
     
  {/* top padding reduced to raise the form */}
      <div className="max-w-4xl mx-auto px-6 pt-4 pb-12 text-xl relative z-10">
       
{/* Header Section */}
        <div className="mb-10 text-left">
          <h1 className={`text-4xl sm:text-5xl font-extrabold ${primaryTextColor} mb-2`}>{pageFormConfig?.form_title || 'Open Application'}</h1>
          {pageFormConfig?.form_subtitle && <p className="text-xl text-gray-600 mb-6">{pageFormConfig.form_subtitle}</p>}

          {/* Target Position Info */}
          {form.positionId && (() => {
            const pos = positions.find((p) => p._id === form.positionId)
            if (!pos) return null
            return (
              <div className="mt-6 p-4 border-l-4 border-gray-300 bg-gray-50/50">
                <p className="text-sm font-medium text-gray-500">Applying for:</p>
                <div className={`text-2xl font-semibold ${primaryTextColor}`}>
                  <span>{pos.title || pos.name}</span>
                  {(() => {
                    const extras = [pos.type || pos.employmentType, pos.location].filter(Boolean)
                    if (!extras.length) return null
                    return <span className="text-lg text-gray-600 ml-3 font-normal">({extras.join(' / ')})</span>
                  })()}
                </div>
              </div>
            )
          })()}
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          
          <div>
            <hr className="mb-6 border-gray-200" />
            <label className="block text-lg font-medium text-gray-700 mb-2">{labelFor(['name_field_title','full_name_title','name'],'NAME')} <span className="text-black">*</span></label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input name="firstName" value={form.firstName} onChange={handleInputChange} placeholder="First" className={`w-full px-4 py-3 bg-white rounded border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl`} />
                {errors.firstName && <p className="text-red-500 text-base mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input name="lastName" value={form.lastName} onChange={handleInputChange} placeholder="Last" className={`w-full px-4 py-3 bg-white rounded border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl`} />
                {errors.lastName && <p className="text-red-500 text-base mt-1">{errors.lastName}</p>}
              </div>
            </div>
          </div>

          {/* Email field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">{labelFor(['email_field_title','email_title','email'],'EMAIL')} <span className="text-black">*</span></label>
            <input name="email" value={form.email} onChange={handleInputChange} placeholder="youremail@domain.com" className={`w-full px-4 py-3 bg-white rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl`} />
            {errors.email && <p className="text-red-500 text-base mt-1">{errors.email}</p>}
          </div>

          {/* Phone field (customized) */}
          <div className="custom-phone-input-wrapper">
            <label className="block text-lg font-medium text-gray-700 mb-2">{labelFor(['phone_title','phone'],'PHONE')} <span className="text-black">*</span></label>
            <div className={`rounded border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus-within:ring-2 focus-within:ring-gray-300`}>
              <PhoneInput
                country={'us'}
                value={form.phone}
                onChange={(value) => {
                  setForm((s) => ({ ...s, phone: value }))
                  setErrors((s) => ({ ...s, phone: '' }))
                }}
                inputProps={{ name: 'phone', required: true }}
                placeholder="201 555 0123"
                containerStyle={{ width: '100%' }}
                inputStyle={{ 
                  width: '100%', 
                  border: 'none', 
                  padding: '12px 12px 12px 55px', // Adjust left padding for flag
                  fontSize: '1.25rem', // text-xl equivalent
                  backgroundColor: 'white',
                  height: 'auto' // Allow height to be controlled by padding
                }}
                buttonStyle={{ 
                  border: 'none', 
                  backgroundColor: 'white', 
                  height: '100%', 
                  borderRight: '1px solid #e5e7eb', // border-gray-200
                  fontSize: '1rem', // Smaller font for flag part
                  padding: '0 8px'
                }}
                dropdownClass="text-base"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-base mt-1">{errors.phone}</p>}
          </div>

          {/* Misc fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">{labelFor(['available_from_title','availableFrom_title','available_from','available_from_title'],'AVAILABLE FROM')} <span className="text-black">*</span></label>
              <input name="availableFrom" type="date" value={form.availableFrom} onChange={handleInputChange} placeholder="YYYY-MM-DD" className={`w-full px-4 py-3 bg-white rounded border ${errors.availableFrom ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl`} />
              {errors.availableFrom && <p className="text-red-500 text-base mt-1">{errors.availableFrom}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">{labelFor(['location_title','location'],'LOCATION')} <span className="text-black">*</span></label>
              <input name="location" value={form.location} onChange={handleInputChange} placeholder="" className={`w-full px-4 py-3 bg-white rounded border ${errors.location ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl`} />
              {errors.location && <p className="text-red-500 text-base mt-1">{errors.location}</p>}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">{pageFormConfig.expected_salary_title || 'EXPECTED SALARY'}</label>
            <input name="expectedSalary" value={form.expectedSalary} onChange={handleInputChange} placeholder="" className="w-full px-4 py-3 bg-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 text-xl" />
          </div>

          {/* Documents section */}
          <div>
            <h3 className="text-3xl font-semibold mb-4">{labelFor(['documents_section_title','documents_title','documents_section'],'DOCUMENTS')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fileSections.map((sect) => (
                <div key={sect.key}>
                  {(() => {
                    const map = {
                      cv: pageFormConfig.cv_title,
                      coverLetter: pageFormConfig.cover_letter_title,
                      employmentRef: pageFormConfig.employment_reference_title,
                      certificate: pageFormConfig.certificate_title,
                      other: pageFormConfig.other_title,
                    }
                    const label = map[sect.key] || sect.label
                    return <label className="block text-lg font-medium text-gray-700 mb-2">{label} {sect.required ? <span className="text-black">*</span> : null}</label>
                  })()}

                  <div onDrop={(e) => onDrop(e, sect.key)} onDragOver={(e) => onDragOver(e, sect.key)} onDragLeave={(e) => onDragLeave(e, sect.key)} 
                    onClick={() => { if (!files[sect.key]) inputRefs.current[sect.key]?.click() }} 
                    role="button" tabIndex={0} 
                    className={`relative cursor-pointer rounded border-2 border-dashed p-6 min-h-[200px] flex items-center justify-center text-center bg-gray-50 transition-colors duration-200 
                  ${dragging[sect.key] ? 'border-gray-400 bg-white' : (errors[sect.key] ? 'border-red-500 bg-red-50/50' : 'border-gray-200')}`}>
                    <input ref={(el) => (inputRefs.current[sect.key] = el)} type="file" accept={sect.accept} onChange={(e) => { if (e.target.files && e.target.files.length) handleFiles(sect.key, e.target.files) }} className="hidden" />
                    <div className="pointer-events-none w-full">
                      {files[sect.key] ? (
                        isImageFile(files[sect.key]) ? (
                          <div className="flex flex-col items-center pointer-events-auto">
                            <img src={URL.createObjectURL(files[sect.key])} alt={files[sect.key].name} className="max-w-full max-h-32 object-contain border mb-2" />
                            <div className="text-sm text-gray-500 mb-2">{prettySize(files[sect.key].size)}</div>
                            <button 
                              type="button" 
                              onClick={(e) => { e.stopPropagation(); removeFile(sect.key) }} 
                              className="mt-2 text-base px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 font-semibold transition-colors"
                            >
                              Remove File
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center pointer-events-auto w-full">
                            <div className="flex items-center justify-between bg-white border border-gray-100 px-3 py-2 rounded w-full">
                              <div className="text-base text-left truncate"><div className="font-medium text-gray-800 truncate">{files[sect.key].name}</div><div className="text-sm text-gray-500">{prettySize(files[sect.key].size)}</div></div>
                              <button 
                                type="button" 
                                onClick={(e) => { e.stopPropagation(); removeFile(sect.key) }} 
                                className="text-sm ml-4 px-3 py-1 bg-red-100 text-red-700 rounded-md font-medium hover:bg-red-200 transition-colors"
                              >Remove</button>
                            </div>
                          </div>
                        )
                      ) : (
                        <div>
                          <p className="text-gray-600 text-xl">Click to select a file or use drag-and-drop</p>
                          <p className="text-base text-gray-400 mt-1">{sect.accept !== '*' ? `Accepted: ${sect.accept}` : ''}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors[sect.key] && <p className="text-red-500 text-base mt-1">{errors[sect.key]}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between w-full pt-4">
            <button type="submit" className="text-white px-12 py-4 rounded-lg font-bold disabled:opacity-60 text-xl shadow-lg transition-transform hover:scale-[1.01]" style={{ backgroundColor: baseColor }}>
              {pageFormConfig.submit_button_title || 'Send application'}
            </button>

            <button type="button" onClick={() => {
              setForm({ firstName: '', lastName: '', email: '', phone: '', availableFrom: '', location: '', expectedSalary: '', positionId: '' })
              setFiles({ cv: null, coverLetter: null, employmentRef: null, certificate: null, other: null })
              setErrors({ firstName: '', lastName: '', email: '', phone: '', cv: '', coverLetter: '', availableFrom: '', location: '' })
              Object.values(inputRefs.current).forEach((el) => { if (el) el.value = null })
              toast.info('Form has been reset.')
            }} className="bg-gray-200 text-gray-700 px-8 py-4 rounded font-medium text-lg hover:bg-gray-300 transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
   
    </>
  )
}