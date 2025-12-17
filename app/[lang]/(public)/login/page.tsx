// "use client";

// import { useAuth } from "../../../context/AuthContext";
// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Button } from "../../../../src/components/ui/button";

// export default function LoginPage() {
//   const {user , login , error , loading} = useAuth();
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { lang } = useParams();

//   if(user){
//     router.push(`/${lang}/${user.role === "user" ? "submissions" : "dashboard"}`);
//   }
//   const handleLogin = async () => {
//     await login(email, password);
//   };
//   // const userMessage = apiError?.response?.data?.message || apiError?.message || 'An unknown error occurred.';


//   const handleForgotPassword = async ()=> {
//     router.push(`/${lang}/forgotPassword`);
//   }
    
//   return (
//     // <form action="" method="">
//     // </form>
//        <section>
//         <div className="p-6 max-w-md mx-auto">
//           <input onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Email" />
//           <input onChange={(e) => setPassword(e.target.value)} className="input" type="password" placeholder="Password" />
//           <Button onClick={handleLogin} className="btn-primary">Login</Button>
//           {error && <h2 className="text-red-600 text-center mt-24">{error}</h2>}
//           {loading && <div className="text-3xl text-blue-700">Logging You In...</div>}
//         </div>
//         <div className="flex justify-center items-center mt-4">
//           <p className="text-sm text-gray-600">Don&apos;t have an account?</p>
//           <Button onClick={() => router.push(`/${lang}/register`)} className="text-sm text-blue-600 hover:underline">Register</Button>
//         </div>
//         <div className="flex justify-center items-center mt-4">
//           <p className="text-sm text-gray-600">Forgot your password?</p>
//           <Button onClick={handleForgotPassword} className="text-sm text-blue-600 hover:underline">Reset Password</Button>
//         </div>
//       </section>
//   );
// }


"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Eye, EyeOff, Lock, Mail, User, Phone, Code, Check, AlertCircle, Loader2, LogIn, UserPlus } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
type FormType = "login" | "register"
type MessageType = { type: "error" | "success" | "loading"; text: string } | null

export default function SplitRealityAuth() {
  const pathname = usePathname()
  const [hoveredSide, setHoveredSide] = useState<FormType | null>(null)
  const [activeSide, setActiveSide] = useState<FormType | null>(null)
  // const [activeSide, setActiveSide] = useState<FormType | null>(pathname.includes("login") ? "login" : pathname.includes("register") ? "register" : null)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<MessageType>(null)
  const canvasLeftRef = useRef<HTMLCanvasElement>(null)
  const canvasRightRef = useRef<HTMLCanvasElement>(null)
  const lang = pathname.includes("ar") ? "ar" : "en"
  // alert(lang)
  const isRTL = lang === "ar"
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
    invitationCode: "",
  })
  const t = {
    en: {
      login: "Login",
      register: "Register",
      accessAccount: "Access your account",
      createAccount: "Create new account",
      welcomeBack: "Welcome Back",
      enterCredentials: "Enter your credentials to continue",
      createAccountTitle: "Create Account",
      fillDetails: "Fill in your details to get started",
      email: "Email",
      password: "Password",
      phone: "Phone",
      fullName: "Full Name",
      invitationCode: "Invitation Code",
      verificationMethod: "Verification Method (Email)",
      backToSelection: "Back to selection",
      forgotPassword: "Forgot password?",
      loginButton: "Login",
      registerButton: "Register",
      createAccountLink: "Create account",
      authenticating: "Authenticating...",
      loginSuccess: "Login successful!",
      creatingAccount: "Creating your account...",
      accountCreated: "Account created successfully!",
      fixErrors: "Please fix the errors above",
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
      nameLetters: "Name can only contain letters and spaces",
      codeRequired: "Invitation code is required",
      codeLength: "Invitation code must be at least 6 characters",
    },
    ar: {
      login: "تسجيل الدخول",
      register: "التسجيل",
      accessAccount: "الوصول إلى حسابك",
      createAccount: "إنشاء حساب جديد",
      welcomeBack: "مرحباً بعودتك",
      enterCredentials: "أدخل بيانات الاعتماد للمتابعة",
      createAccountTitle: "إنشاء حساب",
      fillDetails: "املأ التفاصيل للبدء",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      phone: "الهاتف",
      fullName: "الاسم الكامل",
      invitationCode: "رمز الدعوة",
      verificationMethod: "طريقة التحقق (البريد الإلكتروني)",
      backToSelection: "العودة للاختيار",
      forgotPassword: "نسيت كلمة المرور؟",
      loginButton: "تسجيل الدخول",
      registerButton: "تسجيل",
      createAccountLink: "إنشاء حساب",
      authenticating: "جاري المصادقة...",
      loginSuccess: "تم تسجيل الدخول بنجاح!",
      creatingAccount: "جاري إنشاء حسابك...",
      accountCreated: "تم إنشاء الحساب بنجاح!",
      fixErrors: "يرجى إصلاح الأخطاء أعلاه",
      emailRequired: "البريد الإلكتروني مطلوب",
      invalidEmail: "تنسيق البريد الإلكتروني غير صالح",
      passwordRequired: "كلمة المرور مطلوبة",
      passwordLength: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
      passwordUppercase: "يجب أن تحتوي كلمة المرور على حرف كبير",
      passwordLowercase: "يجب أن تحتوي كلمة المرور على حرف صغير",
      passwordNumber: "يجب أن تحتوي كلمة المرور على رقم",
      passwordSpecial: "يجب أن تحتوي كلمة المرور على رمز خاص",
      phoneRequired: "رقم الهاتف مطلوب",
      invalidPhone: "تنسيق رقم الهاتف غير صالح",
      nameRequired: "الاسم مطلوب",
      nameLength: "يجب أن يكون الاسم حرفين على الأقل",
      nameLetters: "يمكن أن يحتوي الاسم على أحرف ومسافات فقط",
      codeRequired: "رمز الدعوة مطلوب",
      codeLength: "يجب أن يكون رمز الدعوة 6 أحرف على الأقل",
    },
  }
  const currentLang = t[lang]

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Dual particle systems
  useEffect(() => {
    const canvasLeft = canvasLeftRef.current
    const canvasRight = canvasRightRef.current
    if (!canvasLeft || !canvasRight) return

    const ctxLeft = canvasLeft.getContext("2d")
    const ctxRight = canvasRight.getContext("2d")
    if (!ctxLeft || !ctxRight) return

    const resize = () => {
      canvasLeft.width = window.innerWidth
      // canvasLeft.height = window.innerHeight
      canvasLeft.height = 1500
      canvasRight.width = window.innerWidth
      // canvasRight.height = window.innerHeight
      canvasRight.height = 1500
    }
    resize()
    window.addEventListener("resize", resize)

    const createParticles = (count: number, hueRange: [number, number]) => {
      return Array.from({ length: count }, () => ({
        x: (Math.random() * window.innerWidth) / 2,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        hue: hueRange[0] + Math.random() * (hueRange[1] - hueRange[0]),
      }))
    }

    // const leftParticles = createParticles(80, [200, 240])
    // const rightParticles = createParticles(80, [140, 180])
    const leftParticles = createParticles((window.innerWidth * 0.1), [200, 240])
    const rightParticles = createParticles((window.innerWidth * 0.1), [140, 180])

    const animateParticles = (
      ctx: CanvasRenderingContext2D,
      particles: typeof leftParticles,
      width: number,
      height: number,
    ) => {
      ctx.fillStyle = "rgba(10, 10, 20, 0.1)"
      ctx.fillRect(0, 0, width, height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, 0.6)`
        ctx.fill()
      })
    }

    const animate = () => {
      animateParticles(ctxLeft, leftParticles, canvasLeft.width, canvasLeft.height)
      animateParticles(ctxRight, rightParticles, canvasRight.width, canvasRight.height)
      requestAnimationFrame(animate)
    }

    animate()

    return () => window.removeEventListener("resize", resize)
  }, [])

  const validateEmail = (email: string): string | null => {
    if (!email) return currentLang.emailRequired
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return currentLang.invalidEmail
    return null
  }

  const validatePassword = (password: string): string | null => {
    if (!password) return currentLang.passwordRequired
    if (password.length < 8) return currentLang.passwordLength
    if (!/[A-Z]/.test(password)) return currentLang.passwordUppercase
    if (!/[a-z]/.test(password)) return currentLang.passwordLowercase
    if (!/[0-9]/.test(password)) return currentLang.passwordNumber
    if (!/[!@#$%^&*]/.test(password)) return currentLang.passwordSpecial
    return null
  }

  const validatePhone = (phone: string): string | null => {
    if (!phone) return currentLang.phoneRequired
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
    if (!phoneRegex.test(phone)) return currentLang.invalidPhone
    return null
  }

  const validateName = (name: string): string | null => {
    if (!name) return currentLang.nameRequired
    if (name.length < 2) return currentLang.nameLength
    if (!/^[a-zA-Z\s]+$/.test(name)) return currentLang.nameLetters
    return null
  }

  const validateInvitationCode = (code: string): string | null => {
    if (!code) return currentLang.codeRequired
    if (code.length < 6) return currentLang.codeLength
    return null
  }

  // useEffect(() => {
  //   setMessage(null)
  //   setErrors({})
  // }, [activeSide])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const newErrors: Record<string, string> = {}
    const emailError = validateEmail(loginData.email)
    const passwordError = validatePassword(loginData.password)

    if (emailError) newErrors.email = emailError
    if (passwordError) newErrors.password = passwordError

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setMessage({ type: "error", text: currentLang.fixErrors })
      return
    }
    setMessage({ type: "loading", text: currentLang.authenticating })
    setTimeout(() => {
      setMessage({ type: "success", text: currentLang.loginSuccess })
    }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const newErrors: Record<string, string> = {}
    const emailError = validateEmail(registerData.email)
    const passwordError = validatePassword(registerData.password)
    const phoneError = validatePhone(registerData.phone)
    const nameError = validateName(registerData.name)
    const codeError = validateInvitationCode(registerData.invitationCode)

    if (emailError) newErrors.email = emailError
    if (passwordError) newErrors.password = passwordError
    if (phoneError) newErrors.phone = phoneError
    if (nameError) newErrors.name = nameError
    if (codeError) newErrors.invitationCode = codeError

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setMessage({ type: "error", text: currentLang.fixErrors })
      return
    }

    setMessage({ type: "loading", text: currentLang.creatingAccount })
    setTimeout(() => {
      setMessage({ type: "success", text: currentLang.accountCreated })
    }, 1500)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="relative flex min-h-screen">
        {/* Login Side */}
        <div
          className={`relative flex items-center justify-center transition-all duration-700 ${
            activeSide === "register" ? "w-0 opacity-0" : activeSide === "login" ? "w-full" : "w-1/2"
          }`}
          onMouseEnter={() => !activeSide && setHoveredSide("login")}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={(() => {
            (!activeSide) && setActiveSide("login")
            setMessage(null)
            setErrors({})}
          )}
        >
          <canvas ref={canvasLeftRef} className="absolute inset-0" />

          {!activeSide && (
            <div className="relative z-10 cursor-pointer text-center transition-all duration-300 hover:bg-cyan-300/10 rounded-lg p-4 xxxs:max-w-[125px] xxs:min-w-max">
              <LogIn className="mx-auto mb-4 xxs:h-16 xxxs:h-12 xxs:w-16 xxxs:w-12 text-blue-400" />
              <h2 className="xxs:text-3xl xxxs:text-xl font-bold text-white">{currentLang.login}</h2>
              <p className="mt-2 text-slate-400">{currentLang.accessAccount}</p>
            </div>
          )}

          {activeSide === "login" && (
            <div className="relative z-10 w-full max-w-md p-8">
              <button onClick={(() => {
            setActiveSide(null)
            setMessage(null)
            setErrors({})}
          )} className="mb-6 text-sm text-blue-400 hover:text-blue-300">
              {currentLang.backToSelection}  ←
              </button>

              <h2 className="mb-2 text-3xl font-bold text-white">{currentLang.welcomeBack}</h2>
              <p className="mb-8 text-sm text-slate-400">{currentLang.enterCredentials}</p>

              {message && (
                <div
                  className={`mb-6 flex items-center gap-2 rounded-lg border p-4 ${
                    message.type === "error"
                      ? "border-red-500/20 bg-red-500/10 text-red-400"
                      : message.type === "success"
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border-blue-500/20 bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {message.type === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {message.type === "error" && <AlertCircle className="h-4 w-4" />}
                  {message.type === "success" && <Check className="h-4 w-4" />}
                  <span className="text-sm">{message.text}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">{currentLang.email}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.email ? "border-red-500/50" : "border-slate-700"
                      } bg-slate-800/50 py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">{currentLang.password}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.password ? "border-red-500/50" : "border-slate-700"
                      } bg-slate-800/50 py-3 pl-11 pr-12 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-all hover:scale-110 hover:text-blue-400"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white transition-all hover:from-blue-500 hover:to-cyan-400 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95"
                >
                  {currentLang.loginButton}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"

                    onClick={(() => {
                      setActiveSide("register")
                      setMessage(null)
                      setErrors({})}
                    )}
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    {currentLang.createAccountLink}
                  </button>
                  <Link href={`/${lang}/forgotPassword`}>
                    <button type="button" className="text-slate-400 hover:text-slate-300 hover:underline">
                      {currentLang.forgotPassword}
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Divider Line */}
        {!activeSide && (
          <div className="absolute left-1/2 top-0 z-20 h-full w-1 -translate-x-1/2 bg-linear-to-b from-blue-500 via-purple-500 to-emerald-500 shadow-lg shadow-purple-500/50" />
        )}

        {/* Register Side */}
        <div
          className={`relative flex items-center justify-center transition-all duration-700 ${
            activeSide === "login" ? "w-0 opacity-0" : activeSide === "register" ? "w-full" : "w-1/2"
          }`}
          onMouseEnter={() => !activeSide && setHoveredSide("register")}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={(() => {
            (!activeSide) && setActiveSide("register")
            setMessage(null)
            setErrors({})}
          )}
        >
          <canvas ref={canvasRightRef} className="absolute inset-0" />

          {!activeSide && (
            <div className="relative z-10 cursor-pointer text-center transition-all duration-300 hover:bg-green-300/10 rounded-lg p-4 xxxs:max-w-[125px] xxs:min-w-max">
              <UserPlus className="mx-auto mb-4 xxxs:h-12 xxs:h-16 xxxs:w-12 xxs:w-16 text-emerald-400" />
              <h2 className="xxxs:text-xl xxs:text-3xl font-bold text-white">{currentLang.register}</h2>
              <p className="mt-2 text-slate-400">{currentLang.createAccount}</p>
            </div>
          )}

          {activeSide === "register" && (
            <div className="relative z-10 w-full max-w-md xs:px-8 xxxs:px-4 py-24">
              <button
              onClick={(() => {
                setActiveSide(null)
                setMessage(null)
                setErrors({})}
              )}                
                className="mb-6 text-sm text-emerald-400 hover:text-emerald-300"
              >
                {currentLang.backToSelection} ←
              </button>

              <h2 className="mb-2 text-3xl font-bold text-white">{currentLang.createAccountTitle}</h2>
              <p className="mb-8 text-sm text-slate-400">{currentLang.fillDetails}</p>

              {message && (
                <div
                  className={`mb-6 flex items-center gap-2 rounded-lg border p-4 ${
                    message.type === "error"
                      ? "border-red-500/20 bg-red-500/10 text-red-400"
                      : message.type === "success"
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {message.type === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {message.type === "error" && <AlertCircle className="h-4 w-4" />}
                  {message.type === "success" && <Check className="h-4 w-4" />}
                  <span className="text-sm">{message.text}</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">{currentLang.fullName}</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.name ? "border-red-500/50" : "border-slate-700"
                      } bg-slate-800/50 py-2.5 pl-11 pr-4 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">{currentLang.email}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.email ? "border-red-500/50" : "border-slate-700"
                      } bg-slate-800/50 py-2.5 pl-11 pr-4 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">{currentLang.phone}</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <input
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.phone ? "border-red-500/50" : "border-slate-700"
                      } bg-slate-800/50 py-2.5 pl-11 pr-4 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">{currentLang.password}</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.password ? "border-red-500/50" : "border-slate-700"
                      } bg-slate-800/50 py-2.5 pl-11 pr-12 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-all hover:scale-110 hover:text-emerald-400"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">{currentLang.invitationCode}</label>
                  <div className="relative">
                    <Code className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={registerData.invitationCode}
                      onChange={(e) => setRegisterData({ ...registerData, invitationCode: e.target.value })}
                      className={`w-full rounded-lg border ${
                        errors.invitationCode ? "border-red-500/50" : "border-slate-700"
                      } bg-slate-800/50 py-2.5 pl-11 pr-4 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20`}
                      placeholder="ABC123XYZ"
                    />
                  </div>
                  {errors.invitationCode && <p className="mt-1 text-xs text-red-400">{errors.invitationCode}</p>}
                </div>

                <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-2.5">
                  <p className="text-md text-slate-400">
                    <span className="font-medium text-slate-300">{currentLang.verificationMethod}</span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 py-3 font-semibold text-white transition-all hover:from-emerald-500 hover:to-teal-400 hover:shadow-lg hover:shadow-emerald-500/50 active:scale-95"
                >
                  {currentLang.registerButton}
                </button>

                <div className="text-center text-2xl">
                  <button
                    type="button"
                    onClick={(() => {
                      setActiveSide("login")
                      setMessage(null)
                      setErrors({})}
                    )}
                    className="text-emerald-400 hover:text-emerald-300 hover:underline"
                  >
                    {currentLang.login}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
