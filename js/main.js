let shop = document.getElementById("shop");
localStorage.setItem("productos", JSON.stringify(shopItemsInfo));
let carrito = JSON.parse(localStorage.getItem("datos")) || [];
let productoStorage = JSON.parse(localStorage.getItem("productos")) || [];

const cargarProductosLS = () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

const guardarProductoLS = (id) => {
    localStorage.setItem("producto", JSON.stringify(id));
}

const generarShop = (productosElegidos) => {
    let contenidoHTML = "";


    productosElegidos.forEach(x => {
        let { id, nombre, desc, precio, categoria, img } = x;
        let buscador = carrito.find((x) => x.id === id) || [];
        contenidoHTML +=
            `
        <article id="itemsFiltrar" class="item" >
                <a href="./items.html" onclick="guardarProductoLS(${id})"><img src=${img}></a> 
                    <div class="detalles">
                        <h2>${nombre}</h2>
                       <p>${desc}</p>
                        <div class="precio-cantidad">
                             <h3> $ ${precio} </h3>
                           <div class="botones">
                            <i onclick="quitar(${id})" class="bi bi-bag-dash"></i>
                            <div id=${id} class="cantidad">
                            ${buscador.item === undefined ? 0 : buscador.item}</div>
                            <i onclick="incrementar(${id})" class="bi bi-bag-plus"></i>
                           </div>
                        </div>
                    </div>
                 </article>`;
    })

    document.getElementById("shop").innerHTML = contenidoHTML;

}
generarShop(productoStorage);


const btnFiltrar = document.querySelectorAll(".filter");

btnFiltrar.forEach(btn => {
    btn.addEventListener("click", (e) => {

        btnFiltrar.forEach(boton => boton.classList.remove("active-btn"))

        e.currentTarget.classList.add("active-btn");
        if (e.currentTarget.id != "todos") {
            const productoBoton = productoStorage.filter(producto => producto.categoria === e.currentTarget.id)

            generarShop(productoBoton);
        } else {
            generarShop(productoStorage);
        }
    })
})



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


let agregar = (id) => {
    let buscador = carrito.find((x) => x.id === id)
    document.getElementById(id).innerHTML = buscador.item;
    calculo()
};

let calculo = () => {
    let iconoCarrito = document.getElementById("cantidad")
    iconoCarrito.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);

};
calculo();

