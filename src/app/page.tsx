
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Jobs", href: "/jobs" },
  { label: "MOM Resources", href: "/mom-resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const STATS = [
  { value: "5,000+", label: "Placements Made" },
  { value: "12+", label: "Years Experience" },
  { value: "98%", label: "Client Retention" },
  { value: "72hr", label: "Shortlist Turnaround" },
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide(s => (s + 1) % 3), 5000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    { img: "/hero2.png", tag: "For Candidates", title: "Your Next Career Move", sub: "Thousands of roles across Singapore and SEA." },
    { img: "/hero4.png", tag: "For Employers", title: "Hire Smarter. Move Faster.", sub: "MOM-licensed. ISO certified. 72-hour shortlist." },
    { img: "/hero3.png", tag: "Our Promise", title: "People First. Always.", sub: "Where human connection meets smart recruitment." },
  ];

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif" }} className="bg-[#020817] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#020817]/95 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
          <a href="/"><Image src="/dhc-logo.png" alt="DHC" width={130} height={44} className="h-10 w-auto object-contain brightness-0 invert" /></a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{l.label}</a>
            ))}
            <a href="mailto:career@dhc.com.sg" className="bg-[#0071ba] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-[#005a96] transition-all hover:shadow-lg hover:shadow-[#0071ba]/30 hover:-translate-y-0.5">Hire Talent</a>
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
              className="md:hidden bg-[#020817]/98 border-t border-white/10 px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((l) => <a key={l.label} href={l.href} className="text-gray-300 font-medium py-1">{l.label}</a>)}
              <a href="/contact" className="bg-[#0071ba] text-white text-center font-bold px-5 py-3 rounded-full">Hire Talent</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SLIDESHOW */}
      <section className="relative h-screen overflow-hidden">
        {/* Slides */}
        {slides.map((slide, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === activeSlide ? "opacity-100" : "opacity-0"}`}>
            <Image src={slide.img} alt={slide.title} fill className="object-cover object-center" priority={i === 0} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/90 via-[#020817]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <AnimatePresence mode="wait">
              <motion.div key={activeSlide} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.6 }}
                className="max-w-2xl">
                <div className="inline-flex items-center gap-2 border border-[#0071ba]/50 bg-[#0071ba]/15 text-[#6798d0] text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0071ba] animate-ping" />
                  {slides[activeSlide].tag}
                </div>
                <h1 style={{ fontFamily: "'Syne', sans-serif" }} className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6 max-w-lg">
                  {slides[activeSlide].title}
                </h1>
                <p className="text-gray-300 text-xl mb-10 leading-relaxed">{slides[activeSlide].sub}</p>
                <div className="flex flex-wrap gap-4">
                  <a href="https://www.mycareersfuture.gov.sg/search?search=dynamic+human+capital&sortBy=new_posting_date" target="_blank" rel="noopener noreferrer"
                    className="group bg-[#0071ba] text-white font-bold px-8 py-4 rounded-full hover:bg-[#005a96] transition-all hover:shadow-2xl hover:shadow-[#0071ba]/40 hover:-translate-y-1 flex items-center gap-2">
                    Find Jobs <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                  <a href="/contact" className="group border border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all hover:-translate-y-1 flex items-center gap-2">
                    Hire Talent <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide indicators */}
            <div className="absolute bottom-12 left-6 flex gap-3">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setActiveSlide(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${i === activeSlide ? "w-10 bg-[#0071ba]" : "w-4 bg-white/30"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Credentials strip */}
        <div className="absolute bottom-12 right-6 z-10 flex flex-col gap-2 hidden md:flex">
          {["MOM Licensed", "ISO Certified", "CPF Registered", "TAFEP Compliant"].map((c) => (
            <span key={c} className="text-xs font-bold text-gray-400 border border-white/10 px-3 py-1 rounded-full text-right backdrop-blur-sm bg-black/20">✓ {c}</span>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="relative bg-[#0071ba] py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#005a96] via-[#0071ba] to-[#005a96]" />
        <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div style={{ fontFamily: "'Syne', sans-serif" }} className="text-4xl md:text-5xl font-black text-white mb-1">{s.value}</div>
              <div className="text-xs font-bold text-blue-200 tracking-widest uppercase">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-24 bg-[#020817] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0071ba]/10 rounded-full blur-[100px]" />
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-xs font-bold text-[#6798d0] tracking-widest uppercase mb-3 block">Two Audiences. One Partner.</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-4xl md:text-5xl font-black text-white">Who We Serve</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Candidates */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-white/8 hover:border-[#0071ba]/40 transition-all duration-500 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image src="/hero2.png" alt="For Candidates" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/40 to-transparent" />
              </div>
              <div className="p-8 bg-[#0a1628]">
                <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-2xl font-black text-white mb-2">For Candidates</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">Explore thousands of roles across Singapore and SEA. Your next career move starts here.</p>
                <div className="flex flex-col gap-3">
                  <a href="https://www.mycareersfuture.gov.sg/search?search=dynamic+human+capital&sortBy=new_posting_date" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between bg-[#0071ba] text-white font-bold px-5 py-3.5 rounded-xl hover:bg-[#005a96] transition-colors">
                    <span>Search MyCareersFuture</span><span>→</span>
                  </a>
                  <a href="https://www.jobstreet.com.sg/jobs?q=Dynamic+Human+Capital&sortmode=ListedDate" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between border border-white/15 text-white font-bold px-5 py-3.5 rounded-xl hover:bg-white/5 transition-colors">
                    <span>Browse JobStreet</span><span>→</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Employers */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="group relative overflow-hidden rounded-3xl border border-white/8 hover:border-[#0071ba]/40 transition-all duration-500 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image src="/hero3.png" alt="For Employers" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/40 to-transparent" />
              </div>
              <div className="p-8 bg-[#0a1628]">
                <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-2xl font-black text-white mb-2">For Employers</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">Access Singapore&apos;s best talent in 72 hours. MOM-licensed. ISO certified. Trusted by 200+ companies.</p>
                <a href="/contact" className="flex items-center justify-between bg-white text-[#020817] font-black px-5 py-3.5 rounded-xl hover:bg-gray-100 transition-colors">
                  <span>Talk to a Consultant</span><span>→</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TEAM PHOTO SECTION */}
      <section className="py-24 bg-[#030d1a] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-bold text-[#6798d0] tracking-widest uppercase mb-4 block">Our Team</span>
              <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">People-First. Always.</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">Behind every successful placement is a dedicated DHC consultant who genuinely cares. We&apos;ve been building careers and teams across Singapore since 2012.</p>
              <div className="flex flex-wrap gap-3">
                {["🇸🇬 Singapore", "🇲🇾 Malaysia", "🇮🇩 Indonesia", "🇹🇭 Thailand", "🇻🇳 Vietnam"].map((c) => (
                  <span key={c} className="border border-[#0071ba]/30 bg-[#0071ba]/10 text-[#6798d0] text-sm font-semibold px-4 py-2 rounded-full">{c}</span>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-[#0071ba]/10">
              <Image src="/hero1.png" alt="DHC Team" width={700} height={500} className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span style={{ fontFamily: "'Syne', sans-serif" }} className="text-white font-black text-lg">The DHC Team</span>
                <p className="text-gray-300 text-sm">Singapore &amp; Southeast Asia</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-[#020817] relative">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,113,186,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,186,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <span className="text-xs font-bold text-[#6798d0] tracking-widest uppercase mb-3 block">What We Do</span>
            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-4xl md:text-5xl font-black text-white mb-4">Our Services</h2>
            <p className="text-gray-500 text-lg max-w-xl">Full-spectrum HR solutions for Singapore&apos;s most ambitious organisations.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group p-8 rounded-2xl border border-white/5 hover:border-[#0071ba]/40 hover:bg-[#0071ba]/5 transition-all duration-300 hover:-translate-y-1 cursor-default">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{s.icon}</span>
                  {s.tag && <span className="text-xs font-bold text-[#0071ba] border border-[#0071ba]/30 bg-[#0071ba]/10 px-2 py-1 rounded-full">{s.tag}</span>}
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif" }} className="text-lg font-black text-white mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="text-xs text-[#6798d0] font-bold group-hover:text-white transition-colors">Learn more →</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <a href="/services" className="inline-flex items-center gap-2 text-[#6798d0] font-bold hover:text-white transition-colors hover:gap-3 duration-200">View all services →</a>
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="py-16 bg-[#030d1a] overflow-hidden border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
          <p className="text-xs font-bold text-gray-600 tracking-widest uppercase">Trusted by Singapore&apos;s Leading Organisations</p>
        </div>
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <div key={i} className="inline-flex items-center justify-center border border-white/8 rounded-xl px-8 py-4 text-sm font-bold text-gray-500 min-w-[200px] shrink-0 hover:text-gray-300 hover:border-white/20 transition-colors">{c}</div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero2.png" alt="CTA Background" fill className="object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#020817]/80 to-[#020817]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-transparent to-[#020817]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Ready to hire<br />
              <span className="bg-gradient-to-r from-[#6798d0] via-white to-[#0071ba] bg-clip-text text-transparent">smarter?</span>
            </h2>
            <p className="text-gray-400 text-xl mb-12">72-hour shortlist. MOM-compliant. Zero fuss. Our consultants are ready.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:career@dhc.com.sg" className="bg-[#0071ba] text-white font-black px-12 py-4 rounded-full hover:bg-[#005a96] transition-all hover:-translate-y-1 shadow-2xl shadow-[#0071ba]/30 text-lg">Get in Touch</a>
              <a href="tel:+6560500777" className="border border-white/20 text-white font-bold px-12 py-4 rounded-full hover:bg-white/5 transition-all hover:-translate-y-1 text-lg">+65 6050 0777</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#010810] border-t border-white/5 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <Image src="/dhc-logo.png" alt="DHC" width={130} height={44} className="h-10 w-auto object-contain brightness-0 invert mb-5" />
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-4">Singapore&apos;s trusted MOM-licensed recruitment partner since 2012. Part of Elitez Group.</p>
              <span className="text-xs text-gray-700 border border-white/5 px-3 py-1 rounded-full">EA License: 12C5492</span>
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
                <a href="tel:+6560500777" className="hover:text-white transition-colors mt-1">+65 6050 0777</a>
                <a href="mailto:info@dhc.com.sg" className="hover:text-white transition-colors">info@dhc.com.sg</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-700 text-xs">© 2025 Dynamic Human Capital Pte Ltd. All rights reserved. · <a href="https://dhc.com.sg/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-400 transition-colors">Privacy Policy</a></p>
            <p className="text-gray-700 text-xs">Part of <a href="https://elitez.asia" target="_blank" rel="noopener noreferrer" className="text-[#6798d0]/60 hover:text-[#6798d0] transition-colors">Elitez Group</a></p>
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
