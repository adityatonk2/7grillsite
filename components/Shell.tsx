"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, Star, Instagram, Phone, MapPin, MessageCircle } from "lucide-react";
import { useCart } from "./Cart";
import { INSTAGRAM, SWIGGY, MAGICPIN, PHONES, ADDRESS, DIRECTIONS, WHATSAPP } from "@/lib/config";

const TABS = [{ href: "/", label: "Home", I: Home }, { href: "/menu", label: "Menu", I: UtensilsCrossed }, { href: "/reviews", label: "Reviews", I: Star }];

export function Header() {
  const p = usePathname(); const { count, open } = useCart();
  return (
    <header className="sticky top-0 z-30 bg-ink/90 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 h-16">
        <Link href="/" className="flex items-center gap-2"><Image src="/img/logo.png" alt="7 GRILL" width={48} height={48} className="rounded-lg" /><span className="font-display font-black text-xl hidden sm:block">7 GRILL</span></Link>
        <nav className="hidden md:flex gap-8 font-semibold">{TABS.map((t) => <Link key={t.href} href={t.href} className={p === t.href ? "text-ye" : "text-cream/70 hover:text-cream"}>{t.label}</Link>)}</nav>
        <button onClick={open} className="rounded-full bg-ye text-ink font-bold px-4 py-2 text-sm flex items-center gap-2"><MessageCircle size={16} />Order{count > 0 && <span className="bg-ink text-ye rounded-full px-1.5 text-xs">{count}</span>}</button>
      </div>
    </header>
  );
}

export function TabBar() {
  const p = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-ink/95 backdrop-blur border-t border-line grid grid-cols-3 pb-[env(safe-area-inset-bottom)]">
      {TABS.map(({ href, label, I }) => (
        <Link key={href} href={href} className={`flex flex-col items-center py-2.5 text-xs font-semibold ${p === href ? "text-ye" : "text-cream/60"}`}><I size={22} />{label}</Link>
      ))}
    </nav>
  );
}

export function Pill({ href, children, cls = "" }: { href: string; children: React.ReactNode; cls?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold text-sm ${cls}`}>{children}</a>;
}
export const Order3 = () => (
  <div className="flex flex-wrap gap-2.5">
    <Pill href={SWIGGY} cls="bg-[#FC8019] text-white">Order on Swiggy</Pill>
    <Pill href={MAGICPIN} cls="bg-[#E8174B] text-white">View on magicpin</Pill>
    <Pill href={INSTAGRAM} cls="bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white"><Instagram size={18} />@7.grillzz</Pill>
  </div>
);

export function Footer() {
  return (
    <footer className="border-t border-line mt-20 pb-28 md:pb-10">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-2">
        <div>
          <Image src="/img/logo.png" alt="7 GRILL" width={110} height={110} className="rounded-xl" />
          <p className="mt-3 text-cream/70 max-w-xs">Pure veg burgers, sandwiches, fries and coffee, made fresh in Dehradun.</p>
        </div>
        <div className="space-y-3">
          <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className="flex gap-2 text-cream/80"><MapPin size={20} className="text-ye shrink-0" />{ADDRESS}</a>
          {PHONES.map((n) => <a key={n} href={`tel:+91${n}`} className="flex gap-2 text-cream/80"><Phone size={20} className="text-ye" />{n}</a>)}
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex gap-2 text-cream/80"><MessageCircle size={20} className="text-[#25D366]" />Chat on WhatsApp</a>
          <div className="pt-2"><Order3 /></div>
        </div>
      </div>
    </footer>
  );
}
