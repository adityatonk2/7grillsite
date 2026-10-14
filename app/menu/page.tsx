"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CATS, MENU, FLAVOURS } from "@/lib/menu";
import { ItemRow } from "@/components/ItemRow";

export default function MenuPage() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const list = useMemo(() => MENU.filter((i) => (cat === "All" || i.cat === cat) && i.name.toLowerCase().includes(q.toLowerCase())), [cat, q]);
  const groups = CATS.filter((c) => list.some((i) => i.cat === c));
  return (
    <div className="mx-auto max-w-3xl px-4 pt-8">
      <h1 className="font-display font-black text-5xl sm:text-6xl leading-none">The <em className="text-ye">menu</em></h1>
      <p className="mt-2 text-cream/70">100% veg. Tap + to build your order, then swipe to send it on WhatsApp.</p>
      <div className="sticky top-16 z-20 -mx-4 px-4 pt-3 pb-2 bg-ink">
        <label className="flex items-center gap-2 rounded-full bg-card border border-line px-4 focus-within:border-ye">
          <Search size={18} className="text-cream/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search burgers, fries, coffee..." className="w-full bg-transparent py-3 outline-none" />
        </label>
        <div className="no-sb flex gap-2 overflow-x-auto mt-3">
          {["All", ...CATS].map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold border ${cat === c ? "bg-ye text-ink border-ye" : "border-line text-cream/80"}`}>{c}</button>
          ))}
        </div>
      </div>
      {groups.length === 0 && <p className="py-16 text-center text-cream/60">Nothing matches “{q}”. Try “paneer” or “fries”.</p>}
      {groups.map((c) => (
        <section key={c} className="mt-8">
          <h2 className="font-display font-black text-3xl border-b-2 border-ye pb-1 inline-block">{c}</h2>
          {c === "Coffee" && <p className="text-sm text-leaf mt-2">{FLAVOURS}</p>}
          <ul className="divide-y divide-line">{list.filter((i) => i.cat === c).map((i) => <ItemRow key={i.id} i={i} />)}</ul>
        </section>
      ))}
    </div>
  );
}
