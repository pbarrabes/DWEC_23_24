/*37 Crea un script en javascript para gestionar una colección de discos almacenando en Localstorage la información de forma permanente.

La colección la vamos a definir como un array de objetos. Cada elemento del array será un Disco que contendrá la siguiente información:
Nombre : string
Lista de canciones: Array de canciones. Cada canción será un objeto con tres atributos (título, autor, duración en mm:SS como string)
Artista: String con el nombre del grupo o interprete 
Año publicación
Estilo musical
Método mostrarCanciones: Al llamarlo nos muestra en una lista ordenada las canciones del Álbum.
Metodo añadirCancion: nos permite insertar una canción en el Álbum al final de las existentes.
Método borrarCancion: Nos permite eliminar una canción buscando por el título de la canción.

Crearemos las funciones necesarias para poder realizar las siguientes acciones :
Añadir un disco a la colección.
Eliminar un disco de la colección dado un nombre de disco.

Para ejecutar el programa debes crear un menú (en un prompt) en el que te ofrezca las siguientes opciones:
Añadir nuevo disco a la colección. Preguntar los datos del disco y opcionalmente incluir canciones al disco al añadirlo.
Añadir Canciones a un disco existente, para saber el disco al que añadimos la canción buscaremos por el nombre del disco.
Eliminar Disco buscando  por el nombre del disco.
Salir Guardando al LS. Muestra la colección en una lista  al salir
Salir sin guardar. Muestra la colección en una lista al salir

Los cambios en el LocalStorage se harán  cuando el usuario salga del menú de opciones en la opción 5.*/

const coleccionDiscos=[];
class Cancion {
    constructor(nombreCancion,autor,duracion){
        this.nombreCancion=nombreCancion;
        this.autor=autor;
        this.duracion=duracion;  
    }
};

class Disco {
    constructor(titulo,artista,agno,estilo,canciones=[]){
        this.titulo=titulo;
        this.canciones=canciones;
        this.artista=artista;
        this.agno=agno;
        this.estilo=estilo;
    }
        mostrarCanciones(){
            let mostrar=`<h2>Listado de canciones del album: ${this.titulo}</h2><ol>`;//Falta mostrar mas informacion  del disco.
            console.log(this);
            this.canciones.forEach(element => {
                console.log(element);
                mostrar+=`<li>${element.nombreCancion}</li>`
            });
            mostrar+="</ol>";
            document.write(mostrar);
        }
        añadirCancion(){
            let nombre=prompt("Titulo de la cancion");
            let autor=prompt("Autor de la cancion");
            let duracion=prompt("Duraccion de la cancion");
            let cancion = new Cancion(nombre,autor,duracion);
            this.canciones.push(cancion);
            
        }
        borrarCancion(cancion){    
            let posicion=-1;
            for (let i=0;i<this.canciones.length;i++) {
                if (this.canciones[i].nombreCancion==cancion){posicion =i}    
            }
            if(posicion>=0){
                this.canciones.splice(posicion,1);
            }
            else alert(`${cancion} No encontrada`);          
    }
};

function añadirDisco(){
    let tituloDisco=prompt("Titulo del disco"); 
    if(buscarDiscoporTitulo(tituloDisco)>=0){
        alert("Ya esta el disco en la coleccion");
    }
    else{
        let artista = prompt("Artista del disco");
        let agno= prompt("Año de publicacion");
        let estilo =prompt("Estilo musical");
        let añadirCanciones = confirm("¿Quieres añadir canciones al disco");
        let disco = new Disco(tituloDisco,artista,agno,estilo);
            if(añadirCanciones){
                let otraCancion=true;
                    while(otraCancion){
                    disco.añadirCancion();
                    otraCancion=confirm("Quieres añadir otra?");
                    }          
            }
        coleccionDiscos.push(disco);
    } 
};

function eliminarDisco(titulo){
    let posicion=buscarDiscoporTitulo(titulo);
    if(posicion>=0){
        alert("Disco borrado")
        coleccionDiscos.splice(posicion,1);
    }
    else alert(`${titulo} No encontrado`);
}

function buscarDiscoporTitulo(tituloDisco){
    let posicion=-1;
    //Busqueda con un for tradicional, con un foreach seria similar
   /*  for (let i=0;i<coleccionDiscos.length;i++) {
        if (coleccionDiscos[i].titulo==titulo){posicion =i}    
    }
    return posicion; */
    // usando finindex, es similar a indexOf pero con un callback que me permite buscar dentro del objeto del array
    posicion= coleccionDiscos.findIndex((element=>element.titulo==tituloDisco));

    return posicion;
}

function cargarColeccionLS(){
    //cargamos la coleccion del LocalStorage
    let coleccionLS=localStorage.getItem("coleccionDiscos");
    if(coleccionLS!=null){
        const coleccion=JSON.parse(coleccionLS)
        coleccion.forEach(disco=>{
            const discoIns= new Disco(disco.titulo,disco.artista,disco.agno,disco.estilo,disco.canciones);
            coleccionDiscos.push(discoIns)
        });
        alert("Coleccion de discos cargada");
    }
    else{
        alert("No hay coleccion guardada")
    }
}


cargarColeccionLS();
let salir=false;
do{
    let opcion= prompt("1: Añadir Disco \n2: Añadir Canciones a un disco \n3: Eliminar disco \n4: Salir sin guardar\n5:Salir guardando");
    console.log(coleccionDiscos.length);
    switch (opcion) {
    case "1":   
        añadirDisco(); 
        break;
    case "2":
        // Añadir canciones a un disco.
        let tituloBuscar=prompt("Dime el titulo del disco");
        let posicionDisco= buscarDiscoporTitulo(tituloBuscar);
         if(posicionDisco>=0){
            coleccionDiscos[posicionDisco].añadirCancion();
        }
        break;
    case "3":
        // eliminar el disco por el titulo.
        eliminarDisco(prompt("Dime el titulo del disco a eliminar"));
        break;
    case "4":
        //Salir sin guardar. Muestro lo que habia en memoria.
        coleccionDiscos.forEach(element=>element.mostrarCanciones());
        salir=true
        break; 
    case "5":
        //Salir guardando
        localStorage.setItem("coleccionDiscos",JSON.stringify(coleccionDiscos));
        // faltaria un mensaje validadndo el guardado.
        salir=true;
        coleccionDiscos.forEach(element=>element.mostrarCanciones());
        break;           
    default:
        alert("seleciona una opcion valida");
        break;
    }
} while(!salir)