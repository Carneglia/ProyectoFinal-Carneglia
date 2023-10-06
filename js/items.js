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
    let { id, nombre, precio, descXL, img, info, material } = producto;

    let buscador = carrito.find((x) => x.id === id) || [];

    document.getElementById("imagenProducto").src = img;
    document.getElementById("nombreProducto").innerHTML = nombre;

    document.getElementById("descripcionProducto").innerHTML = descXL;
    document.getElementById("precioProductoDesc").innerHTML = `Precio $ ${precio}`;
    document.getElementById("botonAgregar").innerHTML = `
     <i onclick="quitar(${id})" class="bi bi-bag-dash"></i>
  
    <div id=${id} class="cantidad">
    ${buscador.item === undefined ? 0 : buscador.item}</div>

    <i onclick="incrementar(${id})" class="bi bi-bag-plus"></i>
   </div>`;

    document.getElementById("precioProductoDesc").innerHTML = `$ ${precio}`;
    document.getElementById("info").innerHTML = info;
    document.getElementById("material").innerHTML = `Material: ${material} `;


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


const calcularEnvio = async () => {
    const codigoIngresado = document.getElementById("calcularEnvio").value;
    const url = 'https://correo-argentino1.p.rapidapi.com/calcularPrecio?cpOrigen=1000&cpDestino=' + codigoIngresado + '&provinciaOrigen=AR-B&provinciaDestino=AR-S&peso=2';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a669bfcf38msh0936fda8236115cp17e030jsn80c666c8fba9',
            'X-RapidAPI-Host': 'correo-argentino1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        const resultado = result.paqarClasico.aDomicilio
        const resultadoDos = result.paqarClasico.aSucursal
        const r1 = Math.ceil(resultado)
        const r2 = Math.ceil(resultadoDos)


        contenidoHTML = `
         <img src="../recursos/images/correo.png" alt="Imagen correo Argentino" width=190>
         <p> Envío a Domicilio: <b>$ ${r1} </b></p>
         <p> Retiro en Sucursal: <b>$ ${r2} </b></p>
        `
        document.getElementById("c-e-resultado").innerHTML = contenidoHTML;
    } catch (error) {
        console.error(error);
    }
}
document.getElementById("btnCalcularEnvio").addEventListener("click", calcularEnvio);

const input = document.getElementById("calcularEnvio");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btnCalcularEnvio").click();
  }
});