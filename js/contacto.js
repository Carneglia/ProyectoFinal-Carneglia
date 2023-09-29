const validarFormulario = (e) => {
    e.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let comentario = document.getElementById("comentario").value;
    let avisoComentario = document.getElementById("aviso");
    let avisoNombre = document.getElementById("avisoNombre");
    let avisoEmail = document.getElementById("avisoEmail");
    let resultado = document.getElementById("resultado");
    let formContacto = document.getElementById("formContacto");

    if (nombre == "") {
        avisoNombre.innerHTML = `Error! Ingrese su Nombre y Apellido`
        avisoNombre.style = "color:red;";
        return false
     
    };
   
    if (email == "") {
        avisoEmail.innerHTML = `Error! Ingrese su Email"`
        avisoEmail.style = "color:red;"
        return false
    };
    if (comentario == "") {
        avisoComentario.innerHTML = `Error! Complete el campo "Comentario"`
        avisoComentario.style = "color:red;"
        return false
    };

    resultado.innerHTML = `Su mensaje a sido enviado con éxito
    ¡GRACIAS por contactarnos!`;
    resultado.style = "color:green;"
    formContacto.submit();
}
document.getElementById("btnEnviar").addEventListener("click", validarFormulario);

const infoFormulario = () =>{
    let infoForm = document.getElementById("infoForm");
    infoForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        let formInfo = e.target;
        console.log(formInfo);
    })

}
infoFormulario();

const contarCaracteres = () => {
    let comentario = document.getElementById("comentario");
    let aviso = document.getElementById("aviso");
    const max = 400;
    let diferencia = max - comentario.value.length;

    if (comentario.value.length <= max) {
        aviso.innerHTML = `Caracteres disponibles ${diferencia}`
        if (diferencia < 100) {
            aviso.style = "color: red;";
        }
        else
            aviso.style = "color: black;";
    }

}
document.getElementById("comentario").addEventListener("input", contarCaracteres);
