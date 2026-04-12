export default function About() {
  return (
    <main style={{fontFamily:"'DM Sans',sans-serif"}} className="bg-[#020817] text-white min-h-screen">
      <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(0,113,186,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,113,186,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px"}} />
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20 relative z-10">
        <a href="/" className="text-[#6798d0] text-sm hover:text-white transition-colors mb-8 block">← Back to Home</a>
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="text-xs font-bold text-[#6798d0] tracking-widest uppercase mb-3 block">Est. 2012</span>
            <h1 style={{fontFamily:"'Syne',sans-serif"}} className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">Connecting Talents,<br/>Driving Dreams</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">Dynamic Human Capital (DHC) is a MOM-licensed Singapore recruitment agency established in 2012. We are part of Elitez Group — one of Southeast Asia's leading HR conglomerates with 9 offices across 5 markets.</p>
            <p className="text-gray-400 leading-relaxed">From permanent placement to workforce transformation, we connect Singapore's top organisations with exceptional talent. Our consultants are industry specialists who deliver quality, speed, and compliance — every time.</p>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-white/10">
            <img src="/hero1.png" alt="DHC Team" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div style={{fontFamily:"'Syne',sans-serif"}} className="text-white font-black text-lg">The DHC Team</div>
              <p className="text-gray-300 text-sm">Singapore & Southeast Asia</p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {[["5,000+","Placements Made"],["12+","Years Experience"],["98%","Client Retention"],["72hr","Shortlist Turnaround"]].map(([val,label]) => (
            <div key={label} className="text-center p-6 rounded-2xl border border-white/8 bg-white/2">
              <div style={{fontFamily:"'Syne',sans-serif"}} className="text-4xl font-black text-[#0071ba] mb-1">{val}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
        <div className="mb-20">
          <h2 style={{fontFamily:"'Syne',sans-serif"}} className="text-3xl font-black text-white mb-8">Why DHC?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {icon:"🏛️",title:"MOM Licensed",desc:"Fully accredited by Singapore's Ministry of Manpower. EA License: 12C6253. We operate with full compliance and transparency."},
              {icon:"🌏",title:"Part of Elitez Group",desc:"Backed by a regional HR conglomerate with offices across Singapore, Malaysia, Indonesia, Thailand, and Vietnam."},
              {icon:"⭐",title:"ISO Certified",desc:"ISO certified and TAFEP compliant. We uphold the highest standards of fair employment practices."},
              {icon:"⚡",title:"72-Hour Shortlist",desc:"Average 72-hour shortlist turnaround. Industry-specialist recruiters, not generalists. Speed without compromising quality."},
              {icon:"🤝",title:"Dedicated Account Manager",desc:"Every client gets a dedicated consultant who understands your business, culture, and hiring needs."},
              {icon:"💡",title:"Replacement Guarantee",desc:"We stand behind every placement. Replacement guarantee on permanent placements for your peace of mind."},
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-white/8 hover:border-[#0071ba]/40 hover:bg-[#0071ba]/5 transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 style={{fontFamily:"'Syne',sans-serif"}} className="text-lg font-black text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-10 rounded-3xl border border-[#0071ba]/20 bg-[#0071ba]/5 text-center">
          <h3 style={{fontFamily:"'Syne',sans-serif"}} className="text-2xl font-black text-white mb-3">Ready to work with us?</h3>
          <p className="text-gray-400 mb-6">Whether you're hiring or looking for your next role, we're here to help.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:career@dhc.com.sg" className="bg-[#0071ba] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#005a96] transition-all">Get in Touch →</a>
            <a href="/services" className="border border-white/20 text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/5 transition-all">Our Services →</a>
          </div>
        </div>
      </div>
    </main>
  );
}