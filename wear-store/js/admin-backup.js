if(localStorage.getItem("adminLogueado") !== "si"){
    window.location.href = "admin-login.html";
}

let productos =
JSON.parse(localStorage.getItem("productos")) || [];

function guardarProducto(){

const nombre =
document.getElementById("nombreProducto").value;

const precio =
document.getElementById("precioProducto").value;

const stock =
document.getElementById("stockProducto").value;

const categoria =
document.getElementById("categoriaProducto").value;

const imagenInput =
document.getElementById("imagenProducto");

const idEditando =
document.getElementById(
    "productoEditando"
).value;

if(
    nombre === "" ||
    precio === "" ||
    stock === ""
){
    alert("Completa todos los campos");
    return;
}

const tallas = [];

document
.querySelectorAll('input[type="checkbox"]:checked')
.forEach(check => {

    tallas.push(
        check.value
    );

});

if(tallas.length === 0){

    alert(
        "Selecciona al menos una talla"
    );

    return;
}


if(
    imagenInput.files.length === 0
){

    alert(
        "Selecciona una imagen"
    );

    return;
}

const reader =
new FileReader();

reader.onload = function(e){

    productos.push({

        id: Date.now(),

        nombre: nombre,

        precio: Number(precio),

        stock: Number(stock),

        categoria: categoria,

        tallas: tallas,

        imagen: e.target.result

    });

    guardarProductos();

    mostrarProductos();

    limpiarFormulario();

    alert(
        "Producto guardado correctamente"
    );

};

reader.readAsDataURL(
    imagenInput.files[0]
);

}
function limpiarFormulario(){

    document.getElementById(
        "nombreProducto"
    ).value = "";

    document.getElementById(
        "precioProducto"
    ).value = "";

    document.getElementById(
        "stockProducto"
    ).value = "";

    document.getElementById(
        "imagenProducto"
    ).value = "";

    document
    .querySelectorAll(
        'input[type="checkbox"]'
    )
    .forEach(check => {

        check.checked = false;

    });
}

function sumarStock(id){

    const producto =
    productos.find(
        p => p.id === id
    );

    if(producto){

        producto.stock++;

        guardarProductos();

        mostrarProductos();
    }
}

function restarStock(id){

    const producto =
    productos.find(
        p => p.id === id
    );

    if(
        producto &&
        producto.stock > 0
    ){

        producto.stock--;

        guardarProductos();

        mostrarProductos();
    }
}

function eliminarProducto(id){

    if(
        !confirm(
            "¿Eliminar producto?"
        )
    ){
        return;
    }

    productos =
    productos.filter(
        p => p.id !== id
    );

    guardarProductos();

    mostrarProductos();
}

function mostrarProductos(){

    const contenedor =
    document.getElementById(
        "listaProductos"
    );

    let html = "";

    productos.forEach(prod => {

        html += `
        <div style="
            display:flex;
            gap:15px;
            align-items:center;
            padding:15px;
            margin-bottom:15px;
            border:1px solid #333;
            border-radius:10px;
        ">

            <img
            src="${prod.imagen}"
            style="
                width:100px;
                height:100px;
                object-fit:cover;
                border-radius:8px;
            ">

            <div style="flex:1;">

                <h3>${prod.nombre}</h3>

                <p>Precio: $${prod.precio.toLocaleString("es-CL")}</p>

                <p>Categoría: ${prod.categoria}</p>

                <p>Stock: ${prod.stock}</p>

                <p>Tallas: ${prod.tallas.join(", ")}</p>

            </div>

            <div>

                <button onclick="editarProducto(${prod.id})">
                Editar
                </button>

                <br><br>

                <button onclick="sumarStock(${prod.id})">
                + Stock
                </button>

                <br><br>

                <button onclick="restarStock(${prod.id})">
                - Stock
                </button>

                <br><br>

                <button onclick="eliminarProducto(${prod.id})">
                Eliminar
                </button>

            </div>

        </div>
        `;

    });

    if(productos.length === 0){

        html =
        "<p>No existen productos creados.</p>";

    }

    contenedor.innerHTML =
    html;
}
function editarProducto(id){

    const producto =
    productos.find(
        p => p.id === id
    );

    if(!producto){
        return;
    }

    document.getElementById(
        "nombreProducto"
    ).value = producto.nombre;

    document.getElementById(
        "precioProducto"
    ).value = producto.precio;

    document.getElementById(
        "stockProducto"
    ).value = producto.stock;

    document.getElementById(
        "categoriaProducto"
    ).value = producto.categoria;

    document.getElementById(
        "productoEditando"
    ).value = producto.id;

    document
    .querySelectorAll(
        'input[type="checkbox"]'
    )
    .forEach(check => {

        check.checked =
        producto.tallas.includes(
            check.value
        );

    });

    document.getElementById(
        "tituloFormulario"
    ).innerText =
    "EDITANDO PRODUCTO";

    document.getElementById(
        "btnGuardar"
    ).innerText =
    "ACTUALIZAR PRODUCTO";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}