let carrito = JSON.parse(localStorage.getItem("datos")) || [];

const cargarCarritoLS = () => {
    return JSON.parse(localStorage.getItem("datos")) || [];
}

const cargarProductosLS = () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
}
const buscarProducto = (id) => {
    const productos = cargarProductosLS();
    let producto = productos.find(item => item.id === id);

    return producto;
}
const cargarProductoLS = () => {
    return JSON.parse(localStorage.getItem("producto")) || [];
}

const generarProductoShop = () => {

    const idProducto = cargarProductoLS();
    const producto = buscarProducto(idProducto);
    let { id, nombre, precio, descXL, img } = producto;

    let buscador = carrito.find((x) => x.id === id) || [];

    document.getElementById("imagenProducto").src = img;
    document.getElementById("nombreProducto").innerHTML = nombre;

    document.getElementById("descripcionProducto").innerHTML = descXL;
    document.getElementById("precioProductoDesc").innerHTML = `$  ${precio}`;
    document.getElementById("botonAgregar").innerHTML = `  <i onclick="quitar(${id})" class="bi bi-bag-dash"></i>
  
    <div id=${id} class="cantidad">
    ${buscador.item === undefined ? 0 : buscador.item}</div>

    <i onclick="incrementar(${id})" class="bi bi-bag-plus"></i>
   </div>`;

    document.getElementById("precioProductoDesc").innerHTML = `$ ${precio}`;

}
generarProductoShop();

const incrementar = (id) => {
    let itemSeleccionado = id;
    let buscador = carrito.find((x) => x.id === itemSeleccionado)

    if (buscador === undefined) {
        carrito.push({
            id: itemSeleccionado,
            item: 1,

        });
    }
    else {
        buscador.item += 1;
    }

    agregar(itemSeleccionado);
    localStorage.setItem("datos", JSON.stringify(carrito))
}
let quitar = (id) => {
    let itemSeleccionado = id;
    let buscador = carrito.find((x) => x.id === itemSeleccionado)

    if (buscador === undefined) return;

    else if (buscador.item === 0) return;

    else {
        buscador.item -= 1;
    }
    agregar(itemSeleccionado);

    carrito = carrito.filter((x) => x.item !== 0);

    localStorage.setItem("datos", JSON.stringify(carrito));
};

const agregar = (id) => {
    let buscador = carrito.find((x) => x.id === id)

    document.getElementById(id).innerHTML = buscador.item;
    calculo()

};

const calculo = () => {
    let iconoCarrito = document.getElementById("cantidad")
    iconoCarrito.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);

};
calculo();

const container = document.getElementById("imgContainer");
const img = document.querySelector("#imagenProducto");

container.addEventListener("click", (e) => {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;

    console.log(x, y)

    img.style.transformOrigin = `${x}px ${y}px `;
    img.style.transform = "scale(2)";
})

container.addEventListener("mouseleave", () => {
    img.style.transformOrigin = "center";
    img.style.transform = "scale(1)"
})
container.addEventListener("touchstart", (e) => {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;

    console.log(x, y)

    img.style.transformOrigin = `${x}px ${y}px `;
    img.style.transform = "scale(2)";
})

container.addEventListener("touchmove", () => {
    img.style.transformOrigin = "center";
    img.style.transform = "scale(1)"
})