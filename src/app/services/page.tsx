export default function Services() {
  const services = [
    { icon: "🎯", title: "Permanent Recruitment", tag: "Most Popular", desc: "End-to-end talent acquisition for permanent roles across all industries and seniority levels.", points: ["Executive & mid-level search", "Industry-specific sourcing", "Behavioural assessments", "Post-placement support", "Replacement guarantee"] },
    { icon: "⚡", title: "Temporary & Contract", tag: "", desc: "Scale your workforce up or down with flexible staffing. Ideal for project-based needs, seasonal peaks, or covering leave periods.", points: ["Short & long-term contracts", "Rapid 48-hour deployment", "Managed headcount", "Full MOM compliance", "Nationwide coverage"] },
    { icon: "💼", title: "Payroll Outsourcing", tag: "", desc: "Delegate your payroll to our experts. CPF submissions, IR8A filing, and all statutory compliance handled.", points: ["CPF & MOM compliance", "IR8A / IRAS filing", "Leave & claims management", "Confidential reporting", "Monthly processing"] },
    { icon: "🔄", title: "Business Process Outsourcing", tag: "", desc: "Outsource non-core HR and administrative functions. We streamline operations so your team can focus on strategy.", points: ["HR administration", "Onboarding & offboarding", "Data management", "Process optimisation", "Dedicated account manager"] },
    { icon: "📚", title: "Training & Development", tag: "", desc: "Upskill your workforce with targeted programmes. From leadership development to operational training.", points: ["WSQ-aligned programmes", "Leadership coaching", "Skills gap analysis", "On-site & virtual delivery", "SkillsFuture-eligible"] },
    { icon: "🌏", title: "Employer of Record (EOR)", tag: "New", desc: "Hire across SEA without a local entity. We become the legal employer managing all compliance.", points: ["Legal employer entity", "Cross-border compliance", "Benefits administration", "Risk management", "5 SEA markets"] },
    { icon: "🚀", title: "Workforce Transformation", tag: "70% Funded", desc: "Future-proof your organisation with Job Redesign+ programmes. Up to 70% government funding available.", points: ["Up to 70% govt funding", "Job Redesign+ certified", "Workforce planning", "Skills framework alignment", "Grant support"] },
  ];
  return (
    <main style={{fontFamily:"'DM Sans',sans-serif"}} className="bg-[#020817] text-white min-h-screen">
      <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(0,113,186,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,113,186,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px"}} />
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20 relative z-10">
        <a href="/" className="text-[#6798d0] text-sm hover:text-white transition-colors mb-8 block">← Back to Home</a>
        <span className="text-xs font-bold text-[#6798d0] tracking-widest uppercase mb-3 block">What We Do</span>
        <h1 style={{fontFamily:"'Syne',sans-serif"}} className="text-5xl md:text-6xl font-black text-white mb-4">Our Services</h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-16">Full-spectrum HR solutions for Singapore's most ambitious organisations. MOM-licensed, ISO-certified, trusted by 200+ companies.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group p-8 rounded-2xl border border-white/8 hover:border-[#0071ba]/50 hover:bg-[#0071ba]/5 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{s.icon}</span>
                {s.tag && <span className="text-xs font-bold text-[#0071ba] border border-[#0071ba]/30 bg-[#0071ba]/10 px-3 py-1 rounded-full">{s.tag}</span>}
              </div>
              <h3 style={{fontFamily:"'Syne',sans-serif"}} className="text-xl font-black text-white mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
              <ul className="space-y-1.5 mb-6">
                {s.points.map((p) => <li key={p} className="flex items-center gap-2 text-xs text-gray-500"><span className="w-1 h-1 rounded-full bg-[#0071ba] flex-shrink-0"/>{p}</li>)}
              </ul>
              <a href="mailto:career@dhc.com.sg" className="text-xs text-[#6798d0] font-bold hover:text-white transition-colors">Enquire now →</a>
            </div>
          ))}
        </div>
        <div className="mt-16 p-10 rounded-3xl border border-[#0071ba]/20 bg-[#0071ba]/5 text-center">
          <h3 style={{fontFamily:"'Syne',sans-serif"}} className="text-2xl font-black text-white mb-3">Not sure which service fits?</h3>
          <p className="text-gray-400 mb-6">Our consultants will assess your needs and recommend the right solution.</p>
          <a href="mailto:career@dhc.com.sg" className="inline-flex items-center gap-2 bg-[#0071ba] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#005a96] transition-all">Talk to a Consultant →</a>
        </div>
      </div>
    </main>
  );
}