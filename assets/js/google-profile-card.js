(function () {
  const profileUrl = 'https://www.google.com/maps/search/?api=1&query=360%20SOLUCIONES%20Calle%20Camejor%20Av.%20Montilla%20Barinas';
  const municipality = document.querySelector('meta[property="og:title"]')?.content.match(/en (.+?)(?:,| \|)/)?.[1] || 'Barinas';
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = '/assets/css/site-local-content.css';
  document.head.appendChild(style);
  const localSection = document.createElement('section');
  localSection.className = 'site-local-content';
  localSection.innerHTML = '<div class="site-local-content-inner"><h2>Diseño de páginas webs en ' + municipality + '</h2><p>Creamos páginas web profesionales, rápidas y optimizadas para que los negocios de ' + municipality + ' sean encontrados y contacten con más clientes.</p><div class="site-local-actions"><a class="site-google-button" href="' + profileUrl + '" target="_blank" rel="noopener">Ver perfil y reseñas en Google</a><button class="site-testimonials-button" type="button" data-testimonials-open>Ver testimonios</button></div></div>';
  document.body.insertBefore(localSection, document.body.firstChild);
  const modal = document.createElement('div');
  modal.className = 'testimonials-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = '<div class="testimonials-dialog" role="dialog" aria-modal="true" aria-labelledby="testimonials-title"><button class="testimonials-close" type="button" data-testimonials-close aria-label="Cerrar testimonios">&times;</button><p class="testimonials-kicker">Opiniones verificables</p><h2 id="testimonials-title">Lo que dicen nuestros clientes</h2><div class="testimonials-list"><blockquote>“Excelente servicio y atención, mis ventas han aumentado significativamente.”<cite>Albeiro Morales</cite></blockquote><blockquote>“Excelente servicio, lo mejor de lo mejor, muy contento con su gran labor.”<cite>Technician Jose Urbina</cite></blockquote><blockquote>“Gracias por la página y el perfil.”<cite>Jose Serrano</cite></blockquote></div><a class="site-google-button" href="' + profileUrl + '" target="_blank" rel="noopener">Leer todas las reseñas en Google</a><a class="testimonials-page-link" href="/testimonios/">Ver página completa de testimonios</a></div>';
  document.body.appendChild(modal);
  const openModal = function () { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); };
  const closeModal = function () { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); };
  localSection.querySelector('[data-testimonials-open]').addEventListener('click', openModal);
  modal.querySelector('[data-testimonials-close]').addEventListener('click', closeModal);
  modal.addEventListener('click', function (event) { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeModal(); });
  const target = document.querySelector('[data-google-profile]');
  if (!target) return;
  target.innerHTML = '<div class="profile-card card" itemscope itemtype="https://schema.org/LocalBusiness">' +
    '<div class="google-title" itemprop="name">360 SOLUCIONES</div>' +
    '<div class="rating" aria-label="5 de 5 estrellas">★★★★★ <span>5,025 opiniones en Google</span></div>' +
    '<p><strong>Agencia de publicidad en Barinas</strong></p>' +
    '<dl><dt>Dirección</dt><dd itemprop="address">Calle Camejor, Av. Montilla, Barinas 5201, Barinas</dd><dt>Teléfono</dt><dd itemprop="telephone">0416-7775771</dd></dl>' +
    '<a class="button" href="' + profileUrl + '" target="_blank" rel="noopener">Ver perfil y reseñas originales en Google</a>' +
    '</div>';
})();
