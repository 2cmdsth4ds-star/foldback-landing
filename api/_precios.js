// Precios de FoldBack por moneda y reglas para elegir la moneda según el país.
// Es la única fuente de verdad: la usan api/home.js (que escribe el precio en el
// HTML) y api/precio.js. Deben coincidir con lo que cobre el sistema de pagos.
// Formato: [mensual, anual].
export const PRECIOS = { MXN: [350, 3500], USD: [29, 290] };
// Igual que la app (Admin → Precios): México paga en pesos y el resto del mundo en dólares.
// Para agregar una moneda hace falta darla de alta primero en la app y en Stripe.
const MONEDA = { MX: "MXN" };
// Tipo de cambio aproximado desde MXN, solo para el ejemplo de propuesta de la
// página (lo que cobra un estudio), no para el precio de FoldBack.
const CAMBIO = { MXN: 1, USD: 0.055 };
const EJEMPLO_MXN = [8000, 4500, 1500];

function redondo(v) {
  const paso = Math.max(Math.pow(10, Math.floor(Math.log10(v)) - 1), v < 100 ? 5 : 1);
  return Math.round(v / paso) * paso;
}

export function precioPara(pais) {
  const p = (pais || "").toString().toUpperCase().slice(0, 2);
  const cur = MONEDA[p] || "USD";
  const [m, y] = PRECIOS[cur];
  const ejemplo = EJEMPLO_MXN.map((v) => (cur === "MXN" ? v : redondo(v * CAMBIO[cur])));
  return { cur, m, y, ejemplo };
}
