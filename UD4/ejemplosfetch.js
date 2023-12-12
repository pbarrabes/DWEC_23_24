//USO https://jsonplaceholder.typicode.com/ para los ejemplos

function ejemploGet() {
    fetch('https://jsonplaceholder.typicode.com/posts/')
        .then(response =>{
                if(response.ok){//Si considero la respuesta correcta
                return response.json();
                } else{
                    //Aqui no me gusta la respuesta del servidor. 
                    //Opcion de lanzar un error, ojo, si no lo hago continua con el then siguiente
                }
            }
            )
        .then(data => {
            //Aqui tengo lso datos en formato objet parseado del json recibido
            console.log(typeof data,data);
        })
        .catch(error=>{
            //Gestion de errores
            console.error(error);
        })
}