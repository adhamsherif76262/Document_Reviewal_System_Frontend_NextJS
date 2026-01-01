// "use client"
// import { useState } from 'react'
// import { useForgotPassword } from '../../../hooks/useForgotPassword';
// import { Button } from '../../../../src/components/ui/button';
// import { useParams, useRouter } from 'next/navigation';
// export default function ForgotPasswordpage() {
//   const router = useRouter();
//   const [email , setEmail] = useState<string>("")
//   const {forgotPasswordLoading , forgotPasswordStatus , forgotPasswordMessage , forgotPassword} = useForgotPassword()
//   const { lang } = useParams();

//   if(forgotPasswordLoading) return <div className="text-blue-600 text-center">Sending OTP</div>;
//   return (
//     <section>
        
//         <h1 className='text-4xl text-center'>Forgot Password</h1>
//         <div className='flex flex-col justify-center items-center mx-[25%]'>
//             <label htmlFor='email' className='block text-sm font-medium text-gray-700 my-4'>Email</label>
//             <input
//                 type='email'
//                 id='email'
//                 name='email'
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
//             />
//             <Button
//                 onClick={() => forgotPassword(email)}
//                 className='w-full px-3 py-2 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
//             >
//                 Send OTP
//             </Button>
//             <Button
//                 onClick={() => router.push(`/${lang}/passwordReset`)}
//                 className='w-full px-3 py-2 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
//             >
//                 Reset Your Password
//             </Button>
//         </div>
//         {
//             forgotPasswordMessage && <h1 className={`${forgotPasswordStatus === "success" ? "text-green-600" : "text-red-600"} text-3xl text-center`}>{forgotPasswordMessage}</h1>
//         }
//     </section>
//   )
// }


"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Eye, EyeOff, Lock, Mail, User, Phone, Code, Check, AlertCircle, Loader2 } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useForgotPassword } from "../../../hooks/useForgotPassword"
import { useResetPassword } from "../../../hooks/useResetPassword"

type FormType = "login" | "register"
type MessageType = { type: "error" | "success" | "loading"; text: string } | null
type Language = "en" | "ar"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
}
interface registerData {
  email: string;
  otp: string[];
  password: string;
  confirmPassword: string;
}
export default function MagneticParticlesAuth() {
  const pathname = usePathname()
  const router = useRouter()
  const [formType, setFormType] = useState<FormType>("login")
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<MessageType>(null)
  const [language, setLanguage] = useState<Language>(pathname.includes("ar") ? "ar" : "en")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const OTP_LENGTH = 6
  const [loginData, setLoginData] = useState({ email: ""})
//   const [registerData, setRegisterData] = useState({
//     email: "",
//     password: "",
//     phone: "",
//     name: "",
//     invitationCode: "",
//   })
  const [registerData, setRegisterData] = useState<registerData>({
    email: "",
    otp:(Array(OTP_LENGTH).fill("")),
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  const {forgotPasswordLoading , forgotPasswordStatus , forgotPasswordMessage , forgotPassword} = useForgotPassword()
  const {resetPasswordLoading , resetPasswordStatus , resetPasswordMessage , resetPassword} = useResetPassword()
const resetRegisterForm = () => {
  setRegisterData({
    email: "",
    otp: Array(OTP_LENGTH).fill(""),
    password: "",
    confirmPassword: "",
  })
  setErrors({})
  setMessage(null)
  setShowPassword(false)
    // ✅ reset OTP focus
  requestAnimationFrame(() => {
    otpRefs.current.forEach((input) => {
      if (input) input.value = "";
    });

    otpRefs.current[0]?.focus();
  });
}
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
//   setLoginData({ ...loginData, otp : otp })
  setRegisterData({ ...registerData, otp : otp })
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
  const translations = {
    en: {
      ResetRegisterForm : "Reset Form",
      otp:"OTP",
      otpRequired : "OTP is missing or incomplete",
      magneticLogin: "Forgot Password",
      magneticRegister: "Reset your Password",
      alignField: "Please Enter Your Email Below To Reset Your Password",
      createSignature: "Please Fill The Data Below To Reset Your Password",
      email: "Email",
      password: "New Password",
      confirmPassword: "Confirm New Password",
      fullName: "Full Name",
      phone: "Phone",
      invitationCode: "Invitation Code",
      verification: "Verification",
      login: "Send OTP",
      register: "Reset Your Password",
      createAccount: "Reset Password",
      forgotPassword: "Lost signature?",
      alreadyHave: "Resend Forgot Password OTP",
      fixErrors: "Please fix the errors above",
      launching: "Sending OTP To Your Email...",
      creating: "Resetting Your Password...",
      welcome: "Email Sent Successfully, Please Proceed To The Reset Password Page",
      success: "Password Reset Successfully",
      emailRequired: "Email is required",
      invalidEmail: "Invalid email format",
      passwordsNotMatching: "Passwords do not match",
      passwordRequired: "Password is required",
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
    },
    ar: {
      ResetRegisterForm : "مسح جميع البيانات",
      otp:"رمز التحقق",
      otpRequired : "رمز التحقق مفقود أو غير مكتمل",
      magneticLogin: "نسيت كلمة المرور",
      magneticRegister: "إعادة تعيين كلمة المرور",
      alignField: "الرجاء إدخال بريدك الإلكتروني أدناه لإعادة تعيين كلمة المرور",
      createSignature: "الرجاء ملء البيانات أدناه لإعادة تعيين كلمة المرور",
      email: "البريد الإلكتروني",
      password: "كلمة المرور الجديدة",
      confirmPassword: "اكد كلمة المرور الجديدة",
      fullName: "الاسم الكامل",
      phone: "الهاتف",
      invitationCode: "رمز الدعوة",
      verification: "التحقق",
      login: "إرسال رمز التحقق (OTP)",
      register: "إعادة تعيين كلمة المرور",
      createAccount: "إعادة تعيين كلمة المرور",
      forgotPassword: "فقدت التوقيع؟",
      alreadyHave: "إعادة إرسال رمز تعيين كلمة المرور الجديدة (OTP)",
      fixErrors: "يرجى إصلاح الأخطاء أعلاه",
      launching: "جاري ارسال رمز التحقق الي بريدك الالكتروني...",
      creating: "جاري إعادة تعيين كلمة المرور...",
      welcome: "تم ارسال رمز التحقق بنجاح , برجاء الانتقال الي صفحة إعادة تعيين كلمة المرور",
      success: "تم إعادة تعيين كلمة المرور بنجاح",
      emailRequired: "البريد الإلكتروني مطلوب",
      invalidEmail: "تنسيق البريد الإلكتروني غير صالح",
      passwordsNotMatching: "كلمات المرور غير متاطابقة",
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
    },
  }

  const t = translations[language]

  // Magnetic particles animation
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

      // Reinitialize particles with new canvas dimensions
      const particles: Particle[] = []
      const spacing = 30
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          particles.push({
            x,
            y,
            vx: 0,
            vy: 0,
            baseX: x,
            baseY: y,
          })
        }
      }
      particlesRef.current = particles
    }

    updateCanvasSize()

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })
    resizeObserver.observe(document.body)

    window.addEventListener("resize", updateCanvasSize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 20, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y
      const particles = particlesRef.current

      particles.forEach((p) => {
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 200) {
          const force = (200 - dist) / 200
          p.vx += (dx / dist) * force * 2
          p.vy += (dy / dist) * force * 2
        }

        const returnDx = p.baseX - p.x
        const returnDy = p.baseY - p.y
        p.vx += returnDx * 0.01
        p.vy += returnDy * 0.01

        p.x += p.vx
        p.y += p.vy

        p.vx *= 0.95
        p.vy *= 0.95

        const distFromMouse = Math.sqrt((mouseX - p.x) ** 2 + (mouseY - p.y) ** 2)
        const hue = message?.type === "success" ? 140 : message?.type === "error" ? 0 : 280
        const brightness = Math.max(0, 1 - distFromMouse / 300)

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue}, 70%, ${50 + brightness * 30}%, ${0.4 + brightness * 0.4})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      resizeObserver.disconnect()
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [message])

  const validateEmail = (email: string): string | null => {
    if (!email) return t.emailRequired
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return t.invalidEmail
    return null
  }

  const validatePassword = (password: string): string | null => {
    if (!password) return t.passwordRequired
    if (password.length < 8) return t.passwordLength
    if (!/[A-Z]/.test(password)) return t.passwordUppercase
    if (!/[a-z]/.test(password)) return t.passwordLowercase
    if (!/[0-9]/.test(password)) return t.passwordNumber
    if (!/[!@#$%^&*]/.test(password)) return t.passwordSpecial
    return null
  }
  const validateConfirmPassword = (confirmPassword: string): string | null => {
    if (!confirmPassword) return t.passwordRequired
    if (confirmPassword !== registerData.password) return t.passwordsNotMatching
    // if (password.length < 8) return t.passwordLength
    // if (!/[A-Z]/.test(password)) return t.passwordUppercase
    // if (!/[a-z]/.test(password)) return t.passwordLowercase
    // if (!/[0-9]/.test(password)) return t.passwordNumber
    // if (!/[!@#$%^&*]/.test(password)) return t.passwordSpecial
    return null
  }
    const validateOtp = (otp: string): string | null => {
    if (!otp) return t.otpRequired
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // if (!emailRegex.test(email)) return t.invalidEmail
    return null
  }

//   const validatePhone = (phone: string): string | null => {
//     if (!phone) return t.phoneRequired
//     const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
//     if (!phoneRegex.test(phone)) return t.invalidPhone
//     return null
//   }

//   const validateName = (name: string): string | null => {
//     if (!name) return t.nameRequired
//     if (name.length < 2) return t.nameLength
//     if (!/^[a-zA-Z\s\u0600-\u06FF]+$/.test(name)) return t.nameFormat
//     return null
//   }

//   const validateInvitationCode = (code: string): string | null => {
//     if (!code) return t.codeRequired
//     if (code.length < 6) return t.codeLength
//     return null
//   }

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

    if (emailError) newErrors.email = emailError
    // if (passwordError) newErrors.password = passwordError

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setMessage({ type: "error", text: t.fixErrors })
      return
    }

    setMessage({ type: "loading", text: t.launching })

    const result = await forgotPassword(loginData.email)

      if (result.success) {
      setMessage({ type: "success", text: t.welcome })
        if(formType === "login"){
          setTimeout(() => {
              switchForm()
            }, 3000)
        }
  } else {
      setMessage({ type: "error", text: result.error })
  }

    // setTimeout(() => {
    //   setMessage({ type: "success", text: t.welcome })
    // }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const newErrors: Record<string, string> = {}
    const emailError = validateEmail(registerData.email)
    const passwordError = validatePassword(registerData.password)
    const confirmPasswordError = validateConfirmPassword(registerData.confirmPassword)
    const otpError = validateOtp(otp.join(""))
    // const phoneError = validatePhone(registerData.phone)
    // const nameError = validateName(registerData.name)
    // const codeError = validateInvitationCode(registerData.invitationCode)

    if (emailError) newErrors.email = emailError
    if (passwordError) newErrors.password = passwordError
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError
    if (otpError) newErrors.otp = otpError
    // if (phoneError) newErrors.phone = phoneError
    // if (nameError) newErrors.name = nameError
    // if (codeError) newErrors.invitationCode = codeError

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setMessage({ type: "error", text: t.fixErrors })
      return
    }
    
    setMessage({ type: "loading", text: t.creating })

    // alert(otp.join(""))
    const result = await resetPassword(registerData.email, otp.join("") , registerData.password )

      if (result.success) {
      setMessage({ type: "success", text: t.success })
      setTimeout(() => {
        router.push(`/${language}/login`)
    }, 3000)
  } else {
      setMessage({ type: "error", text: result.error })
  }
    // setTimeout(() => {
    //   setMessage({ type: "success", text: t.success })
    // }, 1500)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="fixed top-4 right-4 z-50">
        {/* <button
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          className="rounded-full bg-violet-500/20 px-4 py-2 text-sm font-medium text-violet-300 backdrop-blur-sm transition-all hover:bg-violet-500/30 hover:text-violet-200 border border-violet-400/30"
        >
          {language === "en" ? "العربية" : "English"}
        </button> */}
      </div>

      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div
          className={`w-full max-w-md transform transition-all duration-600 ${isFlipping ? "rotate-180 scale-95 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
        >
          <div className="rounded-2xl border border-violet-500/30 bg-slate-900/70 p-8 shadow-2xl shadow-violet-500/20 backdrop-blur-xl">
            <h2 className="mb-2 text-center text-3xl font-bold text-white">
              {formType === "login" ? t.magneticLogin : t.magneticRegister}
            </h2>
            <p className="mb-8 text-center text-sm text-violet-300">
              {formType === "login" ? t.alignField : t.createSignature}
            </p>

            {message && (
              <div
                className={`mb-6 flex items-center gap-2 rounded-lg border p-4 animate-magnetic-pulse ${
                  message.type === "error"
                    ? "border-red-400/20 bg-red-500/10 text-red-300"
                    : message.type === "success"
                      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                      : "border-violet-400/20 bg-violet-500/10 text-violet-300"
                }`}
              >
                {message.type === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                {message.type === "error" && <AlertCircle className="h-4 w-4" />}
                {message.type === "success" && <Check className="h-4 w-4" />}
                <span className="text-sm">{message.text}</span>
              </div>
            )}

            {formType === "login" ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-violet-200">{t.email}</label>
                  <div className="relative">
                    <Mail
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-violet-400`}
                    />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.email ? "border-red-400/50" : "border-violet-500/30"
                      } bg-slate-800/50 py-3 ${language === "ar" ? "pr-11 pl-4" : "pl-11 pr-4"} text-white placeholder-violet-400/50 transition-all focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30 focus:shadow-lg focus:shadow-violet-500/30`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
                </div>

                {/* <div>
                  <label className="mb-2 block text-sm font-medium text-violet-200">{t.password}</label>
                  <div className="relative">
                    <Lock
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-violet-400`}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.password ? "border-red-400/50" : "border-violet-500/30"
                      } bg-slate-800/50 py-3 ${language === "ar" ? "pr-11 pl-12" : "pl-11 pr-12"} text-white placeholder-violet-400/50 transition-all focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30 focus:shadow-lg focus:shadow-violet-500/30`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute ${language === "ar" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-violet-400 transition-all hover:scale-110 hover:text-violet-300`}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password}</p>}
                </div> */}

                <button
                  type="submit"
                  className="hover:cursor-pointer w-full rounded-lg bg-linear-to-r from-violet-600 via-purple-500 to-fuchsia-500 py-3 font-semibold text-white transition-all hover:from-violet-500 hover:via-purple-400 hover:to-fuchsia-400 hover:shadow-lg hover:shadow-violet-500/50 active:scale-95"
                >
                  {t.login}
                </button>

                <div className="flex items-center justify-center text-lg">
                  <button
                    type="button"
                    onClick={switchForm}
                    className="hover:cursor-pointer text-violet-300 transition-colors hover:text-violet-200 hover:underline "
                  >
                    {t.createAccount}
                  </button>
                  {/* <button
                    type="button"
                    className="text-violet-400 transition-colors hover:text-violet-300 hover:underline"
                  >
                    {t.forgotPassword}
                  </button> */}
                </div>
              </form>
            ) : (
              <form ref={formRef} onSubmit={handleRegister} className="space-y-4">
                {/* <div>
                  <label className="mb-2 block text-sm font-medium text-violet-200">{t.fullName}</label>
                  <div className="relative">
                    <User
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-violet-400`}
                    />
                    <input
                      type="text"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.name ? "border-red-400/50" : "border-violet-500/30"
                      } bg-slate-800/50 py-2.5 ${language === "ar" ? "pr-11 pl-4" : "pl-11 pr-4"} text-white placeholder-violet-400/50 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
                </div> */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-violet-200">{t.email}</label>
                  <div className="relative">
                    <Mail
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-violet-400`}
                    />
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.email ? "border-red-400/50" : "border-violet-500/30"
                      } bg-slate-800/50 py-2.5 ${language === "ar" ? "pr-11 pl-4" : "pl-11 pr-4"} text-white placeholder-violet-400/50 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
                </div>

                {/* <div>
                  <label className="mb-2 block text-sm font-medium text-violet-200">{t.phone}</label>
                  <div className="relative">
                    <Phone
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-violet-400`}
                    />
                    <input
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.phone ? "border-red-400/50" : "border-violet-500/30"
                      } bg-slate-800/50 py-2.5 ${language === "ar" ? "pr-11 pl-4" : "pl-11 pr-4"} text-white placeholder-violet-400/50 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30`}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-red-300">{errors.phone}</p>}
                </div> */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-violet-200">{t.password}</label>
                  <div className="relative">
                    <Lock
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-violet-400`}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.password ? "border-red-400/50" : "border-violet-500/30"
                      } bg-slate-800/50 py-2.5 ${language === "ar" ? "pr-11 pl-12" : "pl-11 pr-12"} text-white placeholder-violet-400/50 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`hover:cursor-pointer absolute ${language === "ar" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-violet-400 transition-all hover:scale-110 hover:text-violet-300`}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-violet-200">{t.confirmPassword}</label>
                  <div className="relative">
                    <Lock
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-violet-400`}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.password ? "border-red-400/50" : "border-violet-500/30"
                      } bg-slate-800/50 py-2.5 ${language === "ar" ? "pr-11 pl-12" : "pl-11 pr-12"} text-white placeholder-violet-400/50 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`hover:cursor-pointer absolute ${language === "ar" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-violet-400 transition-all hover:scale-110 hover:text-violet-300`}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-xs text-red-300">{errors.confirmPassword}</p>}
                </div>

                {/* <div>
                  <label className="mb-2 block text-sm font-medium text-violet-200">{t.invitationCode}</label>
                  <div className="relative">
                    <Code
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-violet-400`}
                    />
                    <input
                      type="text"
                      value={registerData.invitationCode}
                      onChange={(e) => setRegisterData({ ...registerData, invitationCode: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.invitationCode ? "border-red-400/50" : "border-violet-500/30"
                      } bg-slate-800/50 py-2.5 ${language === "ar" ? "pr-11 pl-4" : "pl-11 pr-4"} text-white placeholder-violet-400/50 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30`}
                      placeholder="MAGNETIC123"
                    />
                  </div>
                  {errors.invitationCode && <p className="mt-1 text-xs text-red-300">{errors.invitationCode}</p>}
                </div> */}

                {/* <div className="rounded-lg border border-violet-500/30 bg-violet-500/10 p-2.5">
                  <p className="text-xs text-violet-300">
                    {t.verification}:{" "}
                    <span className="font-medium text-white">{language === "en" ? "Email" : "البريد الإلكتروني"}</span>
                  </p>
                </div> */}

                <div>
                  <label htmlFor="otp"  className="mb-2 block text-sm font-medium text-purple-200">
                    {t.otp}
                  </label>
                    
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

                <button
                  type="submit"
                  className="hover:cursor-pointer w-full rounded-lg bg-linear-to-r from-violet-600 via-purple-500 to-fuchsia-500 py-3 font-semibold text-white transition-all hover:from-violet-500 hover:via-purple-400 hover:to-fuchsia-400 hover:shadow-lg hover:shadow-violet-500/50 active:scale-95"
                >
                  {t.register}
                </button>

                <button
                  type="button"
                  onClick={resetRegisterForm}
                  className="hover:cursor-pointer w-full text-xl rounded-lg border border-slate-600 py-3 text-slate-300 hover:bg-slate-700/40 transition"
                //   className="w-full rounded-lg bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 py-3 font-semibold text-white transition-all hover:from-violet-500 hover:via-purple-400 hover:to-fuchsia-400 hover:shadow-lg hover:shadow-violet-500/50 active:scale-95"
                >
                  {t.ResetRegisterForm}
                </button>

                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={switchForm}
                    className="hover:cursor-pointer text-violet-300 transition-colors hover:text-violet-200 hover:underline"
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
