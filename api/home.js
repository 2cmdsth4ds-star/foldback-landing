// Sirve la portada con el precio del país del visitante ya escrito en el HTML.
// La regla es la misma para todos (personas y buscadores): Google rastrea desde
// Estados Unidos, así que ve el precio en USD, igual que cualquier visitante de allá.
import { precioPara } from "./_precios.js";

export const config = { runtime: "edge" };

function formato(cur, n) {
  if (cur === "PEN") return "S/" + new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(n);
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: cur, currencyDisplay: "narrowSymbol", maximumFractionDigits: 0 }).format(n);
}

function inyectar(html, p) {
  const f = (n) => formato(p.cur, n);
  // Funciones (no cadenas) como reemplazo, porque "$29" dentro de una cadena se
  // interpretaría como referencia a un grupo de la expresión.
  const poner = (re, texto) => { html = html.replace(re, (_, a, b) => a + texto + b); };
  poner(/(<span data-price="m">)[^<]*(<\/span>)/, f(p.m));
  poner(/(<span data-price="y">)[^<]*(<\/span>)/, f(p.y));
  poner(/(<small data-price-unit="m">)[^<]*(<\/small>)/, `${p.cur} / mes`);
  poner(/(<small data-price-unit="y">)[^<]*(<\/small>)/, `${p.cur} / año`);
  // Celdas del ejemplo de propuesta, en orden.
  let i = 0;
  html = html.replace(/(<td class="r" data-mock="[0-9]+">)[^<]*(<\/td>)/g, (_, a, b) => `${a}${f(p.ejemplo[i++] ?? 0)}${b}`);
  const total = p.ejemplo.reduce((s, v) => s + v, 0);
  poner(/(<td class="r" data-mock-total>)[^<]*(<\/td>)/, `${f(total)} ${p.cur}`);

  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FoldBack",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://foldback.io/",
    offers: [
      { "@type": "Offer", name: "Mensual", price: String(p.m), priceCurrency: p.cur },
      { "@type": "Offer", name: "Anual", price: String(p.y), priceCurrency: p.cur },
    ],
  };
  const cabeza =
    `<script>window.__PRECIO=${JSON.stringify(p)}</script>\n` +
    `<script type="application/ld+json">${JSON.stringify(ld)}</script>\n`;
  return html.replace("</head>", () => cabeza + "</head>");
}

export default async function handler(request) {
  const origen = new URL(request.url).origin;
  let res;
  try {
    res = await fetch(origen + "/index.html");
  } catch (e) {
    return new Response("No se pudo cargar la página.", { status: 502 });
  }
  if (!res.ok) return new Response("No se pudo cargar la página.", { status: 502 });
  const html = inyectar(await res.text(), precioPara(request.headers.get("x-vercel-ip-country")));
  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-store",
      "vary": "x-vercel-ip-country",
    },
  });
}
