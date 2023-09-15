let shop = document.getElementById("shop");

let shopItemsInfo = [
    { id: 1, nombre: "flora ring", precio: 3500, desc: "Lorem ipsum dolor sit amet consectetur adipisicing.", img: "../recursos/images/anilloFlora.jpg" },
    { id: 2, nombre: "strigs", precio: 4000, desc: "Lorem ipsum dolor sit amet consectetur adipisicing.", img: "../recursos/images/pulseras.jpg" },
    { id: 3, nombre: "wind erring", precio: 4500, desc: "Lorem ipsum dolor sit amet consectetur adipisicing.", img: "../recursos/images/aroViento.jpg" },
    { id: 4, nombre: "magic ring", precio: 3500, desc: "Lorem ipsum dolor sit amet consectetur adipisicing.", img: "../recursos/images/anilloDadoMano.jpg" }
]


let = carrito = [];


let generarShop = () => {
    return (shop.innerHTML = shopItemsInfo.map((x) => {
        let { id, nombre, precio, desc, img } = x;
        return ` 
            <article id=pruduct-id-${id} class="item" >
                <img src=${img}>
                <div class="detalles">
                    <h2>${nombre}</h2>
                    <p>${desc}</p>
                    <div class="precio-cantidad">
                        <h3> $ ${precio} </h3>
                       <div class="botones">
                        <i onclick="quitar(${id})" class="bi bi-dash"></i>
                        <div id=${id} class="cantidad">0</div>
                        <i onclick="incrementar(${id})" class="bi bi-plus"></i>
                       </div>
                    </div>
                </div>
            </article>
    `
    }).join(""));
};

generarShop();

let incrementar = (id) => {
  let itemSeleccionado = id;
  let buscador = carrito.find((x)=>x.id === itemSeleccionado)

  if(buscador === undefined){
    carrito.push({
        id: itemSeleccionado,
        item:1,

    });
  }
  else{
    buscador.item +=1;
  }

 
   // console.log(carrito);
    agregar(itemSeleccionado);
}


let quitar = (id) => {
    let itemSeleccionado = id;
    let buscador = carrito.find((x)=>x.id === itemSeleccionado)
  
    if(buscador.item === 0) return;
    else{
      buscador.item -=1;
    }
  
    agregar(itemSeleccionado);
      //console.log(carrito);
}


let agregar = (id) => {
    let buscar = carrito.find ((x)=> x.id === id)
    //console.log(buscar.item);
    document.getElementById(id).innerHTML = buscar.item;
    calculo()
};

let calculo = () => {
    let iconoCarrito = document.getElementById("cantidad")
    iconoCarrito.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);
 
}

