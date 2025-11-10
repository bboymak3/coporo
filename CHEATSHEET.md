# CHEATSHEET: Desarrollo y depuración básica (Grado33)

Este documento es un resumen práctico de los términos, comandos y pasos que usamos en el proyecto. Está en lenguaje sencillo y pensado para que lo imprimas o lo abras mientras pruebas localmente.

----
## 1. Objetivo
Tener una guía rápida para: levantar el sitio localmente, comprobar el menú central (`menu.html`) inyectado por `assets/js/load-menu.js`, y usar herramientas del navegador para depurar errores (404, JS, estilos).

----
## 2. Comandos útiles (PowerShell)
Abrir terminal en la raíz del repo (ejemplo: `e:\Documents\GitHub\grado33`):

```powershell
# Entrar al proyecto
cd 'e:\Documents\GitHub\grado33'

# Levantar un servidor estático (puerto 8000)
python -m http.server 8000
# Parar: Ctrl+C en la terminal donde se ejecuta

# Probar una URL desde la terminal (ver código/HTML)
Invoke-WebRequest -Uri http://localhost:8000/soluciones/crear-pagina-web/ -UseBasicParsing

# Listar archivos
ls
```

----
## 3. Rutas y links (por qué importan)
- Root-relative (recomendado para menús): empiezan con `/`. Ej: `/soluciones/crear-pagina-web/` — siempre apuntan desde la raíz del sitio.
- Relativas: no empiezan con `/`. Ej: `crear-pagina-web/` — dependen de la carpeta actual y pueden romperse (producir 404).

Consejo: en menús globales usa siempre rutas root-relative (`/soluciones/slug/`).

----
## 4. Señales comunes de problemas y cómo verificarlas
- Página devuelve 404 → URL mal formada o archivo no existe.
- Menú no aparece o aparece duplicado → revisa `assets/js/load-menu.js` y el contenido de `menu.html` (¿inserta dos veces?).
- Espacio blanco lateral en móvil → problema de CSS; busca `overflow-x` y `width` en `.mobile-menu`.

----
## 5. Uso básico de DevTools (navegador)
Abrir DevTools: F12 o Ctrl+Shift+I

- Elements (Inspector): ver y editar el HTML/CSS en vivo.
  - Útil para ver si `menu.html` fue inyectado (busca `class="main-nav"` o elementos del menú).

- Console: muestra errores JavaScript. Si `load-menu.js` falla, aquí verás el error (línea y descripción).

- Network: muestra todas las peticiones (filtrar por "menu.html" o por "load-menu.js").
  - Revisa el *Status* (200, 404, 304...).
  - Haz right-click → "Copy as cURL" si quieres replicarlo desde terminal.

- Device Toolbar (icono de teléfono en DevTools): emula móvil para probar el menú hamburguesa y detectar gaps.

Mini-pasos para debug en DevTools:
1. Abre Network, marca "Disable cache" y recarga la página (Ctrl+R).  
2. Filtra por `menu.html` y observa el código de respuesta.  
3. Si hay 404, copia la URL solicitada y compárala con la ruta real en el repo.  
4. Si hay error JS, ve a Console y lee el mensaje (por ejemplo: "Uncaught TypeError...").

----
## 6. HTTP - códigos que verás frecuentemente
- 200 — OK (archivo entregado).  
- 304 — Not Modified (navegador usa caché).  
- 404 — Not Found (ruta/archivo incorrecto).  
- 500 — Internal Server Error (no común en servidor estático simple).

----
## 7. Pasos rápidos para verificar el menú central (checklist)
1. Asegúrate de que el servidor local está corriendo: `python -m http.server 8000`.
2. Abre `http://localhost:8000/` en el navegador.  
3. En DevTools -> Network filtra por `menu.html` y confirma que responde 200.  
4. En Elements busca `.main-nav` o el logo `G33` para confirmar inyección.  
5. Prueba un enlace de `Soluciones` y confirma que la URL contiene `/soluciones/`.
6. En móvil (Device Toolbar) abre el menú hamburguesa y revisa que no haya espacio blanco lateral.

----
## 8. Términos clave (resumen rápido)
- HTML, CSS, JS — Estructura, estilo y comportamiento.  
- DOM — El HTML que JavaScript manipula.  
- DevTools — Herramientas del navegador (F12).  
- Root-relative — Rutas que empiezan con `/`.  
- Server local (`http.server`) — Sirve archivos desde tu PC; útil para probar.  
- Loader — Script que descarga `menu.html` y lo inserta en cada página.

----
## 9. Qué hacer si algo falló después de un cambio
1. Revisa la consola del navegador por errores JS.  
2. Revisa Network por 404/304 en `menu.html` o en otros recursos (CSS/JS).  
3. Si el problema vino de una edición en `menu.html`, abre ese archivo y revierte manualmente (o usa tu backup local si tienes uno).  
4. Reinicia el servidor y limpia caché (Ctrl+F5).

----
## 10. Recursos recomendados (rápidos)
- MDN Web Docs (mozilla.org) — referencia de HTML/CSS/JS.  
- Google DevTools docs — guías para usar Inspector/Network/Console.  

----
## 11. Notas finales / Atajos útiles
- Para comprobar sólo que un archivo existe: `Invoke-WebRequest -Uri http://localhost:8000/menu.html -UseBasicParsing`  
- Para ver la petición y el inicio del HTML desde la terminal (PowerShell):
```powershell
$r = Invoke-WebRequest -Uri http://localhost:8000/soluciones/crear-pagina-web/ -UseBasicParsing
$r.StatusCode
$r.RawContent[0..999] -join ''   # muestra los primeros bytes
```


Si quieres, puedo:
- Añadir ejemplos de capturas de DevTools en imágenes dentro del `CHEATSHEET.md`.
- Crear un archivo `CHEATSHEET_short.txt` con sólo comandos y pasos rápidos.

Dime si quieres que añada algo más específico y lo incluyo en el archivo. ¡Éxitos estudiando!