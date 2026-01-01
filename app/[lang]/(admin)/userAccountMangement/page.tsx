// "use client"
// import { useState } from 'react'
// import { Button } from '../../../../src/components/ui/button'
// import { useExtendUserExpiryDate } from '../../../hooks/useExtendUserExpiryDate'
// import { useInviteCode } from '../../../hooks/useInviteCode'

// export default function UserAccountMangementPage() {
//         const [generatedFor, setgeneratedFor] = useState<string>("")
//         // const {user , loading} = useAuth()
//         const {generateInvite , inviteCodeLoading , error , code} = useInviteCode()
//         const handlegenerateInvite = async () => {
//             // alert(generatedFor)
//             await generateInvite(generatedFor)
//             // alert(code)
//         }
//         const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//             setgeneratedFor(event.target.value)
//         }
        
//     const [email, setEmail] = useState<string>("")
//     const {handleExtendUserExpiryDate , extendExpiryDateloading , message , status} = useExtendUserExpiryDate()

//     if(extendExpiryDateloading) return <div className='text-blue-600 text-center'>Extending The Specified User&lsquo;s Account Expiry Date</div>;


//     if(inviteCodeLoading) return <div className='text-blue-600 text-center'>Extending The Specified User&lsquo;s Account Expiry Date</div>;

//         //   if (error) return <div className='text-red-600 text-center'>{error}</div>;
//         //   if (code) return <div>{code}</div>;

//   return (
//     <>
//         <h1>User Account Mangement Page</h1>
//         <div>
//           <form action="register" method='post'>
//               <label htmlFor="">
//                   Generate Invite Code For User Name ::
//                   <input onChange={handleChange} title='UserName' type="text" className='border-5 mx-auto' />
//                   <Button type='button' onClick={handlegenerateInvite}>Generate</Button>
//               </label>
//           </form>
//           {code && <h2 className='text-green-600 text-center'>{code}</h2>}
//           {error && <h2 className='text-red-600 text-center'>{error}</h2>}
//         </div>
//         <section className='flex flex-col items-center justify-center mx-[25%]'>
//               <label className='mt-10' htmlFor="email"> Enter Expired User&lsquo;s Account Email ::</label>
//               <input
//                   type='email'
//                   id='email'
//                   name='email'
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
//               <Button className='mt-10' onClick={async () => await handleExtendUserExpiryDate(email)}>Extend User Account Expiry Date</Button>
//               {message && <h1 className={`${status === "success" ? "text-green-600" : "text-red-600"} text-2xl text-center`}>{message}</h1>}
//         </section>
//     </>    
//   )
// }



"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Eye, EyeOff, Lock, Mail, User, Phone, Code, Check, AlertCircle, Loader2 } from "lucide-react"
import { useParams, usePathname ,useSearchParams } from "next/navigation"
import { useInviteCode } from "../../../hooks/useInviteCode"
import { useExtendUserExpiryDate } from "../../../hooks/useExtendUserExpiryDate"

type FormType = "login" | "register" | null | string
type MessageType = { type: "error" | "success" | "loading"; text: string } | null
type Language = "en" | "ar"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
}

const translations = {
  en: {
    loginTitle: "Extend User Account Exipry Date",
    registerTitle: "Generate A Registration Invitation Code For A New User Account",
    loginSubtitle: "Extend Account Validity By One Year",
    registerSubtitle: "This Will Be A One Time Use Invitation Code",
    email: "Email",
    password: "Password",
    name: "Full Name",
    phone: "Phone",
    invitationCode: "Invitation Code",
    verificationMethod: "Verification Method",
    loginButton: "Extend Expiry Date",
    registerButton: "Generate Invitation Code",
    createAccount: "Generate New User Account Invitation Code",
    forgotPassword: "Forgot password?",
    alreadyHaveAccount: "Extend A User's Account Expiry Date",
    emailRequired: "Email is required",
    invalidEmail: "Invalid email format",
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
    fixErrors: "Please Fix The Errors Below",
    authenticating: "Extending Account Expiry Date By One Year",
    loginSuccess: "Account Expiry Date Extension successful!",
    creatingAccount: "Generating Invitation Code...",
    accountCreated: "Invitation Code Generation successful!",
  },
  ar: {
    loginTitle: "تمديد صلاحية حساب المستخدم",
    registerTitle: "قم بتوليد رمز الدعوة لحساب المستخدم جديد",
    loginSubtitle: "مدد صلاحية حساب المستخدم بسنة واحدة",
    registerSubtitle: "سيكون هذا الرمز قابل للاستخدام مرة واحدة فقط",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    name: "الاسم الكامل",
    phone: "رقم الهاتف",
    invitationCode: "رمز الدعوة",
    verificationMethod: "طريقة التحقق",
    loginButton: "مدد صلاحية حساب",
    registerButton: "توليد رمز الدعوة",
    createAccount: "توليد رمز الدعوة لمستخدم جديد",
    forgotPassword: "نسيت كلمة المرور؟",
    alreadyHaveAccount: "تمديد صلاحية حساب المستخدم",
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
    fixErrors: "يرجى إصلاح الأخطاء أدناه",
    authenticating: "جاري تمديد صلاحية حساب المستخدم بعام اضافي...",
    loginSuccess: "تم تمديد صلاحية حساب المستخدم بنجاح !",
    creatingAccount: "جاري توليد رمز الدعوة لحساب المستخدم الجديد...",
    accountCreated: "تم توليد رمز الدعوة لحساب المستخدم بنجاح!",
  },
}

export default function NeuralNetworkAuth() {
  // const {L} = useParams()
  const searchParams = useSearchParams()
  const activeForm = searchParams.get("activeForm")
  // alert(activeForm)
  const pathname = usePathname()
  const [lang, setLang] = useState<Language>(pathname.includes("ar") ? "ar" : "en")
  const [formType, setFormType] = useState<FormType>(activeForm)
  // alert(formType)
  const [isTransitioning, setIsTransitioning] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<MessageType>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const densityIncreasedRef = useRef(false)

  const [loginData, setLoginData] = useState({ email: ""})
  const [registerData, setRegisterData] = useState({name: ""})

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeFields, setActiveFields] = useState<Set<string>>(new Set())

    const {generateInvite , inviteCodeLoading , inviteCodemessage , code} = useInviteCode()

    const {handleExtendUserExpiryDate , extendExpiryDateloading , extendExpiryDateMessage , status} = useExtendUserExpiryDate()

  const t = translations[lang]
  const isRTL = lang === "ar"

  useEffect(() => {
    // document.body.style.overflow = "hidden"
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = document.documentElement.scrollHeight

    // Initialize nodes once if not already done
    if (nodesRef.current.length === 0 || !densityIncreasedRef.current) {
      const nodes = []
      const count = window.innerWidth < 768 ? 100 : 200
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: [],
        })
      }
      nodesRef.current = nodes
      densityIncreasedRef.current = true
    }

    const nodes = nodesRef.current
    let animationId: number

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const hasActiveFields = activeFields.size > 0

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 20, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - node.x
          const dy = nodes[j].y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 200) {
            const opacity = 1 - dist / 200
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.3})`
            ctx.lineWidth = opacity
            ctx.stroke()
          }
        }

        let isActive = false
        if (hasActiveFields) {
          const dx = node.x - centerX
          const dy = node.y - centerY
          const distSquared = dx * dx + dy * dy // Use squared distance to avoid sqrt
          if (distSquared < 90000) isActive = true // 300 * 300 = 90000
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, isActive ? 3 : 2, 0, Math.PI * 2)
        ctx.fillStyle = isActive ? "rgba(34, 211, 238, 1)" : "rgba(100, 200, 255, 0.6)"
        ctx.fill()

        if (isActive) {
          ctx.shadowBlur = 10
          ctx.shadowColor = "rgba(34, 211, 238, 0.5)"
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [activeFields])

  const validateEmail = (email: string): string | null => {
    if (!email) return t.emailRequired
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return t.invalidEmail
    return null
  }

  const validateName = (name: string): string | null => {
    if (!name) return t.nameRequired
    if (name.length < 2) return t.nameLength
    // if (!/^[a-zA-Z\s]+$/.test(name)) return t.nameFormat
    if (!/^[a-zA-Z\s\u0600-\u06FF\u0750-\u077F\uFB50-\uFBC1\uFBD3-\uFD3F\uFD50-\uFD8F\uFD92-\uFDC7\uFE70-\uFEFC\uFDF0-\uFDFD]+$/.test(name)) return t.nameFormat
    return null
  }

  const switchForm = () => {
    setIsTransitioning(true)
    setMessage(null)
    setErrors({})
    setTimeout(() => {
      setFormType(formType === "login" ? "register" : "login")
      setIsTransitioning(false)
    }, 500)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const newErrors: Record<string, string> = {}
    const emailError = validateEmail(loginData.email)

    if (emailError) newErrors.email = emailError
    // if (passwordError) newErrors.password = passwordError

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setMessage({ type: "error", text: t.fixErrors })
      return
    }

    setMessage({ type: "loading", text: t.authenticating })

    const result = await handleExtendUserExpiryDate(loginData.email)

      if (result.success) {
      setMessage({ type: "success", text: t.loginSuccess })
        if(formType === "login"){
          setTimeout(() => {
              switchForm()
            }, 3000)
        }
        } else {
            setMessage({ type: "error", text: result.error })
        }
    // setTimeout(() => {
    //   setMessage({ type: "success", text: t.loginSuccess })
    // }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const newErrors: Record<string, string> = {}
    const nameError = validateName(registerData.name)

    if (nameError) newErrors.name = nameError
    // if (passwordError) newErrors.password = passwordError
    // if (phoneError) newErrors.phone = phoneError
    // if (codeError) newErrors.invitationCode = codeError

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setMessage({ type: "error", text: t.fixErrors })
      return
    }

    setMessage({ type: "loading", text: t.creatingAccount })

        const result = await generateInvite(registerData.name)

          if (result.success) {
      setMessage({ type: "success", text: t.accountCreated })
        if(formType === "register"){
          setTimeout(() => {
              switchForm()
            }, 3000)
        }
  } else {
      setMessage({ type: "error", text: result.error })
  }

    // setTimeout(() => {
    //   setMessage({ type: "success", text: t.accountCreated })
    // }, 1500)
  }

  const handleFieldFocus = (field: string) => {
    setActiveFields((prev) => new Set(prev).add(field))
  }

  const handleFieldBlur = (field: string) => {
    setActiveFields((prev) => {
      const newSet = new Set(prev)
      newSet.delete(field)
      return newSet
    })
  }

//   ueeff
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 z-0" dir={isRTL ? "rtl" : "ltr"}>

      <canvas ref={canvasRef} className="fixed pointer-events-none tops-42 z-0 inset-0 w-full h-full" />

      <div className="relative z-10 flex xxxs:min-h-screen items-center justify-center p-0">
        <div
          className={`w-full max-w-xl transform transition-all duration-300 ${isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
        >
          <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/90 xxxs:p-4 xxs:p-8 shadow-2xl backdrop-blur-md">
            <h2 className="mb-2 text-center text-2xl font-bold text-white">
              {formType === "login" ? t.loginTitle : t.registerTitle}
            </h2>
            <p className="mb-8 text-center text-sm text-slate-400">
              {formType === "login" ? t.loginSubtitle : t.registerSubtitle}
            </p>

            {message && (
              <div
                className={`mb-6 flex items-center gap-2 rounded-lg border p-4 animate-neural-pulse ${
                  message.type === "error"
                    ? "border-red-500/20 bg-red-500/10 text-red-400"
                    : message.type === "success"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      : "border-cyan-500/20 bg-cyan-500/10 text-cyan-400"
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
                  <label className="mb-2 block text-sm font-medium text-slate-300">{t.email}</label>
                  <div className="relative">
                    <Mail
                      className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500`}
                    />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      onFocus={() => handleFieldFocus("email")}
                      onBlur={() => handleFieldBlur("email")}
                      className={`w-full rounded-lg border ${
                        errors.email ? "border-red-500/50" : "border-slate-700"
                      } bg-slate-800/50 py-3 ${isRTL ? "pr-11 pl-4" : "pl-11 pr-4"} text-white placeholder-slate-500 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:shadow-lg focus:shadow-cyan-500/20`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                <button
                  type="submit"
                  className="hover:cursor-pointer font-black w-full rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 py-3 text-white shadow-lg shadow-cyan-500/30 transition-all hover:from-cyan-400 hover:to-blue-400 hover:shadow-xl hover:shadow-cyan-500/50 active:scale-95"
                >
                  {t.loginButton}
                </button>

                <div className="text-xl text-center">
                  <button
                    type="button"
                    onClick={switchForm}
                    className="text-cyan-400 transition-colors hover:cursor-pointer hover:text-cyan-300 hover:underline font-black"
                  >
                    {t.createAccount}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">{t.name}</label>
                  <div className="relative">
                    <User
                      className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500`}
                    />
                    <input
                      type="text"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      onFocus={() => handleFieldFocus("name")}
                      onBlur={() => handleFieldBlur("name")}
                      className={`w-full rounded-lg border ${
                        errors.name ? "border-red-500/50" : "border-slate-700"
                      } bg-slate-800/50 py-2.5 ${isRTL ? "pr-11 pl-4" : "pl-11 pr-4"} text-white placeholder-slate-500 transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:shadow-lg focus:shadow-cyan-500/20`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>
                <button
                  type="submit"
                  className="hover:cursor-pointer w-full rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:from-cyan-400 hover:to-blue-400 hover:shadow-xl hover:shadow-cyan-500/50 active:scale-95"
                >
                  {t.registerButton}
                </button>

                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={switchForm}
                    className="text-cyan-400 transition-colors hover:text-cyan-300 hover:underline hover:cursor-pointer font-black text-xl"
                  >
                    {t.alreadyHaveAccount}
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
