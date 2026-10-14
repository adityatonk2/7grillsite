// ===== EDIT THESE FOR THE CLIENT =====
export const WHATSAPP = "917500374462"; // country code + number, no +
export const PHONES = ["7500374462", "7253005775"];
export const INSTAGRAM = "https://www.instagram.com/7.grillzz/";
export const SWIGGY = "https://www.swiggy.com/city/dehradun/7-grill-chukkuwala-rest1288368";
export const MAGICPIN = "https://magicpin.in/Dehradun/Khurbura/Restaurant/7-Grill/store/21a9cb1?srsltid=AU7gw4Vz1JreA_UMXsgk6XMaxvRFxFmmvnlEbVo9SH2yFLPozaqMaZ8g";
// Optional: paste verified Google Place ID (Business Profile > "Ask for reviews"). Leave "" to use the Maps listing instead.
export const PLACE_ID = "ChIJN3j1BgApCTkRQqO70fVqT90";
export const GOOGLE_REVIEW = PLACE_ID
  ? `https://search.google.com/local/writereview?placeid=${PLACE_ID}`
  : "https://www.google.com/maps/search/?api=1&query=7+Grill+35+Kanwali+Road+Dehradun";
// Shop coordinates. Approximate (Kanwali Road). For exact fees: Google Maps > right-click shop pin > copy lat,lng.
export const SHOP = { lat: 30.3201797, lng: 78.0276566 };
export const ROAD_FACTOR = 1.2; // straight-line km x this ~ road km
export const DIRECTIONS = "https://www.google.com/maps/dir/?api=1&destination=30.3201797,78.0276566";
export const ADDRESS = "35, Kanwali Road, Dehradun, Uttarakhand";
