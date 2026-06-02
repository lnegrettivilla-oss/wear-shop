function toggleMenu() {
const sidebar = document.getElementById("sidebar");


if (sidebar) {
    sidebar.classList.toggle("active");
}


}

function toggleCart() {
const cart = document.getElementById("cartSidebar");


if (cart) {
    cart.classList.toggle("active");
}


}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);
}

function agregarProducto(nombre, precio, imagen, talla) {


carrito.push({
    nombre: nombre,
    precio: Number(precio),
    imagen: imagen,
    talla: talla
});

guardarCarrito();
actualizarCarrito();


}

function eliminarProducto(index) {


carrito.splice(index, 1);

guardarCarrito();
actualizarCarrito();


}

function actualizarCarrito() {


const contador = document.getElementById("cart-count");

if (contador) {
    contador.innerText = carrito.length;
}

const contenido = document.querySelector(".cart-content");

if (!contenido) {
    return;
}

let html = "";
let total = 0;

for (let i = 0; i < carrito.length; i++) {

    total += carrito[i].precio;

    html += `
    <div style="display:flex;gap:10px;padding:10px;border-bottom:1px solid #ddd;align-items:center;">

        <img
            src="${carrito[i].imagen}"
            style="width:70px;height:70px;object-fit:cover;border-radius:6px;"
        >

        <div style="flex:1;">

            <strong>${carrito[i].nombre}</strong>

            <p>Talla: ${carrito[i].talla || "-"}</p>

            <p>$${carrito[i].precio.toLocaleString("es-CL")}</p>

            <button
                onclick="eliminarProducto(${i})"
                style="
                    background:#c62828;
                    color:#fff;
                    border:none;
                    padding:6px 10px;
                    border-radius:4px;
                    cursor:pointer;
                "
            >
                Eliminar
            </button>

        </div>

    </div>
    `;
}

html += `
    <h3 style="margin-top:15px;">
        Total: $${total.toLocaleString("es-CL")}
    </h3>
`;

contenido.innerHTML = html;


}

document.addEventListener("DOMContentLoaded", function() {
actualizarCarrito();
});
