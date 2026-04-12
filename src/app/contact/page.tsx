export default function Contact() {
  return (
    <main style={{fontFamily:"'DM Sans',sans-serif"}} className="bg-[#020817] text-white min-h-screen">
      <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(0,113,186,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,113,186,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px"}} />
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20 relative z-10">
        <a href="/" className="text-[#6798d0] text-sm hover:text-white transition-colors mb-8 block">← Back to Home</a>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-xs font-bold text-[#6798d0] tracking-widest uppercase mb-3 block">Get In Touch</span>
            <h1 style={{fontFamily:"'Syne',sans-serif"}} className="text-5xl font-black text-white mb-6">Let's Build Your Workforce Together</h1>
            <p className="text-gray-400 leading-relaxed mb-10">Whether you're hiring one person or scaling an entire team — our consultants are ready to help.</p>
            <div className="space-y-6">
              {[
                {icon:"📍",label:"Visit Us",val:"2 Kallang Ave, CT Hub #03-08, Singapore 339407"},
                {icon:"📞",label:"Call Us",val:"+65 6050 0777",href:"tel:+6560500777"},
                {icon:"📧",label:"Email Us",val:"info@dhc.com.sg",href:"mailto:info@dhc.com.sg"},
                {icon:"💼",label:"Career Enquiries",val:"career@dhc.com.sg",href:"mailto:career@dhc.com.sg"},
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0071ba]/20 border border-[#0071ba]/30 flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-gray-500 text-xs font-bold tracking-wide uppercase mb-1">{item.label}</div>
                    {item.href ? <a href={item.href} className="text-white hover:text-[#6798d0] transition-colors font-medium">{item.val}</a> : <div className="text-white font-medium">{item.val}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {["MOM Licensed","ISO Certified","CPF Registered","TAFEP Compliant"].map((c) => (
                <span key={c} className="text-xs font-semibold text-gray-500 border border-white/10 px-3 py-1.5 rounded-full">✓ {c}</span>
              ))}
            </div>
          </div>
          <div className="bg-white/3 border border-white/10 rounded-3xl p-8">
            <h3 style={{fontFamily:"'Syne',sans-serif"}} className="text-xl font-black text-white mb-6">Send an Enquiry</h3>
            <div className="space-y-6">
              <p className="text-gray-400 text-sm leading-relaxed">Fill in our enquiry form and we will get back to you within 1 business day.</p>
              <div className="grid grid-cols-2 gap-4">
                {[["📋","Quick Form","Takes 2 minutes"],["⚡","Fast Response","Within 1 business day"],["🔒","Confidential","Your info is safe"],["🤝","Free Consult","No obligations"]].map(([icon,title,desc]) => (
                  <div key={title} className="p-4 rounded-xl border border-white/8 bg-white/2 text-center">
                    <div className="text-2xl mb-1">{icon}</div>
                    <div className="text-white font-bold text-xs">{title}</div>
                    <div className="text-gray-500 text-xs">{desc}</div>
                  </div>
                ))}
              </div>
              <a href="https://forms.gle/vgTdVyxSW6g2kSDd6" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#0071ba] text-white font-black py-4 rounded-xl hover:bg-[#005a96] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#0071ba]/20 text-base">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg>
                Open Enquiry Form →
              </a>
              <div className="flex flex-col gap-3 pt-2">
                <a href="mailto:career@dhc.com.sg" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                  <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-base">📧</span>
                  career@dhc.com.sg
                </a>
                <a href="https://wa.me/6560500777" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                  <span className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-base">💬</span>
                  WhatsApp Us
                </a>
                <a href="tel:+6560500777" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                  <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-base">📞</span>
                  +65 6050 0777
                </a>
              </div>
              <p className="text-gray-600 text-xs text-center">We typically respond within 1 business day. Your information is kept confidential.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}