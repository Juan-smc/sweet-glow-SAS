let inventario = [];
if (localStorage.getItem("inventario")) {
    inventario = JSON.parse(localStorage.getItem("inventario"));
}
function agregarProducto() {
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);

    if (nombre && !isNaN(precio) && !isNaN(cantidad)) {
        const producto = { nombre, precio, cantidad };
        inventario.push(producto);
        localStorage.setItem("inventario", JSON.stringify(inventario));
        mostrarInventario();
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("cantidad").value = "";
    } else {
        alert("Por favor, complete todos los campos correctamente.");
    }
}
function mostrarInventario() {
    const listaInventario = document.getElementById("listaInventario");
    listaInventario.innerHTML = "";

    inventario.forEach((producto, index) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - Precio: $${producto.precio.toFixed(2)} - Cantidad: ${producto.cantidad}`;
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.onclick = () => eliminarProducto(index);
        li.appendChild(eliminarBtn);
        listaInventario.appendChild(li);
    });
}

function eliminarProducto(index) {
    inventario.splice(index, 1);
    localStorage.setItem("inventario", JSON.stringify(inventario));
    mostrarInventario();
}

document.addEventListener("DOMContentLoaded", mostrarInventario);

let usuario = {
    nombre: "Gabriela Royero",
    correo: "gabriela.royero@sweetglow.com",
    telefono: "+57 123 456 7890",
    cargo: "Gerente"
};
let usuario2 = {
    nombre: "Erick Cuervo",
    correo: "erick.cuervo@sweetglow.com",
    telefono: "+57 123 456 7890",
    cargo: "Responsable de caja menor"
};
let usuario3 = {
    nombre: "Sthepany Arias",
    correo: "sthepany.arias@sweetglow.com",
    telefono: "+57 123 456 7890",
    cargo: "Administrador"
};
let usuario4 = {
    nombre: "Danna Pérez",
    correo: "danna.perez@sweetglow.com",
    telefono: "+57 123 456 7890",
    cargo: "Secretaria"
};
let usuario5 = {
    nombre: "Luis Martínez",
    correo: "luis.martinez@sweetglow.com",
    telefono: "+57 123 456 7890",
    cargo: "Subgerente"
};
function mostrarDatosUsuario() {
    document.getElementById("nombreUsuario").textContent = usuario.nombre;
    document.getElementById("correoUsuario").textContent = usuario.correo;
    document.getElementById("telefonoUsuario").textContent = usuario.telefono;
    document.getElementById("cargoUsuario").textContent = usuario.cargo;
}
document.addEventListener("DOMContentLoaded", mostrarDatosUsuario);

if (localStorage.getItem("usuario")) {
    usuario = JSON.parse(localStorage.getItem("usuario"));
    mostrarDatosUsuario();
} else if (localStorage.getItem("usuario2")) {
    usuario2 = JSON.parse(localStorage.getItem("usuario2"));
    mostrarDatosUsuario();
} else if (localStorage.getItem("usuario3")) {
    usuario3 = JSON.parse(localStorage.getItem("usuario3"));
    mostrarDatosUsuario();
} else if (localStorage.getItem("usuario4")) {
    usuario4 = JSON.parse(localStorage.getItem("usuario4"));
    mostrarDatosUsuario();
}
else if (localStorage.getItem("usuario5")) {
    usuario5 = JSON.parse(localStorage.getItem("usuario5"));
    mostrarDatosUsuario();
}
function imprimirFactura() {
                var cliente = document.getElementById("cliente").value;
                var numero = document.getElementById("numero").value;
                var fecha = document.getElementById("fecha").value;
                var metodo = document.getElementById("metodo").value;

                var factura = "Cliente: " + cliente + "\n" +
                              "Número: " + numero + "\n" +
                              "Fecha: " + fecha + "\n" +
                              "Método de pago: " + metodo;

                document.getElementById("factura").value = factura;
            }
            const $ = s => document.querySelector(s);
const fmt = n => Math.round(n).toLocaleString('es-CO');
const FILAS = 5;
const tbody = $('#items tbody');
function nuevaFila(i, datos = {}) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input name="items[${i}][ref]" value="${datos.ref ?? ''}"></td>
    <td><input name="items[${i}][desc]" value="${datos.desc ?? ''}"></td>
    <td><input class="num cant" type="number" min="0" step="any" name="items[${i}][cant]" value="${datos.cant ?? ''}"></td>
    <td><input class="num precio" type="number" min="0" step="any" name="items[${i}][precio]" value="${datos.precio ?? ''}"></td>
    <td class="total">-</td>`;
  tbody.appendChild(tr);
}
function aLetras(n) {
  const U = ['','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'];
  const D = ['','','','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
  const C = ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];
  const menor1000 = x => {
    if (x === 100) return 'cien';
    const c = Math.floor(x / 100), r = x % 100;
    let t = C[c] ? C[c] + ' ' : '';
    if (r < 30) t += U[r];
    else t += D[Math.floor(r / 10)] + (r % 10 ? ' y ' + U[r % 10] : '');
    return t.trim();
  };
  if (n === 0) return 'cero';
  const mill = Math.floor(n / 1e6), mil = Math.floor((n % 1e6) / 1000), resto = n % 1000;
  let t = '';
  if (mill) t += (mill === 1 ? 'un millón' : menor1000(mill) + ' millones') + ' ';
  if (mil) t += (mil === 1 ? 'mil' : menor1000(mil).replace(/uno$/, 'ún') + ' mil') + ' ';
  if (resto) t += menor1000(resto);
  return t.trim();
}
function calcular() {
  let subtotal = 0;
  tbody.querySelectorAll('tr').forEach(tr => {
    const c = parseFloat(tr.querySelector('.cant').value) || 0;
    const p = parseFloat(tr.querySelector('.precio').value) || 0;
    const t = c * p;
    tr.querySelector('.total').textContent = t ? fmt(t) : '-';
    subtotal += t;
  });
  const iva = subtotal * (parseFloat($('#tasa').value) || 0) / 100;
  const total = subtotal + iva;
  $('#subtotal').textContent = fmt(subtotal);
  $('#iva').textContent = fmt(iva);
  $('#total').textContent = fmt(total);
  const letras = aLetras(Math.round(total));
  $('#letras').textContent = letras.charAt(0).toUpperCase() + letras.slice(1) + ' pesos M/CTE';
}
nuevaFila(0, {ref: '1', desc: 'Detalles personalizados', cant: 3, precio: 360000});
for (let i = 1; i < FILAS; i++) nuevaFila(i);
$('#agregar').addEventListener('click', () => { nuevaFila(tbody.children.length); });
$('#factura').addEventListener('input', calcular);
const hoy = new Date();
const iso = d => d.toISOString().slice(0, 10);
$('#f_exp').value = iso(hoy);
const venc = new Date(hoy); venc.setDate(venc.getDate() + 30);
$('#f_ven').value = iso(venc);
document.querySelectorAll('input[name="pago"]').forEach(r => r.addEventListener('change', () => {
  $('#f_ven').value = r.value === 'contado' ? iso(hoy) : iso(venc);
}));
calcular();
