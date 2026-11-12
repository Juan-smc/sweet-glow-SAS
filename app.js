const $ = s => document.querySelector(s);


// Lista de trabajadores 
const trabajadores = [
    { nombre: "Gabriela Royero", correo: "gabriela.royero@sweetglow.com", telefono: "+57 123 456 7890", cargo: "Gerente" },
    { nombre: "Erick Cuervo", correo: "erick.cuervo@sweetglow.com", telefono: "+57 123 456 7890", cargo: "Responsable de caja menor" },
    { nombre: "Sthepany Arias", correo: "sthepany.arias@sweetglow.com", telefono: "+57 123 456 7890", cargo: "Administrador" },
    { nombre: "Danna Pérez", correo: "danna.perez@sweetglow.com", telefono: "+57 123 456 7890", cargo: "Secretaria" },
    { nombre: "Luis Martínez", correo: "luis.martinez@sweetglow.com", telefono: "+57 123 456 7890", cargo: "Subgerente" }
];

let usuario = trabajadores[0];
if (localStorage.getItem("usuario")) {
    usuario = JSON.parse(localStorage.getItem("usuario"));
}

function mostrarDatosUsuario() {
    if (!$("#nombreUsuario")) return; // esta página no tiene perfil
    $("#nombreUsuario").textContent = usuario.nombre;
    $("#correoUsuario").textContent = usuario.correo;
    $("#telefonoUsuario").textContent = usuario.telefono;
    $("#cargoUsuario").textContent = usuario.cargo;
}
mostrarDatosUsuario();


const formRegistro = $("#registroForm");
if (formRegistro) {
    formRegistro.addEventListener("submit", e => {
        e.preventDefault();

        if ($("#password").value !== $("#confirm_password").value) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const selectCargo = $("#cargo");
        const nuevo = {
            nombre: $("#nombre").value,
            correo: $("#email").value,
            telefono: $("#telefono").value,
            cargo: selectCargo.options[selectCargo.selectedIndex].text
        };
        localStorage.setItem("usuario", JSON.stringify(nuevo));

        alert("¡Registro exitoso! Ahora inicia sesión 💗");
        window.location.href = "inicio_sesion.html";
    });
}


/* ===== INICIO DE SESION ===== */

const formLogin = $("#loginForm");
if (formLogin) {
    formLogin.addEventListener("submit", e => {
        e.preventDefault();
        window.location.href = "user.html";
    });
}

const formContacto = $("#contactoForm");
if (formContacto) {
    formContacto.addEventListener("submit", e => {
        e.preventDefault();
        alert("¡Gracias por escribirnos! Pronto te respondemos");
        window.location.href = "index.html";
    });
}

let inventario = [
    { nombre: "Estilo 1", precio: 5000, cantidad: 1 },
    { nombre: "Estilo 2", precio: 6000, cantidad: 1 },
    { nombre: "Estilo 3", precio: 7000, cantidad: 1 }
];
if (localStorage.getItem("inventario")) {
    inventario = JSON.parse(localStorage.getItem("inventario"));
}

function guardarInventario() {
    localStorage.setItem("inventario", JSON.stringify(inventario));
}

function celda(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function mostrarInventario() {
    const tabla = $("#tablaInventario");
    if (!tabla) return; 
    tabla.innerHTML = "";

    inventario.forEach((producto, index) => {
        const tr = document.createElement("tr");
        tr.appendChild(celda(producto.nombre));
        tr.appendChild(celda("$" + producto.precio.toLocaleString("es-CO")));
        tr.appendChild(celda(producto.cantidad));

        const tdBoton = document.createElement("td");
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "btn-eliminar";
        boton.textContent = "Eliminar";
        boton.addEventListener("click", () => eliminarProducto(index));
        tdBoton.appendChild(boton);
        tr.appendChild(tdBoton);

        tabla.appendChild(tr);
    });
}

function eliminarProducto(index) {
    inventario.splice(index, 1);
    guardarInventario();
    mostrarInventario();
}

const formInventario = $("#inventarioForm");
if (formInventario) {
    formInventario.addEventListener("submit", e => {
        e.preventDefault();
        const nombre = $("#producto").value.trim();
        const precio = parseFloat($("#precio").value);
        const cantidad = parseInt($("#cantidad").value);

        if (nombre && !isNaN(precio) && !isNaN(cantidad)) {
            inventario.push({ nombre, precio, cantidad });
            guardarInventario();
            mostrarInventario();
            formInventario.reset();
        } else {
            alert("Por favor, complete todos los campos correctamente.");
        }
    });
}
mostrarInventario();


/* ===== FACTURACION ===== */

if ($("#items")) {
    const fmt = n => Math.round(n).toLocaleString("es-CO");
    const FILAS = 5;
    const tbody = $("#items tbody");

    function nuevaFila(i, datos = {}) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><input name="items[${i}][ref]" value="${datos.ref ?? ""}"></td>
            <td><input name="items[${i}][desc]" value="${datos.desc ?? ""}"></td>
            <td><input class="num cant" type="number" min="0" step="any" name="items[${i}][cant]" value="${datos.cant ?? ""}"></td>
            <td><input class="num precio" type="number" min="0" step="any" name="items[${i}][precio]" value="${datos.precio ?? ""}"></td>
            <td class="total">-</td>`;
        tbody.appendChild(tr);
    }

    function aLetras(n) {
        const U = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];
        const D = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
        const C = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
        const menor1000 = x => {
            if (x === 100) return "cien";
            const c = Math.floor(x / 100), r = x % 100;
            let t = C[c] ? C[c] + " " : "";
            if (r < 30) t += U[r];
            else t += D[Math.floor(r / 10)] + (r % 10 ? " y " + U[r % 10] : "");
            return t.trim();
        };
        if (n === 0) return "cero";
        const mill = Math.floor(n / 1e6), mil = Math.floor((n % 1e6) / 1000), resto = n % 1000;
        let t = "";
        if (mill) t += (mill === 1 ? "un millón" : menor1000(mill) + " millones") + " ";
        if (mil) t += (mil === 1 ? "mil" : menor1000(mil).replace(/uno$/, "ún") + " mil") + " ";
        if (resto) t += menor1000(resto);
        return t.trim();
    }

    function calcular() {
        let subtotal = 0;
        tbody.querySelectorAll("tr").forEach(tr => {
            const c = parseFloat(tr.querySelector(".cant").value) || 0;
            const p = parseFloat(tr.querySelector(".precio").value) || 0;
            const t = c * p;
            tr.querySelector(".total").textContent = t ? fmt(t) : "-";
            subtotal += t;
        });
        const iva = subtotal * (parseFloat($("#tasa").value) || 0) / 100;
        const total = subtotal + iva;
        $("#subtotal").textContent = fmt(subtotal);
        $("#iva").textContent = fmt(iva);
        $("#total").textContent = fmt(total);
        const letras = aLetras(Math.round(total));
        $("#letras").textContent = letras.charAt(0).toUpperCase() + letras.slice(1) + " pesos M/CTE";
    }

    nuevaFila(0, { ref: "1", desc: "Detalles personalizados", cant: 3, precio: 360000 });
    for (let i = 1; i < FILAS; i++) nuevaFila(i);

    $("#agregar").addEventListener("click", () => nuevaFila(tbody.children.length));
    $("#factura").addEventListener("input", calcular);

    // fechas con la hora local 
    const hoy = new Date();
    const iso = d => d.toLocaleDateString("en-CA");
    const venc = new Date(hoy);
    venc.setDate(venc.getDate() + 30);
    $("#f_exp").value = iso(hoy);
    $("#f_ven").value = iso(venc);

    document.querySelectorAll('input[name="pago"]').forEach(r => r.addEventListener("change", () => {
        $("#f_ven").value = r.value === "contado" ? iso(hoy) : iso(venc);
    }));

    calcular();
}