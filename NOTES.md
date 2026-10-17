# Notas de FoldBack Landing

## Redirects (`vercel.json`)
- `foldback.io/demo`, `/demo/` y `/demo/*` redirigen a `demo.foldback.io` con 307 (temporal, a propósito, para que los navegadores no lo guarden en caché mientras se prueba).
- Cuando esté estable, cambiar `"permanent": false` a `true` (308).
- Los botones de la página ya apuntan directo a `demo.foldback.io`; el redirect es solo para quien escriba `foldback.io/demo`.

## Idiomas (i18n)
- Idiomas hoy: español (`i18n/es.json`) e inglés (`i18n/en.json`). El español también vive en el HTML como respaldo (SEO y sin JS).
- Detección: preferencia guardada (`localStorage: fb-lang`) → idiomas del navegador, en orden → inglés si no hay coincidencia.
- Cada texto traducible lleva `data-i18n="clave"` (o `data-i18n-html`, `data-i18n-alt`, `data-i18n-title`, `data-i18n-aria-label`). Los eslóganes del hero, los metadatos y las etiquetas del carrusel viven solo en los JSON.
- **Agregar un idioma:** copia `i18n/en.json` a `i18n/<codigo>.json`, tradúcelo (mantén las claves y los marcadores `{i}`/`{n}`) y suma `{code:'<codigo>',name:'Nombre'}` a `window.FB_LANGS` en el `<head>` de `landing.html`. El selector lo muestra solo.
- Si cambias un texto en español del HTML, actualiza también su clave en `i18n/es.json` y en los demás idiomas.
- Pendiente: las capturas y el demo siguen en español; los precios están en MXN.

## Precios por moneda
- Los precios viven solo en el servidor, en `api/_precios.js` (`PRECIOS`, formato `[mensual, anual]`). `api/home.js` (función edge) sirve la portada `/` y **escribe en el HTML** el precio del país del visitante (header `x-vercel-ip-country`), más los datos estructurados `SoftwareApplication` con la misma cifra. Todos reciben la misma regla, personas y buscadores: Google rastrea desde EE. UU. y ve el precio en USD; México ve MXN. Mostrarle a Google un precio distinto al que ven las personas sería *cloaking* y está penalizado.
- La portada es la plantilla **`landing.html`** (ya no `index.html`, porque Vercel sirve primero los archivos estáticos y `index.html` taparía la reescritura). `vercel.json` reescribe `/` hacia `/api/home`, que lee `landing.html` y le escribe el precio. `/landing.html` directo sigue existiendo, con `noindex` y sin precios escritos; ahí el navegador pide `/api/precio` como respaldo. Si `api/home` falla, redirige a `/landing.html`.
- Sin país (robots sin geolocalización) o país sin precio propio: USD. No hay selector de moneda ni `?cc=`.
- Hoy (precio de fundador, primeros 30 estudios, 2026-10-17): MXN 350/3,500 · USD 29/290 · EUR 29/290 · GBP 25/250 · CAD 39/390 · AUD 45/450 · BRL 99/990 · COP 79,000/790,000 · CLP 17,000/170,000 · PEN 69/690. Precio normal previsto: MXN 499 / USD 39.
- Lo que cobre el sistema de pagos debe coincidir. El candado real es al cobrar: cada moneda solo para tarjetas/facturación de su país.
- El ejemplo de propuesta usa montos base en MXN (8,000 / 4,500 / 1,500) convertidos con un tipo de cambio aproximado (`CAMBIO`), no con la proporción de precios.
- Para agregar una moneda: su línea en `PRECIOS` y `CAMBIO`, y el país en `MONEDA` (o en `EURO`), todo en `api/_precios.js`.
- Para probar un país sin VPN: ejecutar `precioPara("DE")` de `api/_precios.js` o llamar al handler de `api/home.js` con un `Request` que traiga el header `x-vercel-ip-country`.

## Secciones nuevas (2026-10-17)
- "¿Te suena familiar?" (`pain.*`), antes de la comparación; "Así se vive una sesión con FoldBack" (`flow.*`), después de las funciones.
- Sin formulario de contacto (se quitó el 2026-10-17): "Suscribirse" lleva a precios hasta que exista el cobro. `api/lead.js` se eliminó.
- La captura del iPhone (`demo-movil.jpg`) es la versión móvil real del demo (390×~1020 px, sin el aviso del demo).
- Pendiente: caso real de Blacklab (testimonio con datos verdaderos), video corto, publicar privacidad y términos.
- Reservas en línea (2026-10-17): sección `#reservas` (capturas `demo-reservas.jpg` y `demo-reservar-movil.jpg`, tomadas del demo en `/reservas` y `/reservar/aurora-demo`), un punto nuevo en "Gestión del estudio", una pregunta frecuente y ajustes a "¿Te suena familiar?" y a "Así se vive una sesión". Solo se afirma lo que hace la app hoy: solicitud pendiente que el estudio confirma, correo al cliente y página embebible. El anticipo en línea con tarjeta NO está en la app; no se menciona.
