// Productos

const productos = [
    // TRAGOS/COCTELES
    {
        id: "trago-01",
        titulo: "Trago 01",
        imagen: "./img/tragos/01.jpg",
        categoria: {
            nombre: "Tragos",
            id:"tragos"
        },
        precio: 1000
    },
    {
        id: "trago-02",
        titulo: "Trago 02",
        imagen: "./img/tragos/02.jpg",
        categoria: {
            nombre: "Tragos",
            id:"tragos"
        },
        precio: 1000
    },
    {
        id: "trago-03",
        titulo: "Trago 03",
        imagen: "./img/tragos/03.jpg",
        categoria: {
            nombre: "Tragos",
            id:"tragos"
        },
        precio: 1000
    },
    {
        id: "trago-04",
        titulo: "Trago 04",
        imagen: "./img/tragos/04.jpg",
        categoria: {
            nombre: "Tragos",
            id:"tragos"
        },
        precio: 1000
    },
    // VINOS
    {
        id: "vino-01",
        titulo: "Vino 01",
        imagen: "./img/vinos/01.jpg",
        categoria: {
            nombre: "Vinos",
            id:"vinos"
        },
        precio: 1000
    },
    {
        id: "vino-02",
        titulo: "Vino 02",
        imagen: "./img/vinos/02.jpg",
        categoria: {
            nombre: "Vinos",
            id:"vinos"
        },
        precio: 1000
    },
    {
        id: "vino-03",
        titulo: "Vino 03",
        imagen: "./img/vinos/03.jpg",
        categoria: {
            nombre: "Vinos",
            id:"vinos"
        },
        precio: 1000
    },
    {
        id: "vino-04",
        titulo: "Vino 04",
        imagen: "./img/vinos/04.jpg",
        categoria: {
            nombre: "Vinos",
            id:"vinos"
        },
        precio: 1000
    },
    // BEBIDAS
    {
        id: "bebida-01",
        titulo: "bebida 02",
        imagen: "./img/bebidas/01.jpg",
        categoria: {
            nombre: "Bebidas",
            id:"bebidas"
        },
        precio: 1000
    },
    {
        id: "bebida-02",
        titulo: "bebida 02",
        imagen: "./img/bebidas/02.jpg",
        categoria: {
            nombre: "Bebidas",
            id:"bebidas"
        },
        precio: 1000
    },
    {
        id: "bebida-03",
        titulo: "bebida 03",
        imagen: "./img/bebidas/03.jpg",
        categoria: {
            nombre: "Bebidas",
            id:"bebidas"
        },
        precio: 1000
    },
    {
        id: "bebida-04",
        titulo: "bebida 04",
        imagen: "./img/bebidas/04.jpg",
        categoria: {
            nombre: "Bebidas",
            id:"bebidas"
        },
        precio: 1000
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();


}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id == e.currentTarget.id);
            cargarProductos(productosBoton);  
        } else {
            tituloPrincipal.innerText = "Todos los productos";
           cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito()
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad ++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
