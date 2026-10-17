// Precios de FoldBack por moneda y reglas para elegir la moneda según el país.
// Es la única fuente de verdad: la usan api/home.js (que escribe el precio en el
// HTML) y api/precio.js. Deben coincidir con lo que cobre el sistema de pagos.
// Formato: [mensual, anual].
export const PRECIOS = {
  MXN: [350, 3500], USD: [29, 290], EUR: [29, 290], GBP: [25, 250], CAD: [39, 390],
  AUD: [45, 450], BRL: [99, 990], COP: [79000, 790000], CLP: [17000, 170000], PEN: [69, 690],
};
const EURO = "AT BE BG HR CY EE FI FR DE GR IE IT LV LT LU MT NL PT SK SI ES".split(" ");
const MONEDA = { MX: "MXN", US: "USD", CA: "CAD", GB: "GBP", AU: "AUD", BR: "BRL", CO: "COP", CL: "CLP", PE: "PEN" };
// Tipo de cambio aproximado desde MXN, solo para el ejemplo de propuesta de la
// página (lo que cobra un estudio), no para el precio de FoldBack.
const CAMBIO = { MXN: 1, USD: 0.055, EUR: 0.05, GBP: 0.043, CAD: 0.075, AUD: 0.083, BRL: 0.29, COP: 215, CLP: 50, PEN: 0.2 };
const EJEMPLO_MXN = [8000, 4500, 1500];

function redondo(v) {
  const paso = Math.max(Math.pow(10, Math.floor(Math.log10(v)) - 1), v < 100 ? 5 : 1);
  return Math.round(v / paso) * paso;
}

export function precioPara(pais) {
  const p = (pais || "").toString().toUpperCase().slice(0, 2);
  const cur = EURO.includes(p) ? "EUR" : MONEDA[p] || "USD";
  const [m, y] = PRECIOS[cur];
  const ejemplo = EJEMPLO_MXN.map((v) => (cur === "MXN" ? v : redondo(v * CAMBIO[cur])));
  return { cur, m, y, ejemplo };
}
