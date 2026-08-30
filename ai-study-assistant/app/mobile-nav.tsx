"use client";
import Link from "next/link";import {usePathname} from "next/navigation";
const items=[['/','Home'],['/subjects','Subjects'],['/notes','Notes'],['/quizzes','Quizzes'],['/flashcards','Cards'],['/ai','AI']];
export default function MobileNav(){const path=usePathname();return <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-6 border-t border-slate-800 bg-slate-950/95 p-2 backdrop-blur lg:hidden">{items.map(([href,label])=><Link key={href} href={href} className={`rounded-lg px-1 py-2 text-center text-[11px] ${path===href?'bg-slate-800 text-white':'text-slate-500'}`}>{label}</Link>)}</nav>}
