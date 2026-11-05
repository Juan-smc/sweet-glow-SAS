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