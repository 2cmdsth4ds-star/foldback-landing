// Devuelve el país del visitante (código ISO de 2 letras) según el edge de Vercel.
// La landing lo usa para mostrar los precios en la moneda local.
export default function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");
  const country = (req.headers["x-vercel-ip-country"] || "").toString().toUpperCase().slice(0, 2) || null;
  res.status(200).json({ country });
}
