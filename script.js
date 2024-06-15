let clickEnVentana;

function ocultarCarro() {
    let carrito = document.getElementById('contenedor-carro');
    carrito.style.display = "none";
    window.removeEventListener('click', clickEnVentana);
}

// function botonCerrar(){
//     let carrito = document.getElementById('contenedor-carro');
//     carrito.style.display = "none";
// }

function mostrarCarro() {
    let carrito = document.getElementById('contenedor-carro');
    carrito.style.display = "block";
    clickEnVentana = function(event) {
        let isBotonEliminar = event.target.classList.contains('eliminarBoton');
        if (!carrito.contains(event.target) && !isBotonEliminar) {
            ocultarCarro();
        }
    };
    setTimeout(function() {
        window.addEventListener('click', clickEnVentana);
    }, 100);
}

function SumarContador() {
    let contador = document.getElementById('contador');
    let conta = parseInt(contador.textContent) || 0;
    let contar = conta + 1;
    contador.textContent = contar;
}

let categoria = document.getElementById('categoria');

function ocultarCategoria() {
    if (categoria.style.display === "block") {
        categoria.style.display = "none";
        window.removeEventListener('click', clickEnVentana);
    }
}

function mostrarCategoria() {
    if (categoria.style.display === "none" || categoria.style.display === "") {
        categoria.style.display = "block";
        clickEnVentana = function(event) {
            if (!categoria.contains(event.target)) {
                ocultarCategoria();
            }
        };
        setTimeout(function() {
            window.addEventListener('click', clickEnVentana);
        }, 100);
    } else {
        ocultarCategoria();
    }
}

let buttons = document.querySelectorAll('.increment');

buttons.forEach(button => {
    button.addEventListener('click', SumarContador);
})

let carritoItems = [];
let total = 0;

function AgregarArticulo(event) {
    let boton = event.target;
    let tarjetaId = boton.id.replace('boton', 'tarjeta');
    let tarjeta = document.getElementById(tarjetaId);

    let tarjetaClonada = tarjeta.cloneNode(true);

    let botonEliminar = tarjetaClonada.querySelector('.eliminarBoton');
    if (!botonEliminar) {
        botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar articulo';
        botonEliminar.classList.add('eliminarBoton');
        tarjetaClonada.appendChild(botonEliminar);
    }

    let precioElement = tarjeta.querySelector('.precio');
    let precio = parseInt(precioElement.textContent.replace(/[^\d]/g, ''), 10);

    total += precio;
    let totalPrecio = document.getElementById('total');
    totalPrecio.textContent = `Total: $${total}`;

    botonEliminar.addEventListener('click', function() {
        EliminarArticulo(tarjetaClonada, precio);
    });

    let carrito = document.getElementById('carrito');
    carrito.appendChild(tarjetaClonada);
    carrito.classList.add('carrito-actualizado');
    tarjetaClonada.classList.add('tarjetaC');
}

function EliminarArticulo(tarjeta, precio) {
    let carrito = document.getElementById('carrito');
    carrito.removeChild(tarjeta);

    total -= precio;
    let totalPrecio = document.getElementById('total');
    totalPrecio.textContent = `Total: $${total}`;

    let contador = document.getElementById('contador');
    let conta = parseInt(contador.textContent) || 0;
    let contar = conta - 1;
    contador.textContent = contar < 0 ? 0 : contar;
}

let botones = document.querySelectorAll('.increment');
botones.forEach(boton => {
    boton.addEventListener('click', AgregarArticulo);
});

