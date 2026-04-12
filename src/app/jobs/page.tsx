export default function Jobs() {
  return (
    <main style={{fontFamily:"'DM Sans',sans-serif"}} className="bg-[#020817] text-white min-h-screen">
      <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(0,113,186,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,113,186,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px"}} />
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20 relative z-10 text-center">
        <a href="/" className="text-[#6798d0] text-sm hover:text-white transition-colors mb-8 block text-left">← Back to Home</a>
        <span className="text-xs font-bold text-[#6798d0] tracking-widest uppercase mb-3 block">Career Opportunities</span>
        <h1 style={{fontFamily:"'Syne',sans-serif"}} className="text-5xl md:text-6xl font-black text-white mb-4">Find Your Dream Job</h1>
        <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">Explore thousands of roles across Singapore and Southeast Asia. Browse our latest openings on Singapore's top job platforms.</p>
        <div className="grid md:grid-cols-2 gap-6 text-left mb-16">
          <a href="https://www.mycareersfuture.gov.sg/search?search=dynamic+human+capital&sortBy=new_posting_date" target="_blank" rel="noopener noreferrer"
            className="group p-8 rounded-2xl border border-white/8 hover:border-[#0071ba]/50 hover:bg-[#0071ba]/5 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-xl">🇸🇬</div>
              <div><div style={{fontFamily:"'Syne',sans-serif"}} className="font-black text-white">MyCareersFuture</div><div className="text-xs text-gray-500">Government Jobs Portal</div></div>
            </div>
            <p className="text-gray-400 text-sm mb-4">Singapore's national jobs portal by NTUC and the government. Browse current DHC-posted roles across all industries.</p>
            <span className="text-[#6798d0] font-bold text-sm group-hover:text-white transition-colors">Browse Jobs →</span>
          </a>
          <a href="https://www.jobstreet.com.sg/jobs?q=Dynamic+Human+Capital&sortmode=ListedDate" target="_blank" rel="noopener noreferrer"
            className="group p-8 rounded-2xl border border-white/8 hover:border-[#0071ba]/50 hover:bg-[#0071ba]/5 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xl">🌏</div>
              <div><div style={{fontFamily:"'Syne',sans-serif"}} className="font-black text-white">JobStreet</div><div className="text-xs text-gray-500">Regional Job Platform</div></div>
            </div>
            <p className="text-gray-400 text-sm mb-4">Southeast Asia's leading job platform. Discover DHC opportunities for fresh graduates and experienced professionals.</p>
            <span className="text-[#6798d0] font-bold text-sm group-hover:text-white transition-colors">Browse Jobs →</span>
          </a>
        </div>
        <div className="p-8 rounded-3xl border border-[#0071ba]/20 bg-[#0071ba]/5">
          <h3 style={{fontFamily:"'Syne',sans-serif"}} className="text-xl font-black text-white mb-2">Can't find the right role?</h3>
          <p className="text-gray-400 text-sm mb-5">Send us your CV and our consultants will match you with the right opportunity.</p>
          <a href="mailto:career@dhc.com.sg" className="inline-flex items-center gap-2 bg-[#0071ba] text-white font-bold px-8 py-3 rounded-full hover:bg-[#005a96] transition-all text-sm">Send Your CV →</a>
        </div>
      </div>
    </main>
  );
}