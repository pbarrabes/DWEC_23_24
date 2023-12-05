document.addEventListener("DOMContentLoaded",manejadores);

function manejadores(){
    document.getElementById("addLista").addEventListener("click",añadirLista);
}

function añadirLista(e){
    const nombreLista=prompt("Nombre de la lista nueva");
    const seccionListaNueva=document.createElement("section");
    const listaNueva=document.createElement("ol");
    listaNueva.id=nombreLista;
    const tituloLista=document.createElement("h2");
    const botonAddTarea=document.createElement("button");
    const botonBorrarLista=document.createElement("button");
    tituloLista.innerText=nombreLista;
    botonAddTarea.innerText="Añadir Tarea";
    botonBorrarLista.innerText="Borrar Lista"
    botonAddTarea.addEventListener("click",addTarea);
    botonBorrarLista.addEventListener("click",(e)=>e.target.parentElement.remove());
    document.querySelector("main").append(seccionListaNueva);
    seccionListaNueva.append(tituloLista,botonBorrarLista,botonAddTarea,listaNueva);
}

function addTarea(e){
    const nombreTarea=prompt("Nombre de la tarea");
    const tareaNueva=document.createElement("li");
    tareaNueva.innerText=nombreTarea;
    //Boton Eliminar Tarea
    const btnEliminarTarea=document.createElement("button",);
    btnEliminarTarea.innerText="Eliminar Tarea";
    btnEliminarTarea.addEventListener("click",(e)=>e.target.parentElement.remove());
    //Boton Tarea antes
    const btnTareaAntes=document.createElement("button",);
    btnTareaAntes.innerText="Añadir Tarea Antes";
    btnTareaAntes.addEventListener("click",añadirAntes);
    //Boton Tarea Despues
    const btnTareaDespues=document.createElement("button",);
    btnTareaDespues.innerText="Añadir Tarea Despues";
    btnTareaDespues.addEventListener("click",añadirDespues);
    e.target.parentNode.append(tareaNueva);
    //Meto los botones dentro del li, para Drag and drop creo que ira mejor
    tareaNueva.append(btnEliminarTarea,btnTareaAntes,btnTareaDespues)
}

function añadirAntes(e){
    const nombreTarea=prompt("Nombre de la tarea");
    const tareaNueva=document.createElement("li");
    tareaNueva.innerText=nombreTarea;
    //Boton Eliminar Tarea
    const btnEliminarTarea=document.createElement("button",);
    btnEliminarTarea.innerText="Eliminar Tarea";
    btnEliminarTarea.addEventListener("click",(e)=>e.target.parentElement.remove());
    //Boton Tarea antes
    const btnTareaAntes=document.createElement("button",);
    btnTareaAntes.innerText="Añadir Tarea Antes";
    btnTareaAntes.addEventListener("click",añadirAntes);
    //Boton Tarea Despues
    const btnTareaDespues=document.createElement("button",);
    btnTareaDespues.innerText="Añadir Tarea Despues";
    btnTareaDespues.addEventListener("click",añadirDespues);
    e.target.parentNode.before(tareaNueva);
    //Meto los botones dentro del li, para Drag and drop creo que ira mejor
    tareaNueva.append(btnEliminarTarea,btnTareaAntes,btnTareaDespues)
}

function añadirDespues(e){
    const nombreTarea=prompt("Nombre de la tarea");
    const tareaNueva=document.createElement("li");
    tareaNueva.innerText=nombreTarea;
    //Boton Eliminar Tarea
    const btnEliminarTarea=document.createElement("button",);
    btnEliminarTarea.innerText="Eliminar Tarea";
    btnEliminarTarea.addEventListener("click",(e)=>e.target.parentElement.remove());
    //Boton Tarea antes
    const btnTareaAntes=document.createElement("button",);
    btnTareaAntes.innerText="Añadir Tarea Antes";
    btnTareaAntes.addEventListener("click",añadirAntes);
    //Boton Tarea Despues
    const btnTareaDespues=document.createElement("button",);
    btnTareaDespues.innerText="Añadir Tarea Despues";
    btnTareaDespues.addEventListener("click",añadirDespues);
    e.target.parentNode.after(tareaNueva);
    //Meto los botones dentro del li, para Drag and drop creo que ira mejor
    tareaNueva.append(btnEliminarTarea,btnTareaAntes,btnTareaDespues)
}