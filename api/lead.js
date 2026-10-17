// Recibe el formulario de la landing y lo manda por correo a FoldBack con Resend.
// Necesita la variable RESEND_API_KEY en Vercel (opcional: LEAD_TO para cambiar el destinatario).
const DESTINO = process.env.LEAD_TO || "hola@foldback.io";
const ORIGEN = "FoldBack <no-reply@foldback.io>";

const corto = (v, n) => (v == null ? "" : String(v)).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, n);

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.status(405).json({ error: "metodo" });
    return;
  }
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  // Campo trampa: las personas no lo ven; los robots lo llenan. Se responde "ok" sin enviar nada.
  if (corto(body.web, 50)) { res.status(200).json({ ok: true }); return; }

  const contacto = corto(body.contacto, 200);
  if (!contacto) { res.status(400).json({ error: "contacto" }); return; }

  const key = process.env.RESEND_API_KEY;
  if (!key) { res.status(503).json({ error: "config" }); return; }

  const datos = {
    Nombre: corto(body.nombre, 200),
    Estudio: corto(body.estudio, 200),
    Contacto: contacto,
    Interés: corto(body.interes, 100),
    Plan: corto(body.plan, 50),
    Mensaje: corto(body.mensaje, 2000),
    Idioma: corto(body.lang, 10),
    País: corto(req.headers["x-vercel-ip-country"], 2),
  };
  const texto = Object.entries(datos).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  const asunto = `Nuevo interesado en FoldBack: ${datos.Estudio || datos.Nombre || contacto}`.slice(0, 150);

  const payload = { from: ORIGEN, to: [DESTINO], subject: asunto, text: texto };
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto)) payload.reply_to = contacto;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) { res.status(502).json({ error: "envio" }); return; }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(502).json({ error: "envio" });
  }
}
