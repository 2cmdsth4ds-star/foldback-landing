// Función serverless de Vercel: guarda un prospecto en Supabase (tabla sp_leads).
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // req.body puede venir ya parseado (JSON) o como string
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  const nombre = (body.nombre || "").toString().slice(0, 200);
  const estudio = (body.estudio || "").toString().slice(0, 200);
  const contacto = (body.contacto || "").toString().trim().slice(0, 200);
  const mensaje = (body.mensaje || "").toString().slice(0, 2000);

  if (!contacto) {
    res.status(400).json({ error: "Falta un correo o WhatsApp de contacto." });
    return;
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    res.status(500).json({ error: "Configuración incompleta del servidor." });
    return;
  }

  try {
    const r = await fetch(`${url}/rest/v1/sp_leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ nombre, estudio, contacto, mensaje, origen: "landing" }),
    });
    if (!r.ok) {
      const detail = await r.text();
      res.status(500).json({ error: "No se pudo guardar el mensaje.", detail });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
