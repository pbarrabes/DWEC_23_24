document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("nombre").addEventListener("blur", validarNombre);
    document.getElementById("apellidos").addEventListener("blur", validarApellidos);
    document.getElementById("DNI").addEventListener("blur", validarDNI);
    document.getElementById("username").addEventListener("focus", sugerirUsername);
    document.getElementById("password").addEventListener("input", validarPassword);
    document.getElementById("password").addEventListener("blur", validarPassword);//Si solo lo hago en el input se puede dejar en blanco y no salta el error
    document.getElementById("password2").addEventListener("blur", validarRepeticionPassword);
    document.getElementById("email").addEventListener("blur", validarMail);//Lo pongo condicionado a que avisis este chequeado
    document.getElementById("formulario").addEventListener("submit", validarFormulario);
})

function validarNombre(e){   
    let inputNombre = document.getElementById("nombre");//No puedo usar this ni e.currentTarget ni siquiera e.target ya que tambien lo llamo desde el submit
    let spanError = document.getElementById("errorNombre");
    if(inputNombre.value.length < 3){
        spanError.innerText = "El nombre debe tener al menos 3 caracteres";
        inputNombre.classList.add("invalido");
        return false;
    }
    //Al salir los trasformamos a la primera letra mayuscula y el resto minusculas
    inputNombre.value = inputNombre.value.charAt(0).toUpperCase() + inputNombre.value.substring(1).toLowerCase();
    spanError.innerText = ""
    inputNombre.classList.remove("invalido");
    return true;
    
}

function validarApellidos(e){
//Los apellidos minimo tienen que tener 3 caracteres
//Al salir los trasformamos a la primera letra mayuscula de cada palabra y el resto minusculas
let inputApellidos = document.getElementById("apellidos");
let spanError = document.getElementById("errorApellidos");
if(inputApellidos.value.length < 3){
    spanError.innerText = "Los apellidos deben tener al menos 3 caracteres";
    inputApellidos.classList.add("invalido");
    return false;
}
let apellidos = inputApellidos.value.split(" ");//LO METO EN UN ARRAY
let apellidosFormateados = apellidos.map((apellido)=>apellido.charAt(0).toUpperCase() + apellido.substring(1).toLowerCase());//LO FORMATEO
inputApellidos.value = apellidosFormateados.join(" ");//LO VUELVO A JUNTAR, se podria hacer con toString() tambien en lugar de join
spanError.innerText = "";
inputApellidos.classList.remove("invalido");
return true;
}
function validarDNI(e){
    let inputDNI = document.getElementById("DNI");
    let spanError = document.getElementById("errorDNI");
    let dni = inputDNI.value.trim().toUpperCase();

    // Verificar la longitud
    if (dni.length !== 9) {
        spanError.innerText = "El DNI debe tener 9 caracteres";
        inputDNI.classList.add("invalido");
        return false;
    }

    // Verificar si losprimeros 8 caracteres son números y luego una letra Mayuscula
    if (!/^\d{8}[A-Z]$/.test(dni)) {
        spanError.innerText = "El formato del DNI es incorrecto";
        inputDNI.classList.add("invalido");
        return false;
    }
    // verificar si la letra es la adecuada
    //Se puede hacer tambien sustituyenddo el string por un array y la posicion en el array por el indice
    let letra = dni.charAt(8);
    let numeros = dni.substring(0, 8);
    let indiceLetra = parseInt(numeros) % 23;
    let letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";//NOTA Esta informacion se obtiene de la web de la policia
    if (letrasValidas.charAt(indiceLetra) !== letra) {
        document.getElementById("errorDNI").innerText = "La letra del DNI es incorrecta";
        inputDNI.classList.add("invalido");
        return false;
    }
    document.getElementById("errorDNI").innerText = "";
    inputDNI.classList.remove("invalido");
    return true;
}
function sugerirUsername(e){
    let inputNombre = document.getElementById("nombre");
    let inputApellidos = document.getElementById("apellidos");
    let inputUsername = document.getElementById("username");
    inputUsername.value = `${inputNombre.value.charAt(0).toLowerCase()}${inputApellidos.value.toLowerCase().replace(" ", "")}`;
}
function validarPassword(e){
    let inputPassword = document.getElementById("password");
    let spanError = document.getElementById("errorPassword");
    let patron = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if(!patron.test(inputPassword.value)){
        spanError.innerText = "La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero";
        inputPassword.classList.add("invalido");
        return false;
    }
    spanError.innerText = "";
    inputPassword.classList.remove("invalido");
    return true;
}
function validarRepeticionPassword(e){
    let inputPassword = document.getElementById("password");
    let inputRepeticionPassword = document.getElementById("password2");
    let spanError = document.getElementById("errorPassword2");
    if(inputPassword.value !== inputRepeticionPassword.value){
        spanError.innerText = "Las contraseñas no coinciden";
        inputRepeticionPassword.classList.add("invalido");
        return false;
    }
    spanError.innerText = "";
    inputRepeticionPassword.classList.remove("invalido");
    return true;

}
function validarMail(e){//Validamos el mail solo si antes han chequedao la casilla de avisos. Con esto solo no vale. Habria que hacerlo tambien en el submit
    let patron = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let inputMail = document.getElementById("email");
    let spanError = document.getElementById("errorEmail");
    if(document.getElementById("avisos").checked == false){
        spanError.innerText = "";
        inputMail.classList.remove("invalido");
        return true;
    }else{   
        if(!patron.test(inputMail.value)){
            spanError.innerText = "El email no es valido";
            inputMail.classList.add("invalido");
        return false;
        }
        spanError.innerText = "";
        inputMail.classList.remove("invalido");
        return true;
    }
    
}



function validarFormulario(e){
    console.log(e);
    e.preventDefault();
    if(!validarNombre(e)){  
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa el nombre";
        document.getElementById("nombre").focus();
    }
    else if(!validarApellidos(e)){
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa los apellidos";
        document.getElementById("apellidos").focus();
    }
    else if(!validarDNI(e)){
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa el DNI";
        document.getElementById("DNI").focus();
    }
    else if(!validarPassword(e)){
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa la contraseña";
        document.getElementById("password").focus();
    }
    else if(!validarRepeticionPassword(e)){
        document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa la repeticion de la contraseña";
        document.getElementById("password2").focus();
    }
    else if(document.getElementById("avisos").checked){//VERsion sencilla
        if(!validarMail()){
            document.getElementById("errorForm").innerText = "No se ha podido enviar el formulario, revisa el email";
            document.getElementById("email").focus();
        };
    }
    else{
        document.getElementById("errorForm").innerText = "";
        //document.getElementById("formulario").submit();
        e.target.submit();
    }
}