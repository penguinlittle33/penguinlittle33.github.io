import React from "react";
import { ArrowLeft } from "lucide-react";
import Shell from "./components/Shell";
import About, { Experience, Achievements } from "./components/About";
import ContactPage from "./components/ContactPage";
import ArchDamMedia from "./components/ArchDamMedia";
import SectionDivider from "./components/SectionDivider";
import { EntryCard, EmptyNotes, ProjectArt, ProjectCover, RichContent, t } from "./components/Content";
import { assetPath, configureStaticPrefix, href, kindLabel, textOf, type Entry, type Lang, type Profile, type RichNode } from "../lib/content";

export type SiteData = { profile: Profile; entries: Entry[] };
export type StaticProps = { route: string; lang: Lang; prefix: string; data: SiteData };
function withAssets(nodes:RichNode[],lang:Lang):RichNode[]{return nodes.map(n=>({...n,src:n.src?assetPath(n.src):undefined,href:n.href?.startsWith("/")&&/^\/(?:work|reading|journal|contact|post)(?:\/|\?|$)/.test(n.href)?href(n.href,lang):n.href,children:n.children?withAssets(n.children,lang):undefined}));}

export default function StaticPage({route,lang,prefix,data}:StaticProps){
  configureStaticPrefix(prefix);
  const profile={...data.profile,photo:assetPath(data.profile.photo)};
  const entries=data.entries.filter(e=>e.status==="published").map(e=>({...e,cover:assetPath(e.cover),body:{zh:withAssets(e.body.zh,"zh"),en:withAssets(e.body.en,"en")}})).sort((a,b)=>b.date.localeCompare(a.date));
  const languageUrl=href(route,lang==="zh"?"en":"zh");
  if(route==="/")return <Shell lang={lang} profile={profile} languageUrl={languageUrl} className="home-page home-profile-page"><div className="page-width interior"><About lang={lang} profile={profile}/></div></Shell>;
  if(route==="/contact")return <Shell lang={lang} active="/contact" profile={profile} languageUrl={languageUrl}><div className="page-width interior contact-page"><ContactPage lang={lang} profile={profile}/></div></Shell>;
  if(["/work","/reading","/journal"].includes(route)){
    const section=route.slice(1);
    const [kicker,title,desc]=section==="work"?["PROJECTS & EXPERIENCE",t(lang,"把探索，落在实践里。","Exploration, put into practice."),t(lang,"持续更新进展中。","Work in progress, with more updates to come.")]:section==="reading"?["THE READING CORNER",t(lang,"阅读，是另一种远行。","Reading is another kind of journey."),t(lang,"读过的书，留下的句子，以及它们带来的思考。","Books, passages that linger, and the thoughts they leave behind.")]:["LIFE & NOTES",t(lang,"生活，值得慢慢记录。","Everyday life, worth remembering."),t(lang,"关于阅读、吉他、跑步，也关于那些细小而真实的日常。","Reading, guitar, running, and the small, real moments in between.")];
    const list=entries.filter(e=>e.kind===section);
    return <Shell lang={lang} active={route} profile={profile} languageUrl={languageUrl}><div className="page-width interior"><header className="page-heading"><div className="eyebrow">{kicker}</div><h1>{title}</h1><p>{desc}</p><div className="page-heading-bottom"><span>{section==="work"?t(lang,"项目作品","Selected work"):section==="reading"?t(lang,"读后感","Reading notes"):t(lang,"生活手记","Journal entries")}</span><span>{String(list.length).padStart(2,"0")}</span></div><SectionDivider motif={section==="reading"?"reeds":"flow"}/></header>{list.length?<div className={section==="work"?"projects-grid":"notes-grid"}>{list.map((e,i)=><EntryCard key={e.id} entry={e} lang={lang} index={i}/>)}</div>:<EmptyNotes lang={lang} kind={section as "reading"|"journal"}/>} {section==="work"&&<><Experience lang={lang}/><Achievements lang={lang}/></>}</div></Shell>;
  }
  const e=entries.find(e=>route===`/post/${e.id}`);
  if(e){const body=e.body[lang].length?e.body[lang]:e.body[lang==="zh"?"en":"zh"],fallback=!e.body[lang].length&&body.length>0;
    const book=lang==="en"?e.bookEn||e.book:e.book;
    const author=lang==="en"?e.bookAuthorEn||e.bookAuthor:e.bookAuthor;
    return <Shell lang={lang} active={`/${e.kind}`} profile={profile} languageUrl={languageUrl}><article className={`article article-${e.kind}`}><a className="text-link back-link" href={href(`/${e.kind}`,lang)}><ArrowLeft size={16}/>{textOf(kindLabel[e.kind],lang)}</a><div className="eyebrow">{textOf(e.category,lang)||textOf(kindLabel[e.kind],lang)}</div><h1>{textOf(e.title,lang)}</h1><p className="article-summary">{textOf(e.summary,lang)}</p><div className="article-meta"><span>{e.period||e.date}</span><span>{book&&`${book}${author?` · ${author}`:""}`}</span></div><SectionDivider motif="flow"/>{e.cover?<ProjectCover entry={e} lang={lang} detail/>:e.kind==="work"?<ProjectArt index={e.id==="flood-risk-warning"?0:e.id==="transparent-seepage"?1:2} large/>:null}{fallback&&<p className="translation-note">{t(lang,"这篇文章暂未提供中文译文，以下为英文原文。","An English version is not available yet. The original Chinese text follows.")}</p>}<div className="prose"><RichContent nodes={body}/></div>{e.id==="arch-dam-design"&&<ArchDamMedia lang={lang}/>}<div className="article-end"><SectionDivider motif="reeds"/><span>✳</span><p>{t(lang,"感谢你读到这里。","Thank you for reading.")}</p><a className="text-link" href={href(`/${e.kind}`,lang)}>{t(lang,"继续浏览","Keep exploring")} →</a></div></article></Shell>;
  }
  return <Shell lang={lang} profile={profile} languageUrl={href("/",lang==="zh"?"en":"zh")}><div className="not-found"><h1>{t(lang,"这一页还没有写下。","This page is still unwritten.")}</h1><a className="button button-dark" href={href("/",lang)}>{t(lang,"返回首页","Back home")}</a></div></Shell>;
}
