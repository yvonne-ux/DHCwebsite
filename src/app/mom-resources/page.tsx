export default function MOMResources() {
  return (
    <main style={{fontFamily:"'DM Sans',sans-serif"}} className="bg-[#020817] text-white min-h-screen">
      <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(0,113,186,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,113,186,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px"}} />
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20 relative z-10">
        <a href="/DHCwebsite/" className="text-[#6798d0] text-sm hover:text-white transition-colors mb-8 block">← Back to Home</a>
        <span className="text-xs font-bold text-[#6798d0] tracking-widest uppercase mb-3 block">Singapore MOM</span>
        <h1 style={{fontFamily:"'Syne',sans-serif"}} className="text-5xl md:text-6xl font-black text-white mb-4">MOM Resources & Guidelines</h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-16">Stay compliant with Singapore's Ministry of Manpower regulations. Key resources for employers and employees.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {icon:"📋",title:"Employment Act",desc:"Singapore's main labour law covering employee rights, contracts, salary, and working hours.",href:"https://www.mom.gov.sg/employment-practices/employment-act"},
            {icon:"🏢",title:"EA Licence Check",desc:"Verify if a recruitment agency is MOM-licensed. DHC's EA License: 12C6253.",href:"https://www.mom.gov.sg/eservices/services/employment-agencies-and-personnel-search"},
            {icon:"💰",title:"CPF Contributions",desc:"Understand CPF contribution rates, eligibility, and submission requirements for employers.",href:"https://www.cpf.gov.sg/employer"},
            {icon:"🌍",title:"Work Pass Portal",desc:"Apply and manage Employment Pass, S Pass, and Work Permits for foreign employees.",href:"https://www.mom.gov.sg/passes-and-permits"},
            {icon:"⚖️",title:"TAFEP Guidelines",desc:"Tripartite Alliance for Fair and Progressive Employment Practices guidelines and resources.",href:"https://www.tafep.sg"},
            {icon:"📊",title:"COMPASS Framework",desc:"Complementarity Assessment Framework for EP applications. Points-based system guide.",href:"https://www.mom.gov.sg/passes-and-permits/employment-pass/eligibility"},
            {icon:"🔄",title:"Job Redesign+",desc:"Up to 70% government funding for workforce transformation and job redesign programmes.",href:"https://www.wsg.gov.sg/home/employers-industry-partners/workforce-development-job-redesign"},
            {icon:"📝",title:"IR8A Filing",desc:"Annual tax form for employee earnings. Submission deadlines and requirements.",href:"https://www.iras.gov.sg/taxes/individual-income-tax/employers/auto-inclusion-scheme-(ais)-for-employment-income"},
            {icon:"🏥",title:"Work Injury Compensation",desc:"WICA requirements, coverage, and claims process for workplace injuries.",href:"https://www.mom.gov.sg/workplace-safety-and-health/work-injury-compensation"},
          ].map((item) => (
            <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer"
              className="group p-6 rounded-2xl border border-white/8 hover:border-[#0071ba]/50 hover:bg-[#0071ba]/5 transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 style={{fontFamily:"'Syne',sans-serif"}} className="text-base font-black text-white mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.desc}</p>
              <span className="text-xs text-[#6798d0] font-bold group-hover:text-white transition-colors">Visit MOM →</span>
            </a>
          ))}
        </div>
        <div className="p-10 rounded-3xl border border-[#0071ba]/20 bg-[#0071ba]/5 text-center">
          <h3 style={{fontFamily:"'Syne',sans-serif"}} className="text-2xl font-black text-white mb-3">Need compliance advice?</h3>
          <p className="text-gray-400 mb-6">Our MOM-licensed consultants can guide you through Singapore's employment regulations.</p>
          <a href="mailto:career@dhc.com.sg" className="inline-flex items-center gap-2 bg-[#0071ba] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#005a96] transition-all">Speak to a Consultant →</a>
        </div>
      </div>
    </main>
  );
}