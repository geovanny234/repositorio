const controlActivo = sessionStorage.getItem("usuarioActivo");
const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
const usuario = usuarios.find(u => u.control === controlActivo);

if (!usuario) {
    window.location.href = "login.html";
}

document.getElementById("bienvenida").textContent = "Hola, " + usuario.nombre + " (Semestre " + usuario.semestre + ")";
document.getElementById("tituloSemestre").textContent = "Libros de " + usuario.semestre + "° Semestre";

const catalogo = {
    "5": [
        { id: 1, titulo: "Inglés V", precio: 240, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVkPkQJT1Cmq4F--WdpA9evtkeZ-JHd0qdJT8G_Jfg5Q&s=10" },
        { id: 2, titulo: "Temas Selectos de Matemáticas II", precio: 240, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp8ZqK7iy-x2mMRt8Jhf4U8NosxNwFP7BPxdunc80szg&s=10" },
        { id: 3, titulo: "Conciencia Histórica II", precio: 240, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo6fZrv9cxjFHGS2TqMp7XSKt5QX3y3eQYnR_uM6kEKw&s=10" },
        { id: 4, titulo: "La Energía en los Procesos de la Vida Diaria", precio: 240, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLBKxW7XfI4uI4c-JMR6tpYRttg9HeBIAzhMRLmkQQw&s=10" },
        { id: 5, titulo: "Aplicaciones de la Administración", precio: 240, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrzk4W7ujXa-tZN1rGRPA3Ju_lYoeGhO9Es5cl9Z8vPQ&s" }
    ]
};

const claveCarrito = "carrito_" + usuario.control;
let carrito = JSON.parse(localStorage.getItem(claveCarrito) || "[]");

function mostrarLibros() {
    const contenedor = document.getElementById("contenedorLibros");
    const librosSemestre = catalogo[usuario.semestre] || [];
    contenedor.innerHTML = "";

    if (librosSemestre.length === 0) {
        contenedor.innerHTML = "<p>No hay libros disponibles para este semestre por ahora.</p>";
        return;
    }

    librosSemestre.forEach(libro => {
        contenedor.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <img src="${libro.img}" class="card-img-top" style="height: 300px; object-fit: contain;" alt="${libro.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${libro.titulo}</h5>
                        <p class="card-text">$${libro.precio}</p>
                        <button class="btn-solid theme-primary w-100" onclick="agregarAlCarrito(${libro.id})">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function agregarAlCarrito(idLibro) {
    const yaEstaEnCarrito = carrito.some(item => item.id === idLibro);
    if (yaEstaEnCarrito) {
        alert("Ya tienes este libro en el carrito");
        return;
    }

    const librosSemestre = catalogo[usuario.semestre] || [];
    const libro = librosSemestre.find(l => l.id === idLibro);
    if (libro) {
        carrito.push(libro);
        guardarYActualizarCarrito();
    }
}

function eliminarUno(indice) {
    carrito.splice(indice, 1);
    guardarYActualizarCarrito();
}

function guardarYActualizarCarrito() {
    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    renderizarCarrito();
}

function renderizarCarrito() {
    const lista = document.getElementById("listaCarrito");
    const totalSpan = document.getElementById("totalCarrito");
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;
        lista.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${item.titulo} - $${item.precio}</span>
                <button class="btn-solid theme-danger btn-xs" onclick="eliminarUno(${index})">X</button>
            </li>
        `;
    });

    totalSpan.textContent = total;
}

document.getElementById("btnVaciar").addEventListener("click", function() {
    carrito = [];
    guardarYActualizarCarrito();
});

document.getElementById("btnComprar").addEventListener("click", function() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    alert("Compra realizada con éxito por $" + document.getElementById("totalCarrito").textContent);
    carrito = [];
    guardarYActualizarCarrito();
});

document.getElementById("btnSalir").addEventListener("click", function() {
    sessionStorage.removeItem("usuarioActivo");
    window.location.href = "login.html";
});

mostrarLibros();
renderizarCarrito();