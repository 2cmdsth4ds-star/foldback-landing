# Notas de FoldBack Landing

## Redirects (`vercel.json`)
- `foldback.io/demo`, `/demo/` y `/demo/*` redirigen a `demo.foldback.io` con 307 (temporal, a propósito, para que los navegadores no lo guarden en caché mientras se prueba).
- Cuando esté estable, cambiar `"permanent": false` a `true` (308).
- Los botones de la página ya apuntan directo a `demo.foldback.io`; el redirect es solo para quien escriba `foldback.io/demo`.

## Idiomas (i18n)
- Idiomas hoy: español (`i18n/es.json`) e inglés (`i18n/en.json`). El español también vive en el HTML como respaldo (SEO y sin JS).
- Detección: preferencia guardada (`localStorage: fb-lang`) → idiomas del navegador, en orden → inglés si no hay coincidencia.
- Cada texto traducible lleva `data-i18n="clave"` (o `data-i18n-html`, `data-i18n-alt`, `data-i18n-title`, `data-i18n-aria-label`). Los eslóganes del hero, los metadatos y las etiquetas del carrusel viven solo en los JSON.
- **Agregar un idioma:** copia `i18n/en.json` a `i18n/<codigo>.json`, tradúcelo (mantén las claves y los marcadores `{i}`/`{n}`) y suma `{code:'<codigo>',name:'Nombre'}` a `window.FB_LANGS` en el `<head>` de `index.html`. El selector lo muestra solo.
- Si cambias un texto en español del HTML, actualiza también su clave en `i18n/es.json` y en los demás idiomas.
- Pendiente: las capturas y el demo siguen en español; los precios están en MXN.
