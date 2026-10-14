"use client";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useCart, Stepper } from "./Cart";
import { type Item } from "@/lib/menu";

export function imgForItem(item: Item): string {
  const name = item.name.toLowerCase();
  const cat = item.cat;

  if (cat === "Sandwiches") {
    if (name.includes("cheese") || name.includes("corn")) return "/img/menu/sandwich-cheese.jpg";
    if (name.includes("paneer")) return "/img/menu/sandwich-paneer.jpg";
    if (name.includes("coleslaw")) return "/img/menu/sandwich-coleslaw.jpg";
    return "/img/menu/sandwich-classic.jpg";
  }

  if (cat === "Burgers") {
    if (name.includes("paneer")) return "/img/menu/burger-paneer.jpg";
    if (name.includes("double")) return "/img/menu/burger-double.jpg";
    if (name.includes("cheese")) return "/img/menu/burger-cheese.jpg";
    if (name.includes("veggie")) return "/img/menu/burger-veggie.jpg";
    return "/img/menu/burger-classic.jpg";
  }

  if (cat === "Fries") {
    if (name.includes("peri")) return "/img/menu/fries-peri.jpg";
    if (name.includes("saucy") || name.includes("tandoori")) return "/img/menu/fries-saucy.jpg";
    return "/img/menu/fries-salted.jpg";
  }

  if (cat === "Quick Bites") {
    if (name.includes("onion") || name.includes("ring")) return "/img/menu/bites-rings.jpg";
    if (name.includes("momo")) return "/img/menu/bites-momos.jpg";
    if (name.includes("finger")) return "/img/menu/bites-fingers.jpg";
    return "/img/menu/bites-pops.jpg";
  }

  if (cat === "Coffee") {
    if (name.includes("cold")) return "/img/menu/coffee-cold.jpg";
    return "/img/menu/coffee-hot.jpg";
  }

  if (cat === "Combos") {
    return "/img/menu/combo-meal.jpg";
  }

  if (cat === "Add-ons") {
    if (name.includes("dip")) return "/img/menu/addon-dip.jpg";
    return "/img/menu/addon-cheese.jpg";
  }

  return "/img/menu/sandwich-classic.jpg";
}

export function ItemRow({ i }: { i: Item }) {
  const { qty, add, dec } = useCart();
  const q = qty(i.id);
  const imgSrc = imgForItem(i);

  return (
    <li className="flex items-center gap-3 py-3.5">
      <div className="relative h-14 w-14 rounded-xl overflow-hidden shrink-0 border border-line bg-card shadow-sm">
        <Image
          src={imgSrc}
          alt={i.name}
          width={56}
          height={56}
          className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-end">
          <span className="font-semibold leading-tight">{i.name}</span>
          <span className="leader hidden sm:block" />
          <span className="font-display font-black text-ye text-lg ml-auto sm:ml-0">₹{i.price}</span>
        </div>
        {i.tag && (
          <span
            className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${
              i.tag === "New" ? "bg-leaf text-ink" : "bg-ye/15 text-ye"
            }`}
          >
            {i.tag}
          </span>
        )}
      </div>
      {q === 0 ? (
        <button
          aria-label={`Add ${i.name}`}
          onClick={() => add(i)}
          className="grid place-items-center h-10 w-10 rounded-full bg-ye text-ink shrink-0 hover:bg-ye/90 transition-colors"
        >
          <Plus size={20} />
        </button>
      ) : (
        <Stepper q={q} onAdd={() => add(i)} onDec={() => dec(i.id)} />
      )}
    </li>
  );
}
