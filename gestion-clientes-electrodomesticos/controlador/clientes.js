const url = '../api/datos.php?tabla=clientes';
const tablaListadoClientes = document.getElementById('tablaListadoClientes');
const modalCliente = document.getElementById('modalCliente');
const btnNuevoCliente = document.getElementById('btnNuevoCliente');
const cerrarModal = document.getElementById('cerrarModal');
const formularioCliente = document.getElementById('formularioCliente');

let clienteId = null; // Para saber si estamos editando

// Mostrar listado de clientes
async function mostrarListadoClientes() {
    try {
        const res = await fetch(`${url}&accion=seleccionar`);
        const clientes = await res.json();
        tablaListadoClientes.innerHTML = '';
        clientes.forEach(cliente => {
            tablaListadoClientes.innerHTML += `
                <tr>
                    <td>${cliente.nombre} ${cliente.apellido}</td>
                    <td>${cliente.dni}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.iva}</td>
                    <td>
                       <button onclick="editarCliente(${cliente.id})">Editar</button>
                       <button class="eliminar" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
                       <button class="detalle" onclick="verDetalleCliente(${cliente.id})">Ver Detalles</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error al cargar clientes:', error);
    }
}

// Abrir modal para añadir o editar cliente
btnNuevoCliente.addEventListener('click', () => {
    clienteId = null; // Nuevo cliente
    formularioCliente.reset(); // Limpiar formulario
    modalCliente.style.display = 'flex';
});

// Cerrar modal
cerrarModal.addEventListener('click', () => {
    modalCliente.style.display = 'none';
});

// Añadir o editar cliente
formularioCliente.addEventListener('submit', async (e) => {
    e.preventDefault();
    const datos = new FormData(formularioCliente);
    const accion = clienteId ? 'actualizar' : 'insertar';
    const endpoint = clienteId ? `${url}&accion=${accion}&id=${clienteId}` : `${url}&accion=${accion}`;
    try {
        await fetch(endpoint, {
            method: 'POST',
            body: datos
        });
        modalCliente.style.display = 'none';
        formularioCliente.reset();
        mostrarListadoClientes();
    } catch (error) {
        console.error('Error al guardar cliente:', error);
    }
});

// Editar cliente
window.editarCliente = async (id) => {
    clienteId = id; // Establecemos el cliente a editar
    try {
        const res = await fetch(`${url}&accion=seleccionar`);
        const clientes = await res.json();
        const cliente = clientes.find(c => c.id == id);
        if (cliente) {
            formularioCliente.dni.value = cliente.dni;
            formularioCliente.nombre.value = cliente.nombre;
            formularioCliente.apellido.value = cliente.apellido;
            formularioCliente.telefono.value = cliente.telefono;
            formularioCliente.iva.value = cliente.iva;
            modalCliente.style.display = 'flex';
        }
    } catch (error) {
        console.error('Error al cargar datos del cliente:', error);
    }
};

// Eliminar cliente
window.eliminarCliente = async (id) => {
    if (confirm('¿Estás seguro de eliminar este cliente y sus electrodomésticos asociados?')) {
        try {
            await fetch(`${url}&accion=eliminar&id=${id}`);
            mostrarListadoClientes();
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
        }
    }
};

// Redirigir a la página de detalle del cliente
window.verDetalleCliente = (id) => {
    location.href = `detalleCliente.html?id=${id}`;
};

// Inicializar
document.addEventListener('DOMContentLoaded', mostrarListadoClientes);
