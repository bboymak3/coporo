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
        
        // Insertar el menú al inicio del body
        const menuElement = tempDiv.firstElementChild;
        if (menuElement) {
            document.body.insertBefore(menuElement, document.body.firstChild);
            
            // Ejecutar scripts del menú
            const scripts = tempDiv.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.head.appendChild(newScript);
            });
            
            console.log('Menú cargado exitosamente');
        }
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