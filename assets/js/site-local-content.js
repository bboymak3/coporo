(function () {
  const profileUrl = 'https://www.google.com/maps/search/?api=1&query=360%20SOLUCIONES%20Calle%20Camejor%20Av.%20Montilla%20Barinas';
  if (document.querySelector('.site-local-content')) return;
  const path = window.location.pathname.toLowerCase();
  const municipalityByPath = {
    '/barinas/arismendi/': 'Arismendi',
    '/barinas/barinas/': 'Barinas',
    '/barinas/barinitas/': 'Barinitas',
    '/barinas/barrancas/': 'Barrancas',
    '/barinas/ciudad-bolivia/': 'Ciudad Bolivia',
    '/barinas/ciudad-de-nutrias/': 'Ciudad de Nutrias',
    '/barinas/el-canton/': 'El Cantón',
    '/barinas/libertad/': 'Libertad',
    '/barinas/obispos/': 'Obispos',
    '/barinas/sabaneta/': 'Sabaneta',
    '/barinas/santa-barbara/': 'Santa Bárbara',
    '/barinas/socopo/': 'Socopó'
  };
  const municipality = municipalityByPath[path] || 'Barinas';
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = '/assets/css/site-local-content.css';
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.className = 'site-local-content';
  section.innerHTML = '<div class="site-local-content-inner">' +
    '<h2>Diseño de páginas webs en ' + municipality + '</h2>' +
    '<p>Creamos páginas web profesionales, rápidas y optimizadas para que los negocios de ' + municipality + ' sean encontrados y contacten con más clientes.</p>' +
    '<div class="site-local-actions"><a class="site-google-button" href="' + profileUrl + '" target="_blank" rel="noopener">Ver perfil y reseñas en Google</a>' +
    '<button class="site-testimonials-button" type="button" data-testimonials-open>Ver testimonios</button></div>' +
    '</div>';
  document.body.insertBefore(section, document.body.firstChild);

  const modal = document.createElement('div');
  modal.className = 'testimonials-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = '<div class="testimonials-dialog" role="dialog" aria-modal="true" aria-labelledby="testimonials-title">' +
    '<button class="testimonials-close" type="button" data-testimonials-close aria-label="Cerrar testimonios">&times;</button>' +
    '<p class="testimonials-kicker">Opiniones verificables</p><h2 id="testimonials-title">Lo que dicen nuestros clientes</h2>' +
    '<div class="testimonials-list"><blockquote>“Excelente experiencia trabajando con el equipo de 360 Soluciones desde Barinas. La plataforma quedó rápida, moderna y lista para captar clientes.”<cite>Optimus Cars</cite></blockquote>' +
    '<blockquote>“Excelente servicio y atención, mis ventas han aumentado significativamente al punto que ya tengo más personal trabajando conmigo.”<cite>Albeiro Morales</cite></blockquote>' +
    '<blockquote>“Desde New Jersey, muy agradecido con su excelente servicio, lo mejor de lo mejor, muy contento con su gran labor.”<cite>Technician Jose Urbina</cite></blockquote>' +
    '<blockquote>“Excelente servicio, gran disposición. Me ayudó con mi página web informando cada paso que daba.”<cite>Diego Rebolledo</cite></blockquote>' +
    '<blockquote>“La mejor experiencia que tuve, excelente información, resuelven dudas e inquietudes a la brevedad.”<cite>Víctor Rincón</cite></blockquote>' +
    '<blockquote>“Son suficientemente responsables, desempeñan su trabajo con profesionalismo y la atención es excelente.”<cite>Norelis Collado</cite></blockquote></div>' +
    '<a class="site-google-button" href="' + profileUrl + '" target="_blank" rel="noopener">Leer todas las reseñas en Google</a>' +
    '<a class="testimonials-page-link" href="/testimonios/">Ver página completa de testimonios</a></div>';
  document.body.appendChild(modal);
  const openModal = function () { modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); };
  const closeModal = function () { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); };
  section.querySelector('[data-testimonials-open]').addEventListener('click', openModal);
  modal.querySelector('[data-testimonials-close]').addEventListener('click', closeModal);
  modal.addEventListener('click', function (event) { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeModal(); });
}());
