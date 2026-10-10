# Notas de FoldBack Landing

## Redirects (`vercel.json`)
- `foldback.io/demo`, `/demo/` y `/demo/*` redirigen a `demo.foldback.io` con 307 (temporal, a propósito, para que los navegadores no lo guarden en caché mientras se prueba).
- Cuando esté estable, cambiar `"permanent": false` a `true` (308).
- Los botones de la página ya apuntan directo a `demo.foldback.io`; el redirect es solo para quien escriba `foldback.io/demo`.
