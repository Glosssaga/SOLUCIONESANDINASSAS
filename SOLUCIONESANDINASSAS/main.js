// Datos de servicios
const servicios = [
  { id: 1, nombre: "Soporte TI en Línea", precio: 299000, imagen: "assets/img/soporte.jpg", descripcion: "Soporte técnico remoto 24/7.", stock: 7, promo: true },
  { id: 2, nombre: "Servicios en la Nube", precio: 399000, imagen: "assets/img/nube.jpg", descripcion: "Infraestructura segura y escalable.", stock: 15, promo: false },
  { id: 3, nombre: "Automatización de Procesos", precio: 500000, imagen: "assets/img/automatizacion.jpg", descripcion: "RPA y optimización.", stock: 5, promo: false },
  { id: 4, nombre: "Desarrollo de Software", precio: 1200000, imagen: "assets/img/software.jpg", descripcion: "Aplicaciones personalizadas.", stock: 3, promo: true },
  { id: 5, nombre: "Consultoría Digital", precio: 350000, imagen: "assets/img/consultoria.jpg", descripcion: "Diagnóstico y estrategia.", stock: 20, promo: false },
  { id: 6, nombre: "Virtualización de Servidores", precio: 890000, imagen: "assets/img/virtualizacion.jpg", descripcion: "Reducción de costos IT.", stock: 2, promo: false },
  { id: 7, nombre: "Backup y Recuperación", precio: 250000, imagen: "assets/img/backup.jpg", descripcion: "Protege tus datos.", stock: 10, promo: true },
  { id: 8, nombre: "Capacitación Digital", precio: 150000, imagen: "assets/img/capacitacion.jpg", descripcion: "Entrenamiento a equipos.", stock: 12, promo: false },
  { id: 9, nombre: "Ensamble de Computadores", precio: 180000, imagen: "assets/img/ensamble.jpg", descripcion: "Armado profesional.", stock: 9, promo: false },
  { id: 10, nombre: "Gestión de Redes", precio: 700000, imagen: "assets/img/redes.jpg", descripcion: "Configuración y soporte.", stock: 6, promo: false }
];

// Paginación para servicios.html
const pageSize = 3;
let currentPage = 1;
let serviciosFiltrados = servicios;

function renderizarServicios() {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const serviciosPag = serviciosFiltrados.slice(start, end);

  const container = document.getElementById('services-container');
  if (!container) return;
  container.innerHTML = '';

  serviciosPag.forEach(s => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card service-card h-100">
          <img src="${s.imagen}" class="card-img-top" alt="${s.nombre}">
          <div class="card-body">
            <h5 class="card-title">${s.nombre} ${s.promo ? '<span class="badge bg-danger ms-2">¡En promoción!</span>' : ''}</h5>
            <p class="card-text fw-bold text-primary">$${s.precio.toLocaleString()}</p>
            <p class="mb-1"><small>Stock: <span class="${s.stock <= 3 ? 'text-danger fw-bold' : 'text-success'}">${s.stock}</span></small></p>
            <a href="detalle-servicio.html?id=${s.id}" class="btn btn-outline-primary w-100">Ver Detalles</a>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById('pageInfo').innerText = `Página ${currentPage} de ${Math.ceil(serviciosFiltrados.length / pageSize)}`;
  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = end >= serviciosFiltrados.length;
}

document.getElementById('prevPage')?.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderizarServicios();
  }
});

document.getElementById('nextPage')?.addEventListener('click', () => {
  if ((currentPage * pageSize) < serviciosFiltrados.length) {
    currentPage++;
    renderizarServicios();
  }
});

document.getElementById('search')?.addEventListener('input', function () {
  const term = this.value.toLowerCase();
  serviciosFiltrados = servicios.filter(s => s.nombre.toLowerCase().includes(term));
  currentPage = 1;
  renderizarServicios();
});

// Detalle servicio
function renderizarDetalleServicio() {
  const container = document.getElementById('detail-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const s = servicios.find(serv => serv.id == id);

  if (!s) {
    container.innerHTML = "<div class='col-12'><h3>Servicio no encontrado.</h3></div>";
    return;
  }

  container.innerHTML = `
    <div class="col-lg-6">
      <img src="${s.imagen}" class="img-fluid rounded-3" alt="${s.nombre}" />
    </div>
    <div class="col-lg-6">
      <h1 class="fw-bold mb-2">${s.nombre} ${s.promo ? '<span class="badge bg-danger">¡En promoción!</span>' : ''}</h1>
      <h3 class="mb-3 text-primary">$${s.precio.toLocaleString()}</h3>
      <p class="lead">${s.descripcion}</p>
      <ul>
        <li>Stock disponible: <b>${s.stock}</b></li>
        <li>Beneficios: <span class="text-success">Soporte, Garantía, Personalización</span></li>
      </ul>
      <div class="d-flex gap-2 mt-4">
        <button class="btn btn-primary btn-lg">Contratar Servicio</button>
        <a href="servicios.html" class="btn btn-outline-secondary btn-lg">Volver</a>
      </div>
    </div>
  `;
}

// Login simulado
const usuarios = [{ email: "admin@empresa.com", password: "admin123" }];

document.getElementById('login-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const user = usuarios.find(u => u.email === email && u.password === password);
  const errorDiv = document.getElementById('login-error');

  if (user) {
    localStorage.setItem('usuario', JSON.stringify(user));
    window.location.href = 'dashboard.html';
  } else {
    errorDiv.classList.remove('d-none');
  }
});

// Ejecutar según página
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('services-container')) renderizarServicios();
  if (document.getElementById('detail-container')) renderizarDetalleServicio();
});
