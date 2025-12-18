// "use client"
// import { useState } from 'react'
// import { useResendVertification } from '../../../hooks/useResendVertification'
// import { useVerifyEmail } from '../../../hooks/useVerifyEmail'
// import { Button } from '../../../../src/components/ui/button'

// export default function EmailVertificationPage() {

//   const {resendLoading , resendstatus , resendVertification , resendmessage} = useResendVertification()
//   const {verifymessage,verifystatus,verifyloading , verifyEmail} = useVerifyEmail()
//     const [email , setEmail] = useState<string>("")
//     const [otp , setOtp] = useState<string>("")

//     if (resendLoading) return <div className='text-blue-600 text-center'>Resending your vertification OTP</div>;
//     if (verifyloading) return <div className='text-blue-600 text-center'>Verifying Your Email</div>;

//     const handleVertification = async () => {
//         await verifyEmail(email , otp)
//     }
//     const handleResendVertification = async () => {
//         await resendVertification(email)
//     }
//   return (
//     <section>
//         <h1 className='my-14 font-black text-4xl text-center'>Email Vertification</h1>
//         <form action="login" method='post'>

//             <label className='flex flex-row justify-between align-center mb-5 mx-5'>Enter Your Email :: <input onChange={(e)=>{setEmail(e.target.value)}} className='border-2' title='User Email' type="email" name="" /></label>
//             <label className='flex flex-row justify-between align-center mb-5 mx-5'>Enter Your Vertification OTP :: <input onChange={(e)=>{setOtp(e.target.value)}} className='border-2' title='User Vertification OTP' type="text" name="" /></label>
//         </form>

//       <div className='flex flex-row justify-between items-start'>
//         <Button onClick={handleResendVertification} type='button'> Resend Email Vertification</Button>
//         {
//             resendmessage && <h1 className={`${resendstatus === "success" ? "text-green-600" : "text-red-600"} text-3xl text-center`}>{resendmessage}</h1>
//         }
//         <Button onClick={handleVertification} type='button'> Verify Email</Button>
//         {
//             verifymessage && <h1 className={`${verifystatus === "success" ? "text-green-600" : "text-red-600"} text-3xl text-center`}>{verifymessage}</h1>
//         }
//       </div>
//     </section>
//   )
// }


"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Eye, EyeOff, Lock, Mail, User, Phone, Code, Check, AlertCircle, Loader2 } from "lucide-react"
import { useParams, usePathname , useRouter } from "next/navigation"
import { ParamValue } from "next/dist/server/request/params"
import { useVerifyEmail } from "../../../hooks/useVerifyEmail"
import { useResendVertification } from "../../../hooks/useResendVertification"

type FormType = "login" | "register"
type MessageType = { type: "error" | "success" | "loading"; text: string } | null
type Language = "en" | "ar"
// type Language = ParamValue
interface loginData {
  email: string;
  otp: string[];
  firebaseIdToken: string;
}
export default function CosmicGatewayAuth() {
  const [formType, setFormType] = useState<FormType>("login")
  const formRef = useRef<HTMLFormElement | null>(null)

  const [isFlipping, setIsFlipping] = useState(false)
  // const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<MessageType>(null)
  // const {lang} = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const [language, setLanguage] = useState<Language>(pathname.includes("ar") ? "ar" : "en")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
    invitationCode: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const OTP_LENGTH = 6

const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""))
const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const [loginData, setLoginData] = useState<loginData>({ email : "", otp:(Array(OTP_LENGTH).fill("")) , firebaseIdToken :"alsmknjhagsvdhbjaksodjabhksdjn"})

  const {resendLoading , resendstatus , resendVertification , resendmessage} = useResendVertification()
  const {verifyloading , verifystatus , verifyEmail , verifymessage} = useVerifyEmail()

  const translations = {
    en: {
      cosmicPortal: "Verify Your Account",
      newGateway: "Resend Vertification Email",
      enterPortal: "Please Enter Your Email & OTP",
      createPortal: "Please Enter Your Email",
      email: "Email",
      password: "OTP",
      fullName: "Full Name",
      phone: "Phone",
      invitationCode: "Invitation Code",
      verification: "Verification",
      login: "Verify",
      register: "Send Vertification Email",
      createAccount: "Resend Vertification Email",
      // forgotPassword: "Lost coordinates?",
      alreadyHave: "Verify Your Account",
      fixErrors: "Please fix the errors above",
      emailRequired: "Email is required",
      invalidEmail: "Invalid email format",
      passwordRequired: "OTP is missing or incomplete",
      passwordLength: "Password must be at least 8 characters",
      passwordUppercase: "Password must contain an uppercase letter",
      passwordLowercase: "Password must contain a lowercase letter",
      passwordNumber: "Password must contain a number",
      passwordSpecial: "Password must contain a special character",
      phoneRequired: "Phone number is required",
      invalidPhone: "Invalid phone number format",
      nameRequired: "Name is required",
      nameLength: "Name must be at least 2 characters",
      nameFormat: "Name can only contain letters and spaces",
      codeRequired: "Invitation code is required",
      codeLength: "Invitation code must be at least 6 characters",
      launching: "Verifying Account...",
      creating: "Sending Vertification Email...",
      welcome: "Account Verified",
      success: "Vertification Email Sent",
    },
    ar: {
      cosmicPortal: "تحقق من حسابك",
      newGateway: "اعادة ارسال ايميل التحقق",
      enterPortal: "من فضلك ادخل بريدك الالكتروني و رمز التحقق",
      createPortal: "ادخال بريدك الالكتروني",
      email: "البريد الإلكتروني",
      password: "رمز التحقق",
      fullName: "الاسم الكامل",
      phone: "الهاتف",
      invitationCode: "رمز الدعوة",
      verification: "التحقق",
      login: "تحقق",
      register: "ارسال ايميل التحقق",
      createAccount: "اعادة ارسال ايميل التحقق",
      // forgotPassword: "نسيت الإحداثيات؟",
      alreadyHave: "تحقق من حسابك",
      fixErrors: "يرجى إصلاح الأخطاء أعلاه",
      emailRequired: "البريد الإلكتروني مطلوب",
      invalidEmail: "تنسيق البريد الإلكتروني غير صالح",
      passwordRequired: "كلمة المرور مطلوبة",
      passwordLength: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
      passwordUppercase: "يجب أن تحتوي كلمة المرور على حرف كبير",
      passwordLowercase: "يجب أن تحتوي كلمة المرور على حرف صغير",
      passwordNumber: "يجب أن تحتوي كلمة المرور على رقم",
      passwordSpecial: "يجب أن تحتوي كلمة المرور على حرف خاص",
      phoneRequired: "رقم الهاتف مطلوب",
      invalidPhone: "تنسيق رقم الهاتف غير صالح",
      nameRequired: "الاسم مطلوب",
      nameLength: "يجب أن يكون الاسم حرفين على الأقل",
      nameFormat: "يمكن أن يحتوي الاسم على أحرف ومسافات فقط",
      codeRequired: "رمز الدعوة مطلوب",
      codeLength: "يجب أن يكون رمز الدعوة 6 أحرف على الأقل",
      launching: "جاري إطلاق البوابة...",
      creating: "جاري ارسال ايميل التحقق...",
      welcome: "مرحباً بعودتك أيها المسافر!",
      success: "تم إرسال ايميل التحقق بنجاح",
    },
  }

  // const handleOtpChange = (value: string, index: number) => {
  //   if (!/^\d?$/.test(value)) return // digits only

  //   const newOtp = [...otp]
  //   newOtp[index] = value
  //   setOtp(newOtp)

  //   if (value && index < OTP_LENGTH - 1) {
  //     otpRefs.current[index + 1]?.focus()
  //   }
  // }

  const handleOtpChange = (value: string, index: number) => {
  if (!/^\d?$/.test(value)) return

  const newOtp = [...otp]
  newOtp[index] = value
  setOtp(newOtp)

  // Move forward
  if (value && index < OTP_LENGTH - 1) {
    otpRefs.current[index + 1]?.focus()
  }

  // Auto submit if last digit filled
  if (value && index === OTP_LENGTH - 1) {
    setTimeout(() => {
      formRef.current?.requestSubmit()
    }, 0)
    // submitOtp(newOtp.join(""))
  }
  setLoginData({ ...loginData, otp : otp })
}


  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (
  e: React.ClipboardEvent<HTMLInputElement>
) => {
  e.preventDefault()

  const pastedData = e.clipboardData
    .getData("text")
    .replace(/\D/g, "")
    .slice(0, OTP_LENGTH)

  if (!pastedData) return

  const newOtp = Array(OTP_LENGTH).fill("")

  for (let i = 0; i < pastedData.length; i++) {
    newOtp[i] = pastedData[i]
  }

  setOtp(newOtp)

  const lastIndex = pastedData.length - 1
  otpRefs.current[lastIndex]?.focus()

  // Auto submit after paste
  if (pastedData.length === OTP_LENGTH) {
    setTimeout(() => {
      formRef.current?.requestSubmit()
    }, 0)
    // await handleLogin()
    // submitOtp(newOtp.join(""))
  }
}


  const t = translations[language]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      const contentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.scrollHeight,
        document.body.offsetHeight,
        window.innerHeight,
      )
      canvas.width = window.innerWidth
      canvas.height = contentHeight
    }

    updateCanvasSize()

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })
    resizeObserver.observe(document.body)

    window.addEventListener("resize", updateCanvasSize)

    interface Star {
      x: number
      y: number
      z: number
      size: number
    }

    const stars: Star[] = []
    for (let i = 0; i < 500; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 2000,
        size: Math.random() * 2,
      })
    }

    let rotation = 0

    const animate = () => {
      ctx.fillStyle = "rgba(5, 5, 15, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      rotation += 0.0005

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      stars.forEach((star) => {
        const rotatedX = star.x * Math.cos(rotation) - star.z * Math.sin(rotation)
        const rotatedZ = star.x * Math.sin(rotation) + star.z * Math.cos(rotation)

        const scale = 1000 / (1000 + rotatedZ)
        const x = centerX + rotatedX * scale
        const y = centerY + star.y * scale

        if (scale > 0) {
          const size = star.size * scale
          const opacity = Math.min(1, scale)

          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(200, 220, 255, ${opacity * 0.8})`
          ctx.fill()

          if (size > 1.5) {
            ctx.shadowBlur = size * 2
            ctx.shadowColor = "rgba(150, 180, 255, 0.5)"
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      resizeObserver.disconnect()
    }
  }, [])

  const validateEmail = (email: string): string | null => {
    if (!email) return t.emailRequired
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return t.invalidEmail
    return null
  }
  const validateOtp = (otp: string): string | null => {
    if (!otp) return t.passwordRequired
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // if (!emailRegex.test(email)) return t.invalidEmail
    return null
  }

  // const validatePassword = (password: string): string | null => {
  //   if (!password) return t.passwordRequired
  //   if (password.length < 8) return t.passwordLength
  //   if (!/[A-Z]/.test(password)) return t.passwordUppercase
  //   if (!/[a-z]/.test(password)) return t.passwordLowercase
  //   if (!/[0-9]/.test(password)) return t.passwordNumber
  //   if (!/[!@#$%^&*]/.test(password)) return t.passwordSpecial
  //   return null
  // }

  // const validatePhone = (phone: string): string | null => {
  //   if (!phone) return t.phoneRequired
  //   const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
  //   if (!phoneRegex.test(phone)) return t.invalidPhone
  //   return null
  // }

  // const validateName = (name: string): string | null => {
  //   if (!name) return t.nameRequired
  //   if (name.length < 2) return t.nameLength
  //   if (!/^[a-zA-Z\s\u0600-\u06FF]+$/.test(name)) return t.nameFormat
  //   return null
  // }

  // const validateInvitationCode = (code: string): string | null => {
  //   if (!code) return t.codeRequired
  //   if (code.length < 6) return t.codeLength
  //   return null
  // }

  const switchForm = () => {
    setIsFlipping(true)
    setMessage(null)
    setErrors({})
    setTimeout(() => {
      setFormType(formType === "login" ? "register" : "login")
      setIsFlipping(false)
    }, 600)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const newErrors: Record<string, string> = {}
    const emailError = validateEmail(loginData.email)
    // const passwordError = validatePassword(loginData.password)
    // const otpError = validatePassword(loginData.otp)
    // alert(loginData.otp)
    // alert(otp)
    // alert(otp.join(""))
    // alert(loginData.email)
    const otpError = validateOtp(otp.join(""))
    
    if (emailError) newErrors.email = emailError
    // if (passwordError) newErrors.password = passwordError
    if (otpError) newErrors.otp = otpError

    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      setMessage({ type: "error", text: t.fixErrors })
      return
    }
    
    setMessage({ type: "loading", text: t.launching })
        const result = await verifyEmail(loginData.email,otp.join(""))

  if (result.success) {
      setMessage({ type: "success", text: t.welcome })
      setTimeout(() => {
        router.push(`/${language}/login`)
    }, 2000)
  } else {
      setMessage({ type: "error", text: result.error })
  }
    // setTimeout(() => {
    //   // alert(loginData.otp)
    //   setMessage({ type: "success", text: t.welcome })
    // }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const newErrors: Record<string, string> = {}
    const emailError = validateEmail(registerData.email)
    // const passwordError = validatePassword(registerData.password)
    // const phoneError = validatePhone(registerData.phone)
    // const nameError = validateName(registerData.name)
    // const codeError = validateInvitationCode(registerData.invitationCode)

    if (emailError) newErrors.email = emailError
    // if (passwordError) newErrors.password = passwordError
    // if (phoneError) newErrors.phone = phoneError
    // if (nameError) newErrors.name = nameError
    // if (codeError) newErrors.invitationCode = codeError

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setMessage({ type: "error", text: t.fixErrors })
      return
    }

    setMessage({ type: "loading", text: t.creating })

    const result = await resendVertification(registerData.email)

    if (result.success) {
        setMessage({ type: "success", text: t.success })
        // router.push(`/${language}/login`)
    } else {
        setMessage({ type: "error", text: result.error })
    }

    // setTimeout(() => {
    //   setMessage({ type: "success", text: t.success })
    // }, 1500)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          className="rounded-full bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-300 backdrop-blur-sm transition-all hover:bg-purple-500/30 hover:text-purple-200 border border-purple-400/30"
        >
          {language === "en" ? "العربية" : "English"}
        </button>
      </div> */}

      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div
          className={`w-full max-w-md transform transition-all duration-800 ${
            isFlipping ? "rotate-y-180 scale-95" : "rotate-y-0 scale-100"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="rounded-3xl border-2 border-purple-500/30 bg-linear-to-br from-slate-900/90 to-purple-900/20 p-8 shadow-2xl shadow-purple-500/20 backdrop-blur-xl ring-1 ring-purple-400/10">
            <div className="mb-6 flex justify-center">
              <div className="relative h-20 w-20">
                <div style={{ animationDuration: "3s"}} className="animate-spin absolute inset-0 animate-cosmic-spin rounded-full border-4 border-transparent border-t-purple-400 border-r-blue-400"></div>
                <div
                  className="animate-spin absolute inset-2 animate-cosmic-spin-reverse rounded-full border-4 border-transparent border-b-cyan-400 border-l-pink-400"
                  style={{ animationDuration: "3s"  , animationDirection:"reverse"}}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl animate-pulse">🌌</div>
              </div>
            </div>

            <h2 className="mb-2 text-center text-3xl font-bold text-white">
              {formType === "login" ? t.cosmicPortal : t.newGateway}
            </h2>
            <p className="mb-8 text-center text-sm text-purple-300">
              {formType === "login" ? t.enterPortal : t.createPortal}
            </p>

            {message && (
              <div
                className={`mb-6 flex items-center gap-2 rounded-lg border p-4 animate-comet ${
                  message.type === "error"
                    ? "border-red-400/20 bg-red-500/10 text-red-300"
                    : message.type === "success"
                      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                      : "border-purple-400/20 bg-purple-500/10 text-purple-300"
                }`}
              >
                {message.type === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                {message.type === "error" && <AlertCircle className="h-4 w-4" />}
                {message.type === "success" && <Check className="h-4 w-4" />}
                <span className="text-sm">{message.text}</span>
              </div>
            )}

            {formType === "login" ? (
              <form ref={formRef} onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-purple-200">{t.email}</label>
                  <div className="relative">
                    <Mail
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400`}
                    />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.email ? "border-red-400/50" : "border-purple-500/30"
                      } bg-slate-800/50 py-3 ${language === "ar" ? "pr-11 pl-4" : "pl-11 pr-4"} text-white placeholder-purple-400/50 transition-all focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:shadow-lg focus:shadow-purple-500/30`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="otp"  className="mb-2 block text-sm font-medium text-purple-200">
                    {t.password}
                  </label>
                                      
                  {/* <div
                    className={`flex ${
                      language === "ar" ? "flex-row-reverse" : ""
                    } gap-3 justify-center`}
                  >
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        name="otp"
                        title="otp"
                        ref={(el) => {(otpRefs.current[index] = el)}}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        className={`
                          w-12 h-14 text-center text-xl font-bold
                          rounded-lg
                          bg-slate-800/60
                          border ${
                            errors.otp ? "border-red-400/50" : "border-purple-500/30"
                          }
                          text-white
                          transition-all
                          focus:outline-none
                          focus:border-purple-400
                          focus:ring-2
                          focus:ring-purple-400/30
                          focus:shadow-lg
                          focus:shadow-purple-500/40
                        `}
                      />
                    ))}
                  </div> */}
                  
                  <div className="flex justify-center gap-3 rtl:flex-row-reverse">
                    {otp.map((digit, index) => (
                      <input
                      dir="ltr"

                        key={index}
                        ref={(el) => {
                          otpRefs.current[index] = el
                        }}
                        placeholder="0"
                        title="otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        onPaste={handleOtpPaste}
                        className={`
                          xxs:w-12 xxxs:w-8 xxs:h-14 xxxs:h-10 text-center text-xl font-bold
                          rounded-lg
                          bg-slate-800/60
                          border ${
                            errors.otp ? "border-red-400/50" : "border-purple-500/30"
                          }
                          text-white
                          transition-all
                          focus:outline-none
                          focus:border-purple-400
                          focus:ring-2
                          focus:ring-purple-400/30
                          focus:shadow-lg
                          focus:shadow-purple-500/40
                        `}
                      />
                    ))}
                  </div>

                  {errors.otp && (
                    <p className="mt-2 text-xs text-red-300 text-center">
                      {errors.otp}
                    </p>
                  )}
                </div>

                {/* <div>
                  <label className="mb-2 block text-sm font-medium text-purple-200">{t.password}</label>
                  <div className="relative">
                    <Lock
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400`}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.password ? "border-red-400/50" : "border-purple-500/30"
                      } bg-slate-800/50 py-3 ${language === "ar" ? "pr-11 pl-12" : "pl-11 pr-12"} text-white placeholder-purple-400/50 transition-all focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:shadow-lg focus:shadow-purple-500/30`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute ${language === "ar" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-purple-400 transition-all hover:scale-110 hover:text-purple-300`}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password}</p>}
                </div> */}

                <button
                  type="submit"
                  className=" hover:cursor-pointer w-full rounded-lg bg-linear-to-r from-purple-600 via-pink-500 to-blue-500 py-3 font-semibold text-white transition-all hover:from-purple-500 hover:via-pink-400 hover:to-blue-400 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
                >
                  {t.login}
                </button>

                <div className="flex items-center justify-center text-sm">
                  <button
                    type="button"
                    onClick={switchForm}
                    className="text-purple-300 transition-colors hover:text-purple-200 hover:underline hover:cursor-pointer"
                  >
                    {t.createAccount}
                  </button>
                  {/* <button
                    type="button"
                    className="text-purple-400 transition-colors hover:text-purple-300 hover:underline"
                  >
                    {t.forgotPassword}
                  </button> */}
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                {/* <div>
                  <label className="mb-2 block text-sm font-medium text-purple-200">{t.fullName}</label>
                  <div className="relative">
                    <User
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400`}
                    />
                    <input
                      type="text"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.name ? "border-red-400/50" : "border-purple-500/30"
                      } bg-slate-800/50 py-2.5 ${language === "ar" ? "pr-11 pl-4" : "pl-11 pr-4"} text-white placeholder-purple-400/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
                </div> */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-purple-200">{t.email}</label>
                  <div className="relative">
                    <Mail
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400`}
                    />
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.email ? "border-red-400/50" : "border-purple-500/30"
                      } bg-slate-800/50 py-2.5 ${language === "ar" ? "pr-11 pl-4" : "pl-11 pr-4"} text-white placeholder-purple-400/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
                </div>

                {/* <div>
                  <label className="mb-2 block text-sm font-medium text-purple-200">{t.phone}</label>
                  <div className="relative">
                    <Phone
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400`}
                    />
                    <input
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.phone ? "border-red-400/50" : "border-purple-500/30"
                      } bg-slate-800/50 py-2.5 ${language === "ar" ? "pr-11 pl-4" : "pl-11 pr-4"} text-white placeholder-purple-400/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30`}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-red-300">{errors.phone}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-purple-200">{t.password}</label>
                  <div className="relative">
                    <Lock
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400`}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.password ? "border-red-400/50" : "border-purple-500/30"
                      } bg-slate-800/50 py-2.5 ${language === "ar" ? "pr-11 pl-12" : "pl-11 pr-12"} text-white placeholder-purple-400/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute ${language === "ar" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-purple-400 transition-all hover:scale-110 hover:text-purple-300`}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-purple-200">{t.invitationCode}</label>
                  <div className="relative">
                    <Code
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400`}
                    />
                    <input
                      type="text"
                      value={registerData.invitationCode}
                      onChange={(e) => setRegisterData({ ...registerData, invitationCode: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.invitationCode ? "border-red-400/50" : "border-purple-500/30"
                      } bg-slate-800/50 py-2.5 ${language === "ar" ? "pr-11 pl-4" : "pl-11 pr-4"} text-white placeholder-purple-400/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30`}
                      placeholder="COSMIC123"
                    />
                  </div>
                  {errors.invitationCode && <p className="mt-1 text-xs text-red-300">{errors.invitationCode}</p>}
                </div>

                <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-2.5">
                  <p className="text-xs text-purple-300">
                    {t.verification}:{" "}
                    <span className="font-medium text-white">{language === "en" ? "Email" : "البريد الإلكتروني"}</span>
                  </p>
                </div> */}

                <button
                  type="submit"
                  className="hover:cursor-pointer w-full rounded-lg bg-linear-to-r from-purple-600 via-pink-500 to-blue-500 py-3 font-semibold text-white transition-all hover:from-purple-500 hover:via-pink-400 hover:to-blue-400 hover:shadow-lg hover:shadow-purple-500/50 active:scale-95"
                >
                  {t.register}
                </button>

                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={switchForm}
                    className="text-purple-300 transition-colors hover:text-purple-200 hover:underline hover:cursor-pointer"
                  >
                    {t.alreadyHave}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
