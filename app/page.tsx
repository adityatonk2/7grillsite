import Image from "next/image";
import Link from "next/link";
import { MapPin, Leaf, Wallet, ChefHat, Star, MessageCircle } from "lucide-react";
import { Order3, Pill } from "@/components/Shell";
import { ItemRow } from "@/components/ItemRow";
import { MENU } from "@/lib/menu";
import { DIRECTIONS, ADDRESS, WHATSAPP } from "@/lib/config";

const best = ["sandwiches-cheese-corn-sandwich", "burgers-tandoori-burger", "fries-saucy-fries", "coffee-flavoured-cold-coffee", "burgers-paneer-burger"].map((id) => MENU.find((m) => m.id === id)!);
const quotes = [["Low price great taste, friendly nature. I visit like everyday.", "Abhishek Joseph"], ["Food quality and quantity is really good. Pocket friendly prices.", "SanDhya"], ["Amazing coffee. Burgers and sandwiches are fresh and well prepared.", "Sanjay Kumar"]];
const strip = ["Pure veg", "Fresh burgers", "Cheese corn sandwich ₹45", "Combos from ₹85", "Cold coffee ₹70", "Tandoori burger ₹45", "Saucy fries ₹75", "5.0 on Google"];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-8 md:pt-14 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf/15 text-leaf px-3 py-1 text-sm font-bold"><Leaf size={15} />100% vegetarian, Dehradun</span>
          <h1 className="font-display font-black text-[3.4rem] sm:text-7xl leading-[.95] mt-4">Big cravings.<br /><span className="text-ye">Little prices.</span></h1>
          <p className="mt-5 text-lg text-cream/80 max-w-md">Fresh burgers, loaded sandwiches, crispy fries and coffee. Every favourite, made veg.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/menu" className="rounded-full bg-ye text-ink font-black px-7 py-3.5">Explore the menu</Link>
            <Pill href={DIRECTIONS} cls="border border-line"><MapPin size={18} className="text-ye" />Get directions</Pill>
          </div>
        </div>
        <div className="relative h-[340px] sm:h-[420px]">
          <Image src="/img/sandwich.jpg" alt="Grilled cheese corn sandwich" width={945} height={630} priority className="absolute right-0 top-0 w-[78%] h-[58%] object-cover rounded-[2rem] -rotate-2" />
          <Image src="/img/burger.jpg" alt="Veggie burger" width={324} height={405} className="absolute left-0 bottom-0 w-[42%] h-[60%] object-cover rounded-[2rem] rotate-3 border-4 border-ink" />
          <Image src="/img/coffee.jpg" alt="7 GRILL cold coffee" width={410} height={615} className="absolute right-[6%] bottom-0 w-[34%] h-[52%] object-cover rounded-[2rem] -rotate-3 border-4 border-ink" />
          <div className="absolute left-[30%] top-[46%] rotate-[-8deg] bg-ye text-ink rounded-full h-28 w-28 grid place-items-center text-center font-black leading-none shadow-xl"><span className="text-xs">Combos<br />from<br /><b className="font-display text-3xl">₹85</b></span></div>
        </div>
      </section>

      <div className="mt-12 overflow-hidden border-y border-line bg-card py-3">
        <div className="roll flex w-max gap-10 whitespace-nowrap font-display font-black text-xl">{[...strip, ...strip].map((s, i) => <span key={i} className="text-cream/80">{s}<span className="text-ye ml-10">✦</span></span>)}</div>
      </div>

      <section className="mx-auto max-w-6xl px-4 mt-14 grid md:grid-cols-[1.2fr_1fr] gap-10">
        <div>
          <h2 className="font-display font-black text-4xl">Your next favourite bite</h2>
          <p className="text-cream/60 mt-1">Best sellers. Add straight to your order.</p>
          <ul className="divide-y divide-line mt-3">{best.map((i) => <ItemRow key={i.id} i={i} />)}</ul>
          <Link href="/menu" className="inline-block mt-4 font-bold text-ye underline underline-offset-4">View full menu</Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-1 gap-3 self-start">
          {[[Leaf, "Pure veg", "100% vegetarian"], [Wallet, "Budget friendly", "Great taste, great value"], [ChefHat, "Freshly made", "Served fresh always"]].map(([I, t, s]: any) => (
            <div key={t} className="rounded-2xl bg-card border border-line p-4"><I className="text-ye" size={24} /><p className="font-bold mt-2 leading-tight">{t}</p><p className="text-xs text-cream/60 mt-1">{s}</p></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 mt-16">
        <div className="rounded-3xl bg-ye text-ink p-6 sm:p-10 grid md:grid-cols-[auto_1fr] gap-6 items-center">
          <div><div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} fill="#0B0B0B" size={22} />)}</div><p className="font-display font-black text-6xl leading-none mt-2">5.0</p><p className="font-semibold">72 Google reviews</p></div>
          <div className="grid sm:grid-cols-3 gap-3">{quotes.map(([t, n]) => <figure key={n} className="rounded-2xl bg-ink text-cream p-4"><blockquote className="text-sm">“{t}”</blockquote><figcaption className="text-xs text-ye mt-2 font-bold">{n}</figcaption></figure>)}</div>
        </div>
        <Link href="/reviews" className="inline-block mt-4 font-bold text-ye underline underline-offset-4">Tell us how we did</Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 mt-16 grid md:grid-cols-2 gap-8 items-center">
        <div className="grid grid-cols-2 gap-3">
          <Image src="/img/storefront.jpg" alt="7 GRILL storefront" width={371} height={619} className="rounded-3xl object-cover h-full" />
          <div className="grid gap-3"><Image src="/img/shop-night.jpg" alt="Guests at 7 GRILL" width={371} height={372} className="rounded-3xl object-cover" /><Image src="/img/guest.jpg" alt="Guest enjoying a burger" width={371} height={464} className="rounded-3xl object-cover" /></div>
        </div>
        <div>
          <h2 className="font-display font-black text-4xl">Small spot. Big flavour.</h2>
          <p className="mt-3 text-cream/75 flex gap-2"><MapPin className="text-ye shrink-0" />{ADDRESS}</p>
          <p className="mt-3 text-cream/75">Tucked into the lanes of Kanwali Road. Dine in, take away, or order online.</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Pill href={DIRECTIONS} cls="bg-cream text-ink"><MapPin size={18} />Get directions</Pill>
            <Pill href={`https://wa.me/${WHATSAPP}`} cls="bg-[#25D366] text-ink"><MessageCircle size={18} />WhatsApp us</Pill>
          </div>
          <div className="mt-3"><Order3 /></div>
        </div>
      </section>
    </>
  );
}
