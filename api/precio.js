// Precio de FoldBack para el país del visitante (según el edge de Vercel).
// La página normalmente ya trae el precio escrito (api/home.js); esto queda como
// respaldo si alguien abre /index.html directo.
import { precioPara } from "./_precios.js";

export default function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");
  res.status(200).json(precioPara(req.headers["x-vercel-ip-country"]));
}
