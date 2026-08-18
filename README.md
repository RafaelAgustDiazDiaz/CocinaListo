# CocinaListo — Landing page para GitHub Pages

Página estática de presentación para CocinaListo. No requiere instalación, compilación ni dependencias.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube todos los archivos de esta carpeta a la raíz del repositorio.
3. En GitHub, abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige la rama `main`, carpeta `/ (root)` y guarda.
6. GitHub mostrará la dirección pública cuando termine la publicación.

## Personalización opcional

- El botón principal ya abre la aplicación publicada de CocinaListo.
- Si el repositorio cambia de nombre, no necesitas modificar rutas: todos los recursos usan rutas relativas.
- Cuando conozcas la URL final de GitHub Pages, cambia `og:image` y `twitter:image` en `index.html` por la URL absoluta de `assets/social-card.png` para mejorar las vistas previas al compartir.

## Archivos principales

- `index.html`: contenido y estructura.
- `styles.css`: diseño responsive.
- `script.js`: menú, animaciones y demo interactiva.
- `assets/`: logo, favicon y tarjeta para redes sociales.
