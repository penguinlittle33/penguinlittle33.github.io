import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { contactEmail, type Lang, type Profile } from "../../lib/content";
import { t } from "./Content";
import SectionDivider from "./SectionDivider";

export default function ContactPage({lang,profile}:{lang:Lang;profile:Profile}) {
  const socials=[["GitHub",profile.github],[t(lang,"小红书","Xiaohongshu"),profile.xiaohongshu],["LinkedIn",profile.linkedin]].filter(([,url])=>url);
  return <><header className="page-heading contact-heading"><div className="eyebrow">LET'S CONNECT</div><h1>{t(lang,"联系我","Let's connect.")}</h1><p>{t(lang,"关于实习机会、学习上的问题，或生活里的想法，都欢迎写信给我。","For internship opportunities, questions about my work, or thoughts you would like to share, feel free to write to me.")}</p><SectionDivider motif="flow"/></header><a className="contact-email-card" href={`mailto:${contactEmail}`}><span className="email-icon"><Mail size={30} strokeWidth={1.2}/></span><div><span className="eyebrow">EMAIL</span><span className="contact-email-address">{contactEmail}</span><p>{t(lang,"点击邮箱，开始一封来信。","Click the address to start an email.")}</p></div><ArrowUpRight className="email-arrow" size={28}/></a><section className="contact-social-section"><SectionDivider motif="reeds"/><div className="eyebrow">ELSEWHERE</div><h2>{t(lang,"也可以在这里找到我。","Find me elsewhere.")}</h2><div className="contact-social-grid">{socials.map(([label,url])=><a href={url} target="_blank" rel="noopener noreferrer" key={label}><span>{label}</span><ArrowUpRight size={21}/></a>)}</div></section><div className="hero-location"><span><MapPin size={16}/> Shanghai</span><span className="availability"><i/>{t(lang,"寻找实习机会 · 2029 届","Open to internships · Class of 2029")}</span></div></>;
}
