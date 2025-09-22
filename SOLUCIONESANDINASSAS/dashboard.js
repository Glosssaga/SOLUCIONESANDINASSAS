let clientes = JSON.parse(localStorage.getItem('clientes') || '[]');

function renderizarClientes() {
  const tbody = document.getElementById('clientesBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  clientes.forEach((c, i) => {
    tbody.innerHTML += `
      <tr>
        <td><img src="https://via.placeholder.com/50" class="rounded-circle" alt="Foto cliente" /></td>
        <td>${c.nombre}</td>
        <td>${c.edad} años</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick="editarCliente(${i})"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-sm btn-danger" onclick="eliminarCliente(${i})"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
  localStorage.setItem('clientes', JSON.stringify(clientes));
}

function mostrarModalCliente(idx = null) {
  const modal = new bootstrap.Modal(document.getElementById('modalCliente'));
  document.getElementById('clienteId').value = idx !== null ? idx : '';
  document.getElementById('nombre').value = idx !== null ? clientes[idx].nombre : '';
  document.getElementById('edad').value = idx !== null ? clientes[idx].edad : '';
  modal.show();
}

function editarCliente(idx) {
  mostrarModalCliente(idx);
}

function eliminarCliente(idx) {
  if (confirm('¿Seguro de eliminar este cliente?')) {
    clientes.splice(idx, 1);
    renderizarClientes();
  }
}

document.getElementById('formCliente').addEventListener('submit', e => {
  e.preventDefault();
  const idx = document.getElementById('clienteId').value;
  const nombre = document.getElementById('nombre').value.trim();
  const edad = parseInt(document.getElementById('edad').value, 10);

  if (!nombre || isNaN(edad) || edad < 0) {
    alert('Por favor ingresa datos válidos.');
    return;
  }

  if (idx !== '') {
    clientes[idx] = { nombre, edad };
  } else {
    clientes.push({ nombre, edad });
  }

  renderizarClientes();
  bootstrap.Modal.getInstance(document.getElementById('modalCliente')).hide();
});

document.getElementById('buscarCliente')?.addEventListener('input', function () {
  const term = this.value.toLowerCase();
  const tbody = document.getElementById('clientesBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  clientes.forEach((c, i) => {
    if (c.nombre.toLowerCase().includes(term)) {
      tbody.innerHTML += `
        <tr>
          <td><img src="https://via.placeholder.com/50" class="rounded-circle" alt="Foto cliente" /></td>
          <td>${c.nombre}</td>
          <td>${c.edad} años</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" onclick="editarCliente(${i})"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-sm btn-danger" onclick="eliminarCliente(${i})"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>
      `;
    }
  });
});

document.addEventListener('DOMContentLoaded', renderizarClientes);
