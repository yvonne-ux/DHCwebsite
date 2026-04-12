
"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Services", href: "/DHCwebsite/services" },
  { label: "Jobs", href: "/DHCwebsite/jobs" },
  { label: "MOM Resources", href: "/DHCwebsite/mom-resources" },
  { label: "About", href: "/DHCwebsite/about" },
  { label: "Contact", href: "/DHCwebsite/contact" },
];

const STATS = [
  { value: 5000, suffix: "+", label: "Placements Made" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 72, suffix: "hr", label: "Shortlist Turnaround" },
];

const SERVICES = [
  { icon: "🎯", title: "Permanent Recruitment", desc: "End-to-end talent acquisition. Executive to entry-level, every industry.", tag: "Most Popular" },
  { icon: "⚡", title: "Temporary & Contract", desc: "Agile workforce solutions. Scale fast, stay compliant.", tag: "" },
  { icon: "💼", title: "Payroll Outsourcing", desc: "CPF, IR8A, MOM compliance — fully managed.", tag: "" },
  { icon: "🔄", title: "Business Process Outsourcing", desc: "Offload HR admin. Focus on what moves the needle.", tag: "" },
  { icon: "🌏", title: "Employer of Record", desc: "Hire across SEA without a local entity. We handle everything.", tag: "New" },
  { icon: "🚀", title: "Workforce Transformation", desc: "Up to 70% govt funding for Job Redesign+. Future-proof your team.", tag: "70% Funded" },
];

const CLIENTS = ["Unilever", "Nestlé", "Shopee", "CPF Board", "Tan Tock Seng Hospital", "DBS Bank", "Singtel", "NTUC", "Ministry of Education", "ST Engineering"];

const TESTIMONIALS = [
  { quote: "DHC delivered 3 shortlisted candidates within 48 hours. Exceptional speed and quality.", name: "HR Director", company: "Fortune 500 FMCG Company" },
  { quote: "Their consultants truly understand our industry. Every placement has been spot on.", name: "Talent Acquisition Lead", company: "Leading Singapore Bank" },
  { quote: "DHC has been our go-to recruitment partner for 5 years. Reliable, professional, results-driven.", name: "CEO", company: "Regional Tech Company" },
];

const ROLES = ["Permanent Recruitment", "Contract Staffing", "Payroll Outsourcing", "Executive Search", "Workforce Transformation", "Employer of Record"];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[index];
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      return () => clearTimeout(t);
    } else if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      return () => clearTimeout(t);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % ROLES.length);
    }
  }, [displayed, deleting, index]);

  return (
    <span className="text-[#0071ba]">
      {displayed}<span className="animate-pulse">|</span>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveSlide(s => (s + 1) % 3), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(s => (s + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const slides = [
    { img: "/DHCwebsite/hero2.png", label: "For Candidates", title: "Your Next Career Move", sub: "Thousands of roles across Singapore & SEA." },
    { img: "/DHCwebsite/hero4.png", label: "For Employers", title: "Hire Smarter. Move Faster.", sub: "MOM-licensed. ISO certified. 72-hour shortlist." },
    { img: "/DHCwebsite/hero3.png", label: "Our Promise", title: "People First. Always.", sub: "Where human connection meets smart recruitment." },
  ];

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", cursor: "none" }} className="bg-[#020817] text-white overflow-x-hidden">

      {/* CUSTOM CURSOR */}
      <div className="fixed z-[9999] pointer-events-none" style={{ left: cursor.x - 12, top: cursor.y - 12, transition: "left 0.05s, top 0.05s" }}>
        <div className="w-6 h-6 rounded-full border-2 border-[#0071ba] opacity-80" />
      </div>
      <div className="fixed z-[9998] pointer-events-none" style={{ left: cursor.x - 4, top: cursor.y - 4 }}>
        <div className="w-2 h-2 rounded-full bg-[#0071ba]" />
      </div>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#020817]/95 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
          <a href="/DHCwebsite/" className="flex flex-col"><Image src="/DHCwebsite/dhc-logo.png" alt="DHC" width={130} height={44} className="h-10 w-auto object-contain brightness-0 invert" /><span className="text-[9px] text-[#6798d0] font-semibold tracking-[0.15em] uppercase mt-0.5 hidden md:block">Connecting Talents, Driving Dreams</span></a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200">{l.label}</a>
            ))}
            <a href="https://forms.gle/dMc28vTtxo2A1KhQ7" className="bg-[#0071ba] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-[#005a96] transition-all hover:shadow-lg hover:shadow-[#0071ba]/30 hover:-translate-y-0.5">Hire Talent</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 flex flex-col gap-1.5">
            <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-6 h-0.5 bg-white ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-[#020817] border-t border-white/10 px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((l) => <a key={l.label} href={l.href} className="text-gray-300 font-medium py-1">{l.label}</a>)}
              <a href="https://forms.gle/dMc28vTtxo2A1KhQ7" className="bg-[#0071ba] text-white text-center font-bold px-5 py-3 rounded-full">Hire Talent</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        {slides.map((slide, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === activeSlide ? "opacity-100" : "opacity-0"}`}>
            <Image src={slide.img} alt={slide.title} fill className="object-cover object-center scale-105" priority={i === 0} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/95 via-[#020817]/60 to-[#020817]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent" />
          </div>
        ))}

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#0071ba]/15 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <AnimatePresence mode="wait">
              <motion.div key={activeSlide} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.7 }} className="max-w-xl">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 border border-[#0071ba]/40 bg-[#0071ba]/10 text-[#6798d0] text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0071ba] animate-ping" />
                  {slides[activeSlide].label}
                </motion.div>
                <h1 style={{ fontFamily: "'Syne', sans-serif" }} className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-2">
                  {slides[activeSlide].title}
                </h1>
                <p className="text-gray-300 text-lg mb-1 leading-relaxed">{slides[activeSlide].sub}</p>
                <p className="text-[#6798d0] text-xs font-bold tracking-[0.2em] uppercase mb-3">Connecting Talents, Driving Dreams</p>
                <p style={{ fontFamily: "'Syne', sans-serif" }} className="text-xl font-bold mb-8 h-8">
                  <TypewriterText />
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="https://www.mycareersfuture.gov.sg/search?search=dynamic+human+capital&sortBy=new_posting_date" target="_blank" rel="noopener noreferrer"
                    className="group bg-[#0071ba] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#005a96] transition-all hover:shadow-2xl hover:shadow-[#0071ba]/40 hover:-translate-y-1 flex items-center gap-2 text-sm">
                    Find Jobs <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                  <a href="mailto:career@dhc.com.sg"
                    className="group border border-white/20 text-white font-bold px-7 py-3.5 rounded-full hover:bg-white/10 transition-all hover:-translate-y-1 flex items-center gap-2 text-sm">
                    Hire Talent <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-10 left-6 flex gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setActiveSlide(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${i === activeSlide ? "w-10 bg-[#0071ba]" : "w-4 bg-white/20"}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-6 hidden md:flex flex-col gap-2">
          {["MOM Licensed", "ISO Certified", "CPF Registered", "TAFEP Compliant"].map((c) => (
            <span key={c} className="text-xs font-bold text-gray-500 border border-white/8 px-3 py-1 rounded-full text-right backdrop-blur-sm">✓ {c}</span>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="relative bg-[#0071ba] py-14 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div style={{ fontFamily: "'Syne', sans-serif" }} className="text-4xl md:text-5xl font-black text-white mb-1">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs font-bold text-blue-200 tracking-widest uppercase">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SPLIT AUDIENCE */}
      <section className="py-24 bg-[#020817]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-bold text-[#6798d0] tracking-widest uppercase mb-3 block">Who We Serve</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-4xl md:text-5xl font-black text-white">Two Journeys. One Partner.</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-white/8 hover:border-[#0071ba]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0071ba]/10">
              <div className="relative h-64 overflow-hidden">
                <Image src="/DHCwebsite/hero4.png" alt="For Candidates" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/50 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#0071ba]/20 border border-[#0071ba]/40 text-[#6798d0] text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm tracking-widest">FOR CANDIDATES</div>
              </div>
              <div className="p-8 bg-[#0a1628]">
                <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-2xl font-black text-white mb-3">Find Your Dream Job</h3>
                <p className="text-gray-400 mb-6 leading-relaxed text-sm">Explore thousands of roles across Singapore and SEA. From fresh grad to C-suite — your next move starts here.</p>
                <div className="flex flex-col gap-3">
                  <a href="https://www.mycareersfuture.gov.sg/search?search=dynamic+human+capital&sortBy=new_posting_date" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between bg-[#0071ba] text-white font-bold px-5 py-3.5 rounded-xl hover:bg-[#005a96] transition-all group/btn hover:-translate-y-0.5">
                    <span className="text-sm">Search MyCareersFuture</span><span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </a>
                  <a href="https://www.jobstreet.com.sg/jobs?q=Dynamic+Human+Capital&sortmode=ListedDate" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between border border-white/15 text-white font-bold px-5 py-3.5 rounded-xl hover:bg-white/5 transition-all group/btn hover:-translate-y-0.5">
                    <span className="text-sm">Browse JobStreet</span><span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-white/8 hover:border-[#0071ba]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0071ba]/10">
              <div className="relative h-64 overflow-hidden">
                <Image src="/DHCwebsite/hero3.png" alt="For Employers" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/50 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#0071ba]/20 border border-[#0071ba]/40 text-[#6798d0] text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm tracking-widest">FOR EMPLOYERS</div>
              </div>
              <div className="p-8 bg-[#0a1628]">
                <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-2xl font-black text-white mb-3">Build Your Dream Team</h3>
                <p className="text-gray-400 mb-6 leading-relaxed text-sm">Access Singapore's best talent in 72 hours. MOM-licensed. ISO certified. Trusted by 200+ leading companies.</p>
                <a href="mailto:career@dhc.com.sg"
                  className="flex items-center justify-between bg-white text-[#020817] font-black px-5 py-3.5 rounded-xl hover:bg-gray-100 transition-all group/btn hover:-translate-y-0.5">
                  <span className="text-sm">Talk to a Consultant</span><span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-16 bg-[#030d1a] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0071ba]/6 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#6798d0]/5 rounded-full blur-[80px]" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(0,113,186,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,186,0.05) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-bold text-[#6798d0] tracking-widest uppercase mb-4 block">Est. 2012</span>
              <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">People-First.<br />Always.</h2>
              <p className="text-gray-400 text-base leading-relaxed mb-6">Behind every placement is a DHC consultant who genuinely cares. We've been building careers and teams across Singapore and Southeast Asia since 2012 — part of the Elitez Group with 9 offices across 5 SEA markets.</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["🇸🇬 Singapore", "🇲🇾 Malaysia", "🇮🇩 Indonesia", "🇹🇭 Thailand", "🇻🇳 Vietnam"].map((c) => (
                  <span key={c} className="border border-[#0071ba]/30 bg-[#0071ba]/10 text-[#6798d0] text-xs font-semibold px-4 py-2 rounded-full">{c}</span>
                ))}
              </div>
              <a href="/DHCwebsite/about" className="inline-flex items-center gap-2 text-[#6798d0] font-bold hover:text-white transition-colors hover:gap-3 duration-200 text-sm">
                Our Story →
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-[#0071ba]/10 group">
              <Image src="/DHCwebsite/hero1.png" alt="DHC Team" width={700} height={500} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div style={{ fontFamily: "'Syne', sans-serif" }} className="text-white font-black text-lg">The DHC Team</div>
                <p className="text-gray-300 text-sm">Singapore & Southeast Asia · 9 Offices · 5 Markets</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-[#020817] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,113,186,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,186,0.06) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0071ba]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#6798d0]/6 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <span className="text-xs font-bold text-[#6798d0] tracking-widest uppercase mb-3 block">What We Do</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-4xl md:text-5xl font-black text-white mb-4">Our Services</h2>
            <p className="text-gray-500 text-base max-w-xl">Full-spectrum HR solutions for Singapore's most ambitious organisations.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group relative p-8 rounded-2xl border border-white/5 hover:border-[#0071ba]/50 bg-white/1 hover:bg-[#0071ba]/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0071ba]/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0071ba]/0 group-hover:bg-[#0071ba]/10 rounded-full blur-2xl transition-all duration-500 -translate-y-8 translate-x-8" />
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{s.icon}</span>
                  {s.tag && <span className="text-xs font-bold text-[#0071ba] border border-[#0071ba]/30 bg-[#0071ba]/10 px-2 py-1 rounded-full">{s.tag}</span>}
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-lg font-black text-white mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="text-xs text-[#6798d0] font-bold group-hover:text-white transition-colors flex items-center gap-1">Learn more <span className="group-hover:translate-x-1 transition-transform inline-block">→</span></span>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <a href="/DHCwebsite/services" className="inline-flex items-center gap-2 text-[#6798d0] font-bold hover:text-white transition-colors hover:gap-3 duration-200">View all services →</a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-14 overflow-hidden">
        {/* Futuristic background */}
        <div className="absolute inset-0 bg-[#030d1a]">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,113,186,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,186,0.06) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(0,113,186,0.12) 0%, transparent 70%)" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-[#0071ba]/60 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-[#0071ba]/60 to-transparent" />
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute w-0.5 h-0.5 rounded-full bg-[#6798d0]/80 animate-ping"
              style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 30}%`, animationDelay: `${i * 0.4}s`, animationDuration: "3s" }} />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
            <span className="text-xs font-bold text-[#6798d0] tracking-widest uppercase mb-3 block">What Clients Say</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-3xl md:text-5xl font-black text-white">Trusted. Proven.<br/>Recommended.</h2>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
              className="relative bg-gradient-to-br from-[#0a1628]/90 to-[#020817]/90 border border-[#0071ba]/25 rounded-3xl p-10 mb-6 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#0071ba] to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0071ba]/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#6798d0]/8 rounded-full blur-xl" />
              <div className="relative z-10">
                <div className="text-4xl text-[#0071ba] mb-4 font-serif leading-none">"</div>
                <p className="text-gray-200 text-lg leading-relaxed mb-6 italic">{TESTIMONIALS[activeTestimonial].quote}</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-px bg-[#0071ba]/50" />
                  <div>
                    <div className="text-white font-bold text-sm">{TESTIMONIALS[activeTestimonial].name}</div>
                    <div className="text-[#6798d0] text-xs">{TESTIMONIALS[activeTestimonial].company}</div>
                  </div>
                  <div className="w-8 h-px bg-[#0071ba]/50" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeTestimonial ? "w-8 bg-[#0071ba]" : "w-4 bg-white/20"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="py-16 bg-[#020817] overflow-hidden border-y border-white/5">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold text-gray-600 tracking-widest uppercase">Trusted by Singapore's Leading Organisations</p>
        </div>
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <div key={i} className="inline-flex items-center justify-center border border-white/10 bg-white/3 rounded-xl px-8 py-4 text-sm font-bold text-gray-400 min-w-[200px] shrink-0 hover:text-white hover:border-[#0071ba]/50 hover:bg-[#0071ba]/10 transition-all duration-300">{c}</div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden bg-[#020817]">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,113,186,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,186,0.08) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,113,186,0.18) 0%, transparent 70%)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#0071ba]/15 blur-[100px] animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#6798d0]/10 blur-[80px] animate-pulse" style={{animationDelay:"1s"}} />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-[#0071ba]/10 blur-[60px] animate-pulse" style={{animationDelay:"2s"}} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0071ba]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0071ba]/60 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-bold text-[#6798d0] tracking-widest uppercase mb-6 block">Let's Work Together</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Ready to hire<br />
              <span className="bg-gradient-to-r from-[#6798d0] via-white to-[#0071ba] bg-clip-text text-transparent">smarter?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">72-hour shortlist. MOM-compliant. Zero fuss.</p>
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              {[["⚡","72hr","Shortlist"],["✅","MOM","Licensed"],["🌏","5","SEA Markets"],["⭐","98%","Retention"]].map(([icon,val,label]) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{icon}</span>
                  <span style={{ fontFamily: "'Syne', sans-serif" }} className="text-white font-black text-xl leading-none">{val}</span>
                  <span className="text-gray-500 text-xs tracking-widest uppercase">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://forms.gle/KYmBgNw5evS1Z7Ft8" className="group bg-[#0071ba] text-white font-black px-12 py-4 rounded-full hover:bg-[#005a96] transition-all hover:-translate-y-1 shadow-2xl shadow-[#0071ba]/40 text-base flex items-center gap-2 justify-center">
                Get in Touch <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a href="mailto:career@dhc.com.sg" className="border border-white/20 text-white font-bold px-12 py-4 rounded-full hover:bg-white/5 hover:border-white/40 transition-all hover:-translate-y-1 text-base">
                career@dhc.com.sg
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#010810] border-t border-white/5 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <Image src="/DHCwebsite/dhc-logo.png" alt="DHC" width={130} height={44} className="h-10 w-auto object-contain brightness-0 invert mb-5" />
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-4">Dynamic Human Capital — Singapore's trusted MOM-licensed recruitment partner since 2012. Part of Elitez Group.</p>
              <span className="text-xs text-gray-700 border border-white/5 px-3 py-1 rounded-full">EA License: 12C6253</span>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-5">Company</h4>
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((l) => <a key={l.label} href={l.href} className="text-gray-600 text-sm hover:text-white transition-colors">{l.label}</a>)}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-5">Contact</h4>
              <div className="flex flex-col gap-2 text-gray-600 text-sm">
                <p>2 Kallang Ave, CT Hub</p>
                <p>#03-08, Singapore 339407</p>
                <a href="mailto:career@dhc.com.sg" className="hover:text-white transition-colors mt-1">career@dhc.com.sg</a>
                <a href="mailto:info@dhc.com.sg" className="hover:text-white transition-colors">info@dhc.com.sg</a>
                <a href="mailto:career@dhc.com.sg" className="hover:text-white transition-colors">career@dhc.com.sg</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-700 text-xs">© 2025 Dynamic Human Capital Pte Ltd. All rights reserved. · EA Licence No: 12C6253</p>
            <div className="flex items-center gap-4">
              <a href="https://dhc.com.sg/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">Privacy Policy</a>
              <span className="text-gray-700 text-xs">Part of <a href="https://elitez.asia" target="_blank" rel="noopener noreferrer" className="text-[#6798d0]/60 hover:text-[#6798d0] transition-colors">Elitez Group</a></span>
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP */}
      <motion.a href="https://wa.me/6560500777" target="_blank" rel="noopener noreferrer"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30">
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </motion.a>
    </main>
  );
}
