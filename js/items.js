let carrito = JSON.parse(localStorage.getItem("datos")) || [];

const cargarCarritoLS = () =>{
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
   
    document.getElementById("imagenProducto").src = img;
    document.getElementById("nombreProducto").innerHTML = nombre;
    document.getElementById("descripcionProducto").innerHTML = descXL;
    document.getElementById("botonAgregar").innerHTML =`  <i onclick="quitar(${id})" class="bi bi-bag-dash"></i>
    <div id=${id === undefined ? 0 : id} class="cantidad">
    0</div>
    <i onclick="incrementar(${id})" class="bi bi-bag-plus"></i>
   </div>`;
   document.getElementById("nombreProductoDesc").innerHTML = nombre;
   document.getElementById("precioProductoDesc").innerHTML = `$ ${precio}`;
  
}
generarProductoShop();

  
//     document.getElementById("botones").innerHTML = ` `

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