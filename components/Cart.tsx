"use client";
import { createContext, useContext, useMemo, useState, useRef, ReactNode } from "react";
import { ShoppingBag, Minus, Plus, X, ChevronRight, Check, LocateFixed, Loader2 } from "lucide-react";
import { WHATSAPP } from "@/lib/config";
import { TIERS, feeFor, kmFrom } from "@/lib/delivery";
import type { Item } from "@/lib/menu";

type Line = Item & { qty: number };
type Ctx = { lines: Line[]; count: number; total: number; qty: (id: string) => number; add: (i: Item) => void; dec: (id: string) => void; open: () => void };
const C = createContext<Ctx>(null as unknown as Ctx);
export const useCart = () => useContext(C);

export function CartProvider({ children }: { children: ReactNode }) {
  const [m, setM] = useState<Record<string, Line>>({});
  const [show, setShow] = useState(false);
  const lines = Object.values(m);
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((a, l) => a + l.qty * l.price, 0);
  const v = useMemo<Ctx>(() => ({
    lines, count, total, qty: (id) => m[id]?.qty ?? 0,
    add: (i) => setM((p) => ({ ...p, [i.id]: { ...i, qty: (p[i.id]?.qty ?? 0) + 1 } })),
    dec: (id) => setM((p) => { const n = { ...p }; if (!n[id]) return p; if (n[id].qty <= 1) delete n[id]; else n[id] = { ...n[id], qty: n[id].qty - 1 }; return n; }),
    open: () => setShow(true),
  }), [m]); // eslint-disable-line
  return (
    <C.Provider value={v}>
      {children}
      {count > 0 && !show && (
        <button onClick={() => setShow(true)} className="fixed bottom-20 md:bottom-6 left-3 right-3 md:left-auto md:right-6 md:w-80 z-40 flex items-center justify-between rounded-full bg-ye text-ink px-5 py-3.5 font-bold shadow-[0_8px_30px_rgba(255,209,47,.35)]">
          <span className="flex items-center gap-2"><ShoppingBag size={20} />{count} item{count > 1 ? "s" : ""}</span>
          <span className="flex items-center gap-1">₹{total}<ChevronRight size={18} /></span>
        </button>
      )}
      {show && <Sheet onClose={() => setShow(false)} />}
    </C.Provider>
  );
}

function Sheet({ onClose }: { onClose: () => void }) {
  const { lines, total, add, dec } = useCart();
  const [name, setName] = useState("");
  const [mode, setMode] = useState("Dine-in");
  const [note, setNote] = useState("");
  const [addr, setAddr] = useState("");
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(null);
  const [km, setKm] = useState<number | null>(null);
  const [loc, setLoc] = useState<"idle" | "busy" | "denied">("idle");
  const delivery = mode === "Delivery";
  const fee = delivery && km !== null ? feeFor(km) : 0;
  const far = delivery && km !== null && fee === null;
  const grand = total + (fee ?? 0);
  const locate = () => {
    if (!navigator.geolocation) return setLoc("denied");
    setLoc("busy");
    navigator.geolocation.getCurrentPosition(
      (p) => { const c = { lat: p.coords.latitude, lng: p.coords.longitude }; setPos(c); setKm(kmFrom(c.lat, c.lng)); setLoc("idle"); },
      () => setLoc("denied"), { enableHighAccuracy: true, timeout: 12000 });
  };
  const pick = (o: string) => { setMode(o); if (o === "Delivery" && !pos && loc !== "busy") locate(); };
  const problem = delivery ? (km === null ? "Share your location or pick your distance" : far ? "Sorry, we deliver up to 10 km only" : !addr.trim() ? "Add your address or landmark" : "") : "";
  const send = () => {
    const body = lines.map((l) => `• ${l.qty} x ${l.name} - ₹${l.qty * l.price}`).join("\n");
    const d = delivery ? `\nDelivery fee (~${km!.toFixed(1)} km): ₹${fee}\nAddress: ${addr}${pos ? `\nLocation: https://www.google.com/maps?q=${pos.lat},${pos.lng}` : ""}` : "";
    const msg = `*New Order - 7 GRILL*\n\n${body}\n\nItems: ₹${total}${d}\n*Total: ₹${grand}*\nType: ${mode}${name ? `\nName: ${name}` : ""}${note ? `\nNote: ${note}` : ""}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full md:max-w-md max-h-[92dvh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-card border border-line p-5 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-3xl font-black">Your order</h2>
          <button aria-label="Close" onClick={onClose} className="p-2 rounded-full bg-line"><X size={18} /></button>
        </div>
        {lines.length === 0 ? <p className="py-10 text-center text-cream/60">Cart is empty. Add something tasty from the menu.</p> : (
          <>
            <ul className="divide-y divide-line">
              {lines.map((l) => (
                <li key={l.id} className="flex items-center gap-3 py-3">
                  <div className="flex-1 min-w-0"><p className="font-semibold leading-tight">{l.name}</p><p className="text-sm text-cream/60">₹{l.price} each</p></div>
                  <Stepper q={l.qty} onAdd={() => add(l)} onDec={() => dec(l.id)} />
                  <span className="w-14 text-right font-bold">₹{l.qty * l.price}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {["Dine-in", "Takeaway", "Delivery"].map((o) => (
                <button key={o} onClick={() => pick(o)} className={`rounded-xl py-2.5 text-sm font-semibold border ${mode === o ? "bg-ye text-ink border-ye" : "border-line text-cream/80"}`}>{o}</button>
              ))}
            </div>
            {delivery && (
              <div className="mt-3 rounded-2xl border border-line bg-ink p-3 space-y-3">
                <button onClick={locate} className="w-full flex items-center justify-center gap-2 rounded-xl border border-ye/60 text-ye py-2.5 font-semibold">
                  {loc === "busy" ? <Loader2 size={18} className="animate-spin" /> : <LocateFixed size={18} />}{pos ? "Location found. Update" : "Use my current location"}
                </button>
                {loc === "denied" && <p className="text-sm text-cream/70">Location is off. Pick your approximate distance instead:</p>}
                {(loc === "denied" || (km !== null && !pos)) && (
                  <div className="grid grid-cols-2 gap-2">
                    {TIERS.map((t) => <button key={t.label} onClick={() => { setPos(null); setKm(t.max - 0.5); }} className={`rounded-lg py-2 text-sm border ${km !== null && !pos && feeFor(km) === t.fee ? "bg-ye text-ink border-ye" : "border-line"}`}>{t.label} · ₹{t.fee}</button>)}
                  </div>
                )}
                {km !== null && <p className={`text-sm font-semibold ${far ? "text-red-400" : "text-leaf"}`}>{far ? `About ${km.toFixed(1)} km away. Outside our 10 km delivery range.` : `About ${km.toFixed(1)} km away. Delivery ₹${fee}`}</p>}
                <textarea value={addr} onChange={(e) => setAddr(e.target.value)} rows={2} placeholder="House no., street, landmark" className="w-full rounded-xl bg-card border border-line px-3 py-2.5 outline-none focus:border-ye" />
              </div>
            )}
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" className="mt-3 w-full rounded-xl bg-ink border border-line px-4 py-3 outline-none focus:border-ye" />
            <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note, e.g. less spicy (optional)" className="mt-2 w-full rounded-xl bg-ink border border-line px-4 py-3 outline-none focus:border-ye" />
            <div className="mt-5 space-y-1 text-cream/80">
              <div className="flex justify-between"><span>Items</span><span>₹{total}</span></div>
              {delivery && <div className="flex justify-between"><span>Delivery (approx)</span><span>{fee === null ? "-" : `₹${fee}`}</span></div>}
              <div className="flex justify-between text-xl font-black text-cream pt-1"><span>Total</span><span className="text-ye">₹{grand}</span></div>
            </div>
            <div className="mt-4"><Swipe onDone={send} disabled={!!problem} /></div>
            <p className="text-center text-xs mt-3 text-cream/50">{problem || "Opens WhatsApp with your full order. Send it there to confirm."}</p>
          </>
        )}
      </div>
    </div>
  );
}

export function Stepper({ q, onAdd, onDec }: { q: number; onAdd: () => void; onDec: () => void }) {
  return (
    <div className="flex items-center rounded-full border border-ye/60 text-ye">
      <button aria-label="Remove one" onClick={onDec} className="p-2"><Minus size={16} /></button>
      <span className="w-6 text-center font-bold text-cream">{q}</span>
      <button aria-label="Add one" onClick={onAdd} className="p-2"><Plus size={16} /></button>
    </div>
  );
}

function Swipe({ onDone, disabled }: { onDone: () => void; disabled?: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [done, setDone] = useState(false);
  const drag = useRef(false);
  const max = () => (track.current?.clientWidth ?? 300) - 60;
  const move = (cx: number) => { const r = track.current!.getBoundingClientRect(); setX(Math.min(Math.max(cx - r.left - 30, 0), max())); };
  const end = () => {
    if (!drag.current) return; drag.current = false;
    if (x > max() * 0.85) { setX(max()); setDone(true); onDone(); setTimeout(() => { setX(0); setDone(false); }, 1800); } else setX(0);
  };
  return (
    <div ref={track} className={`relative h-[60px] rounded-full bg-[#25D366] overflow-hidden ${disabled ? "opacity-40" : ""} select-none touch-none`}>
      <div className="absolute inset-0 flex items-center justify-center font-bold text-ink pl-10 pointer-events-none" style={{ opacity: done ? 1 : 1 - x / max() }}>
        {done ? <><Check size={20} className="mr-1" />Opening WhatsApp</> : "Swipe to order on WhatsApp"}
      </div>
      <div role="slider" aria-label="Swipe to order" aria-valuenow={Math.round((x / max()) * 100)} tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" && !disabled) { setDone(true); onDone(); setTimeout(() => setDone(false), 1800); } }}
        onPointerDown={(e) => { if (disabled) return; drag.current = true; (e.target as HTMLElement).setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => drag.current && move(e.clientX)} onPointerUp={end} onPointerCancel={end}
        style={{ transform: `translateX(${x}px)`, transition: drag.current ? "none" : "transform .25s" }}
        className="absolute left-[3px] top-[3px] h-[54px] w-[54px] rounded-full bg-ink text-[#25D366] grid place-items-center cursor-grab touch-none">
        <ChevronRight size={26} />
      </div>
    </div>
  );
}
