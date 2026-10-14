"use client";
import {
  Plus,
  Sandwich,
  Popcorn,
  Cookie,
  Coffee,
  CupSoda,
  UtensilsCrossed,
  CirclePlus,
} from "lucide-react";
import { useCart, Stepper } from "./Cart";
import { type Item } from "@/lib/menu";

function iconFor(item: Item) {
  switch (item.cat) {
    case "Sandwiches":
      return Sandwich;
    case "Burgers":
      return Sandwich;
    case "Fries":
      return Popcorn;
    case "Quick Bites":
      return Cookie;
    case "Coffee":
      if (item.name.includes("(Hot)")) return Coffee;
      if (item.name.includes("Cold")) return CupSoda;
      return Coffee;
    case "Combos":
      return UtensilsCrossed;
    case "Add-ons":
      return CirclePlus;
    default:
      return UtensilsCrossed;
  }
}

export function ItemRow({ i }: { i: Item }) {
  const { qty, add, dec } = useCart(); const q = qty(i.id);
  const Icon = iconFor(i);
  const isAddon = i.cat === "Add-ons";

  return (
    <li className="flex items-center gap-3 py-3.5">
      <div
        className={`h-14 w-14 shrink-0 grid place-items-center rounded-xl ${
          isAddon
            ? "bg-leaf/10 border border-leaf/20 text-leaf"
            : "bg-ye/10 border border-ye/20 text-ye"
        }`}
      >
        <Icon size={26} strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-end">
          <span className="font-semibold leading-tight">{i.name}</span><span className="leader hidden sm:block" /><span className="font-display font-black text-ye text-lg ml-auto sm:ml-0">₹{i.price}</span>
        </div>
        {i.tag && <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${i.tag === "New" ? "bg-leaf text-ink" : "bg-ye/15 text-ye"}`}>{i.tag}</span>}
      </div>
      {q === 0 ? <button aria-label={`Add ${i.name}`} onClick={() => add(i)} className="grid place-items-center h-10 w-10 rounded-full bg-ye text-ink shrink-0"><Plus size={20} /></button>
        : <Stepper q={q} onAdd={() => add(i)} onDec={() => dec(i.id)} />}
    </li>
  );
}
