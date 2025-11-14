// assets/js/load-menu.js
(function() {
    'use strict';

    const menuConfig = {
        menuPath: '/menu.html',
        fallbackEnabled: true,
        cache: true
    };

    let menuCache = null;

    function loadMenu() {
        // Si tenemos cache y está habilitado, usar cache
        if (menuCache && menuConfig.cache) {
            insertMenu(menuCache);
            return;
        }

        fetch(menuConfig.menuPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Cachear el menú
                if (menuConfig.cache) {
                    menuCache = html;
                }
                insertMenu(html);
            })
            .catch(error => {
                console.error('Error cargando el menú:', error);
                if (menuConfig.fallbackEnabled) {
                    showFallbackMenu();
                }
            });
    }

    function insertMenu(html) {
        // Crear un contenedor temporal para el menú
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const head = document.head || document.getElementsByTagName('head')[0];

        // Mover <link rel="stylesheet"> al head (si no existe)
        tempDiv.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !head.querySelector(`link[href="${href}"]`)) {
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = href;
                head.appendChild(newLink);
            }
            if (link.parentNode) link.parentNode.removeChild(link);
        });

        // Mover estilos <style> al head
        tempDiv.querySelectorAll('style').forEach(style => {
            const newStyle = document.createElement('style');
            newStyle.textContent = style.textContent;
            head.appendChild(newStyle);
            if (style.parentNode) style.parentNode.removeChild(style);
        });

        // Extraer scripts para ejecutarlos después
        const scripts = Array.from(tempDiv.querySelectorAll('script'));
        scripts.forEach(s => { if (s.parentNode) s.parentNode.removeChild(s); });

        // Antes de insertar, eliminar menús existentes que parezcan ser la cabecera del sitio
        try {
            // eliminar <nav> que contengan el texto GRADO33 o el logo interno
            Array.from(document.querySelectorAll('nav')).forEach(n => {
                const text = (n.textContent || '').toUpperCase();
                const html = (n.innerHTML || '').toLowerCase();
                if (text.includes('GRADO33') || html.includes('logo-grado33') || html.includes('g33')) {
                    n.parentNode.removeChild(n);
                }
            });

            // eliminar elementos móviles/overlay si existen
            const mobile = document.getElementById('mobileMenu'); if (mobile && mobile.parentNode) mobile.parentNode.removeChild(mobile);
            const overlayEl = document.getElementById('overlay'); if (overlayEl && overlayEl.parentNode) overlayEl.parentNode.removeChild(overlayEl);
        } catch (err) {
            // no bloquear si algo falla
            console.warn('No se pudo limpiar menú existente:', err);
        }

        // Insertar todo el resto del contenido del menú al inicio del body
        while (tempDiv.firstChild) {
            document.body.insertBefore(tempDiv.firstChild, document.body.firstChild);
        }

        // Ejecutar scripts (se crean nuevos elementos para forzar ejecución)
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
                // Preservar el orden de ejecución cuando sea necesario
                newScript.async = false;
            } else {
                newScript.textContent = script.textContent;
            }
            document.head.appendChild(newScript);
        });

        console.log('Menú cargado exitosamente');
    }

    function showFallbackMenu() {
        const fallbackMenu = `
            <nav class="main-nav" style="background: #f8f9fa; padding: 15px 0; position: sticky; top: 0; z-index: 1000;">
                <div class="nav-container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center;">
                    <a href="/" class="logo" style="display: flex; align-items: center; text-decoration: none; color: #333;">
                        <div style="width: 40px; height: 40px; background: #007bff; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 10px;">G33</div>
                        <div>
                            <div style="font-weight: bold; line-height: 1.2;">GRADO33</div>
                            <div style="font-size: 0.9em; line-height: 1.2;">MARKETING BARINAS</div>
                        </div>
                    </a>
                    <a href="https://wa.me/584167775771" style="background: #25D366; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
                        <span>📱</span> WhatsApp
                    </a>
                </div>
            </nav>
        `;
        document.body.insertAdjacentHTML('afterbegin', fallbackMenu);
        console.log('Menú de respuesto cargado');
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadMenu);
    } else {
        loadMenu();
    }

    // Exportar funciones para uso global si es necesario
    window.menuLoader = {
        reload: loadMenu,
        clearCache: () => { menuCache = null; }
    };
})();