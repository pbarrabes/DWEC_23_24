const URL_SERVER ="IP_SERVER:3000/";

document.addEventListener("DOMContentLoaded",cargarListas,{once:true})

async function cargarListas(){
    //Esta la hago con await y try catch para gestionar errores
    try {
        let response = await fetch(URL_SERVER+"listas/");
        console.log(response);
        try {
            if(response.ok){//Si la respuesta  es satisfactoria
                let listas = await response.json();
                //Aqui pintamos la lista en la pagina.
                console.log(listas);
                document.querySelector("main").innerHTML="<button id='addLista'>Añadir Lista nueva</button>";
                document.getElementById("addLista").addEventListener("click", añadirListaNueva)
                pintarListas(listas);
            } 
            else {//Lanzo un error si la respuesta del servidor no es OK (500 por ejemplo)
                throw new Error (response.statusText);
            }
        } catch (error) {
            document.querySelector("main").innerHTML="Error al obtener la lista del servidor"
            console.error("Error: "+error);
        }   
    } catch (error) {
        document.querySelector("main").innerHTML=`Error de conexion con el servidor, revisa la conexion a la red o los datos de conexion`
        console.error("Error: "+error);
    }
} 



/*function cargarListas(){
    //Version con then y catch
    fetch(URL_SERVER+"listas/")
    .then(response=>{
        if(response.ok){
            return response.json();
        }
        else throw new Error(response.status);
        },
        error=>{
            console.error(error);
            // despues de ejecutar este callback procesa la segunda promesa como aceptada. Lanzo un error para evitarlo y pasar al catch. Revisarlo    
            throw new Error("Error de red");
        })
    .then((data)=>{
        //Aqui actuariamos con los datos recibidos
        document.querySelector("main").innerHTML="<button id='addLista'>Añadir Lista nueva</button>";
        document.getElementById("addLista").addEventListener("click", añadirListaNueva)
        pintarListas(data);
        console.log(data)
    })
    .catch(error=>{
        //llego aqui en cualquier caso, en este catch manejo los dos tipos de errores, de red y de respuesta del servidor.
        document.querySelector("main").innerHTML+="Error al obtener la lista del servidor: "+error;
        console.error(error);
    })
}*/

function borrarListaServidor(e){
    let id=e.target.parentElement.querySelector("ol").id
    fetch(`${URL_SERVER}listas/${id}`,{method:"DELETE"})
        .then(response=>{
            console.log(response);
            if(response.ok){
                cargarListas();
            }
            else console.error("NO se ha podido borrar")
        })
        .catch(error=>console.error(error))
}
function añadirListaNueva(){
    nombreLista=prompt("Nombre de la lista nueva");
    guardarLista({nombreLista,"tareas":[]});
} 

function pintarListas(listas){
    listas.forEach(element => {
        const seccionListaNueva=document.createElement("section");
        const listaNueva=document.createElement("ol");
        listaNueva.id=element.id;
        const tituloLista=document.createElement("h2");
        tituloLista.innerText=element.nombreLista;
        const botonAddTarea=document.createElement("button");
        const botonBorrarLista=document.createElement("button");
        const botonEliminarTarea=document.createElement("button");
        botonAddTarea.innerText="Añadir Tarea";
        botonAddTarea.addEventListener("click", añadirTarea);
        botonBorrarLista.textContent="Borrar Lista";
        botonBorrarLista.addEventListener("click", borrarListaServidor);
        botonEliminarTarea.innerText="Eliminar Tarea";
        botonEliminarTarea.addEventListener("click",eliminarTarea);
        //Falta asignar los manejadores de los botones
        document.querySelector("main").append(seccionListaNueva);
        seccionListaNueva.append(tituloLista,botonBorrarLista,botonAddTarea,botonEliminarTarea,listaNueva);
        element.tareas.forEach(tarea=>{
            const tareaNueva=document.createElement("li");
            tareaNueva.innerText=tarea;
            listaNueva.append(tareaNueva);
            }
        )

    });
}
/* async function guardarLista(lista){
    const options={
        method: "POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(lista)
    }
    let response = await fetch(`${URL_SERVER}listas/`,options)
    if(response.ok){
        //ES una buena idea ver si lo que se ha insertado es correcto, falta hacerlo
        //response.json deberia coincidir con lo que le mando
        cargarListas();
    }else{
        //Mostrar un mensaje de error 
    }
    
} */

function guardarLista(lista){
    const options={
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(lista)
    }
    fetch(`${URL_SERVER}listas/`,options)
    .then(response=>{
        if(response.ok)
        cargarListas();
        else{
            console.error(response.status)
            //Mensaje de error en la respuesta del servidor.
        } 
    })
    .catch(error=>console.error(error))//En este caso es n error de conectividad con el servidor.
}
function añadirTarea(e){
    const tarea=prompt("Texto de la tarea");
    const idLista= e.target.parentElement.querySelector("ol").id;
    //Busco la lista en el servidor
    fetch(`${URL_SERVER}listas/${idLista}`)
    .then(response=>{
        if(response.ok){
            return response.json();

        }else{
            console.error(response.status);
        }
    })
    .then(data=>{
        data.tareas.push(tarea);
        actualizarLista(data, idLista)  
    })
}
function actualizarLista(lista,id){
    const options={
        method:"PUT",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(lista)
    }
    fetch(`${URL_SERVER}listas/${id}`,options)
        .then(response=>{
            if(response.ok){
                cargarListas();
            }
        })
}

function eliminarTarea(e){//PAra simplificar pregunto el numero de tarea.
    const numTarea=parseInt(prompt("Numero de tarea a eliminar"));
    const idLista= e.target.parentElement.querySelector("ol").id;
    //Busco la lista en el servidor
    fetch(`${URL_SERVER}listas/${idLista}`)
    .then(response=>{
        if(response.ok){
            return response.json();

        }else{
            console.error(response.status);
        }
    })
    .then(data=>{
        data.tareas.splice(numTarea-1,1);
        console.log(data);
        actualizarLista(data, idLista)  
    })

}
