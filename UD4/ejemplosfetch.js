//USO https://jsonplaceholder.typicode.com/ para los ejemplos
const URL_BASE = 'https://jsonplaceholder.typicode.com/';

function ejemploGet() {
    fetch(URL_BASE+"posts")
        .then(response =>{
                if(response.ok){//Si considero la respuesta correcta
                return response.json();
                } else{
                    //Aqui no me gusta la respuesta del servidor. 
                    //Opcion de lanzar un error, ojo, si no lo hago continua con el then siguiente
                }
            })
        .then(data => {
            //Aqui tengo lso datos en formato objet parseado del json recibido
            console.log(typeof data,data);
        })
        .catch(error=>{
            //Gestion de errores
            console.error(error);
        })
}

//Ejemplo para insertar un nuevo elemento en el servidor
function ejemploPost() {
    let data = {
        title: 'ejemplo post',
        body: 'ejemplo post body',
        userId: 1
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(URL_BASE+"posts",options)
        .then(response => response.json(),error=> {throw new Error(error)} )//Lanzo un error de para que lo gestioines el catch
        .then(data => {
            //data representa el objeto creado en el servidor, se puede usar para comprobar que la inserción tuvo exito
            console.log(data);
        })
        .catch(error=>{
            //Gestion de errores
            console.error(error);
        })
}

//Ejemplo para actualizar un elemento en el servidor
// En el ejemplo supongo que modifico el priemr elemento de la lista. Si queremos otro habra que actualizar la url
function ejemploPut() {
    let data = {
        title: 'ejemplo put',
        body: 'ejemplo put body',
        userId: 1
    };
    const options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(URL_BASE+"posts/1",options)//Actualizo el primer elemento de la lista, si es otro habra que pasarlo en la url
        .then(response => response.json(),error=> {throw new Error(error)} )//Lanzo un error de para que lo gestioines el catch
        .then(data => {
            //data representa el objeto modificado en el servidor, se puede usar para comprobar que la modificacion tuvo exito
            console.log(data);
        })
        .catch(error=>{
            //Gestion de errores
            console.error(error);
        })
}

//Ejemplo para borrar un elemento en el servidor
// En el ejemplo supongo que borro el priemr elemento de la lista. Si queremos otro habra que actualizar la url
function ejemploDelete() {
    const options = {
        method: 'DELETE'
    };
    fetch(URL_BASE+"posts/1",options)//Borro el primer elemento de la lista, si es otro habra que pasarlo en la url
        .then(response => response.json(),error=> {throw new Error(error)} )//Lanzo un error de para que lo gestioines el catch
        .then(data => {
            //data representa el objeto borrado en el servidor, se puede usar para comprobar que ele borrado tuvo exito
            console.log(data);
        })
        .catch(error=>{
            //Gestion de errores
            console.error(error);
        })
}


//Ejemplos con async await

async function ejemploGetAsync() {
    try{
        let response = await fetch(URL_BASE+"posts");
        if(response.ok){
            try {
                let data = await response.json();
                console.log(typeof data,data);
            } catch (error) {
                //Gestion error al parsear el json
            }
        } else{
            //Aqui no me gusta la respuesta del servidor. 
            //LAnzo un error para que lo gestiones en el catch. ESte error es moptivado ya que la respuesta del servidor no es satisfactoria(404,500, etc)
            throw new Error(response.status);
        }
    } catch(error){
        //Gestion de errores
        console.error(error);
    }
}

async function ejemploPostAsync() { 
    let data = {
        title: 'ejemplo post',
        body: 'ejemplo post body',
        userId: 1
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try{
        let response = await fetch(URL_BASE+"posts",options);
        if(response.ok){//Aqui obtengo la respuesta con el elemento insertado, podria usarlo para comprobar que la insercion tuvo exito.
            try {
                let data = await response.json();
                console.log(data);
            } catch (error) {
                //Gestion error al parsear el json que me devuielve. Interpretar la situación.
            }
        } else{
            //Aqui no me gusta la respuesta del servidor. 
            //LAnzo un error para que lo gestiones en el catch. ESte error es moptivado ya que la respuesta del servidor no es satisfactoria(404,500, etc)
            throw new Error(response.status);
        }
    } catch(error){
        //Gestion de errores
        console.error(error);
    }
}