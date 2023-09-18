let etiqueta = document.getElementById("etiqueta");
let productosCarrito = document.getElementById("productosCarrito");

// console.log(shopItemsInfo);

let = carrito = JSON.parse(localStorage.getItem("datos")) || [];

let calculo = () => {
    let iconoCarrito = document.getElementById("cantidad")
    iconoCarrito.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);

};
calculo();

let generarItemCarrito = () => {
    if (carrito.length !== 0) {
        return productosCarrito.innerHTML = carrito.map((x) => {
            let { id, item } = x;
            let buscador = shopItemsInfo.find((y) => y.id === id) || [];
            let { img, nombre, precio } = buscador;
            return `
            <div class = "itemCarrito" > 
                <img src="${img}" id= "imagenCarrito">
            
                <div class="detalles">
                    <div class="tituloPrecio">
                        <h4>
                            <p class="nombre">${nombre}</p>
                            <p class="precio">$ ${precio}</p>
                        </h4>
                        <i onclick="eliminarProducto(${id})" class="bi bi-x-square"></i>
                    </div>
                    <div class="botones">
                            <i onclick="quitar(${id})" class="bi bi-bag-dash"></i>
                        <div id=${id} class="cantidad">${item}</div>
                            <i onclick="incrementar(${id})" class="bi bi-bag-plus"></i>
                    </div>
                    <h3> Total Prod. $ ${item * buscador.precio}</h3>
                </div>
            </div>
            `
        }).join("");
    }
    else {
        productosCarrito.innerHTML = ``
        etiqueta.innerHTML = `<h3>Su carrito está vacío</h3>
<img src="../recursos/images/gatito.jpg" alt="foto gatito">
<a href="../pages/productos.html"><button class="botonVolver">Go Shop</button></a>
`

    }
}
generarItemCarrito();












let incrementar = (id) => {
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



    generarItemCarrito();
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


    generarItemCarrito();
    localStorage.setItem("datos", JSON.stringify(carrito));
};

let agregar = (id) => {
    let buscador = carrito.find((x) => x.id === id)
    //console.log(buscador.item);
    document.getElementById(id).innerHTML = buscador.item;
    calculo();
    totalCuenta();
};

let eliminarProducto = (id) => {
    let itemSeleccionado = id;
    carrito = carrito.filter((x) => x.id !== itemSeleccionado)
    generarItemCarrito();
    totalCuenta();
    calculo();
    localStorage.setItem("datos", JSON.stringify(carrito));
}
let eliminarCarrito = () => {
    carrito = [];
    generarItemCarrito();
    calculo();
    localStorage.setItem("datos", JSON.stringify(carrito));
}

let totalCuenta = () => {
    if (carrito.length !== 0) {
        let monto = carrito.map((x) => {
            let { item, id } = x;
            let buscador = shopItemsInfo.find((y) => y.id === id) || [];
            return item * buscador.precio
        })
            .reduce((x, y) => x + y, 0);
        //console.log(monto)
        etiqueta.innerHTML = `
        <h2 class="totalAPagar"> Total a pagar : $ ${monto} </h2>
        <div class="cuentaContainer">
        <button class="pagar"> Pagar </button>
        <button onclick="eliminarCarrito()" class="eliminar"> Eliminar Todo </button>
        </div>
        `
    } else return;
}
totalCuenta();