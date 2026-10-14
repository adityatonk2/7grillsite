import { SHOP, ROAD_FACTOR } from "./config";
export const TIERS = [{ max: 3, fee: 20, label: "1-3 km" }, { max: 5, fee: 35, label: "3-5 km" }, { max: 7, fee: 50, label: "5-7 km" }, { max: 10, fee: 60, label: "7-10 km" }];
export const feeFor = (km: number) => TIERS.find((t) => km <= t.max)?.fee ?? null;
export function kmFrom(lat: number, lng: number) {
  const r = (d: number) => (d * Math.PI) / 180, R = 6371;
  const a = Math.sin(r(lat - SHOP.lat) / 2) ** 2 + Math.cos(r(SHOP.lat)) * Math.cos(r(lat)) * Math.sin(r(lng - SHOP.lng) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a)) * ROAD_FACTOR;
}
