const urlElectrodomesticos = '../api/datos.php?tabla=electrodomesticos';
const idCliente = new URLSearchParams(window.location.search).get('id');
const infoCliente = document.getElementById('infoCliente');
const tablaElectrodomesticos = document.getElementById('tablaElectrodomesticos');
const modalElectrodomestico = document.getElementById('modalElectrodomestico');
const btnNuevoElectrodomestico = document.getElementById('btnNuevoElectrodomestico');
const cerrarModalElectrodomestico = document.getElementById('cerrarModalElectrodomestico');
const formularioElectrodomestico = document.getElementById('formularioElectrodomestico');

// Mostrar información del cliente
async function mostrarInfoCliente() {
    const res = await fetch(`../api/datos.php?tabla=clientes&accion=seleccionar`);
    const clientes = await res.json();
    const cliente = clientes.find(c => c.id == idCliente);
    if (cliente) {
        document.getElementById('nombreCliente').textContent = `Nombre: ${cliente.nombre} ${cliente.apellido}`;
        document.getElementById('dniCliente').textContent = `DNI: ${cliente.dni}`;
        document.getElementById('telefonoCliente').textContent = `Teléfono: ${cliente.telefono}`;
        document.getElementById('ivaCliente').textContent = `IVA: ${cliente.iva}`;
        formularioElectrodomestico.idCliente.value = cliente.id;
    }
}

// Mostrar lista de electrodomésticos
async function mostrarElectrodomesticos() {
    const res = await fetch(`${urlElectrodomesticos}&accion=seleccionar`);
    const electrodomesticos = await res.json();
    const filtrados = electrodomesticos.filter(e => e.id_cliente == idCliente);
    tablaElectrodomesticos.innerHTML = '';
    filtrados.forEach(electro => {
        tablaElectrodomesticos.innerHTML += `
            <tr>
                <td>${electro.tipo}</td>
                <td>${electro.modelo}</td>
                <td>${electro.cantidad}</td>
                <td>${electro.problema}</td>
                <td>${electro.tipo_reparacion}</td>
                <td>
                    <button onclick="editarElectrodomestico(${electro.id})">Editar</button>
                    <button class="eliminar" onclick="eliminarElectrodomestico(${electro.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Añadir o editar electrodoméstico
formularioElectrodomestico.addEventListener('submit', async (e) => {
    e.preventDefault();
    const datos = new FormData(formularioElectrodomestico);
    const id = formularioElectrodomestico.idElectrodomestico.value;
    const accion = id ? 'actualizar' : 'insertar';
    const endpoint = id ? `${urlElectrodomesticos}&accion=${accion}&id=${id}` : `${urlElectrodomesticos}&accion=${accion}`;
    await fetch(endpoint, { method: 'POST', body: datos });
    modalElectrodomestico.style.display = 'none';
    formularioElectrodomestico.reset();
    mostrarElectrodomesticos();
});

// Editar electrodoméstico
window.editarElectrodomestico = async (id) => {
    const res = await fetch(`${urlElectrodomesticos}&accion=seleccionar`);
    const electrodomesticos = await res.json();
    const electro = electrodomesticos.find(e => e.id == id);
    if (electro) {
        formularioElectrodomestico.idElectrodomestico.value = electro.id;
        formularioElectrodomestico.tipo.value = electro.tipo;
        formularioElectrodomestico.modelo.value = electro.modelo;
        formularioElectrodomestico.cantidad.value = electro.cantidad;
        formularioElectrodomestico.problema.value = electro.problema;
        formularioElectrodomestico.tipoReparacion.value = electro.tipo_reparacion;
        modalElectrodomestico.style.display = 'flex';
    }
};

// Eliminar electrodoméstico
window.eliminarElectrodomestico = async (id) => {
    if (confirm('¿Estás seguro de eliminar este electrodoméstico?')) {
        await fetch(`${urlElectrodomesticos}&accion=eliminar&id=${id}`);
        mostrarElectrodomesticos();
    }
};

// Inicializar
btnNuevoElectrodomestico.addEventListener('click', () => {
    formularioElectrodomestico.reset();
    modalElectrodomestico.style.display = 'flex';
});
cerrarModalElectrodomestico.addEventListener('click', () => {
    modalElectrodomestico.style.display = 'none';
});
document.addEventListener('DOMContentLoaded', () => {
    mostrarInfoCliente();
    mostrarElectrodomesticos();
});
