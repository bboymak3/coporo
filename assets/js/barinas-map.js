(function () {
  const mapElement = document.getElementById('barinas-map');
  const listElement = document.getElementById('barinas-map-list-items');
  if (!mapElement || !listElement || typeof L === 'undefined') return;

  const municipalities = [
    ['Alberto Arvelo Torrealba', 'Sabaneta', 8.758, -69.941, 'sabaneta'],
    ['Andrés Eloy Blanco', 'El Cantón', 7.424, -71.879, 'el-canton'],
    ['Antonio José de Sucre', 'Socopó', 8.235, -70.821, 'socopo'],
    ['Arismendi', 'Arismendi', 8.480, -69.995, 'arismendi'],
    ['Barinas', 'Barinas', 8.6226, -70.2075, 'barinas'],
    ['Bolívar', 'Barinitas', 8.762, -70.411, 'barinitas'],
    ['Cruz Paredes', 'Barrancas', 8.589, -70.215, 'barrancas'],
    ['Ezequiel Zamora', 'Santa Bárbara', 8.434, -71.175, 'santa-barbara'],
    ['Obispos', 'Obispos', 8.602, -70.204, 'obispos'],
    ['Pedraza', 'Ciudad Bolivia', 7.915, -71.435, 'ciudad-bolivia'],
    ['Rojas', 'Libertad', 8.312, -69.747, 'libertad'],
    ['Sosa', 'Ciudad de Nutrias', 8.095, -69.306, 'ciudad-de-nutrias']
  ];

  const map = L.map(mapElement, { scrollWheelZoom: false }).setView([8.45, -70.55], 8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  municipalities.forEach(([municipality, capital, latitude, longitude, slug]) => {
    const landingUrl = '/barinas/' + slug + '/';
    const popup = '<strong>' + municipality + '</strong><br>Capital: ' + capital + '<br><a href="' + landingUrl + '">Ver landing local</a>';
    const marker = L.marker([latitude, longitude]).addTo(map).bindPopup(popup);
    const button = document.createElement('a');
    button.className = 'barinas-map-place';
    button.href = landingUrl;
    button.innerHTML = '<strong>' + municipality + '</strong><span>Capital: ' + capital + '</span>';
    button.addEventListener('click', function (event) {
      if (window.matchMedia('(min-width: 768px)').matches) {
        event.preventDefault();
        map.setView([latitude, longitude], 10);
        marker.openPopup();
      }
    });
    listElement.appendChild(button);
  });

  const refreshMapSize = function () { map.invalidateSize(); };
  window.addEventListener('resize', refreshMapSize);
  window.addEventListener('load', refreshMapSize);
  setTimeout(refreshMapSize, 250);
}());
