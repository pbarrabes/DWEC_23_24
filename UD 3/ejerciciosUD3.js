/*EJERCICIO  1 Asigna un manejador de evento a los dos momentos de carga de la pagina (DOMContentLoaded, load) muestra el tipo de evento y el target.*/
/* 
document.addEventListener("DOMContentLoaded", mensaje);
window.addEventListener("load", mensaje);
window.addEventListener("beforeunload", mensaje);

function mensaje(e){
    alert(`el evento disparado es:${e.type}`);
    console.log(`el evento disparado es:${e.type}`);
} */

/* EJERCICIO 2 Mostrar un alert con las coordenadas de la pantalla en las que se ha pulsado un boton del raton en cualquier punto del documento. 
Incluir también con que botón se ha pulsado. AYUDA El evento "click" igual no es la mejor idea para este ejercicio*/
/* document.addEventListener("DOMContentLoaded", ejercicio2);

function ejercicio2(e){

document.addEventListener("mousedown", (e)=>{
    console.log(`has pulsado en las coordenadas de la pantalla: ${e.screenX}:${e.screenY} con el boton:${e.button}`)
})
} */

/* EJERCICIO 3 Muestra en un párrafo de documento las coordenadas actualizadas en las que se encuentra el ratón cada vez que se mueva.*/
/* document.addEventListener("DOMContentLoaded", ejercicio3);
function ejercicio3(e){
    document.addEventListener("mousemove", (e)=>{
        document.getElementById("mostrarInformacion").innerText=`coordenadas del raton: ${e.screenY}:${e.screenY}`;
    })
} */

/* EJERCICIO 4
Mostrar un alert con la tecla que se ha pulsado. 
Indicar también si estaba pulsada simultáneamente la tecla Alt o la tecla Ctrl
*/
/* document.addEventListener("DOMContentLoaded", ejercicio4);
function ejercicio4(e){
    document.addEventListener("keydown", (e)=>{
        alert(`Has pulsado la tecla: ${e.key} con la tecla alt: ${e.altKey?"Pulsada":"No pulsada"} y la tecla ctrl: ${e.ctrlKey?"Pulsada":"No pulsada"}`);
    })
} */

/* EJERCICIO 5
Mostrar un texto en un párrafo con las dimensiones de la ventana cada vez que es redimensionada .
*/

/* document.addEventListener("DOMContentLoaded", ejercicio5);
function ejercicio5(e){
    window.addEventListener("resize", (e)=>{
        document.getElementById("mostrarInformacion").innerText=`Dimensiones de la ventana: ${window.innerWidth}:${window.innerHeight}`;
    })
}
 */
/* EJERCICIO 6 
Crea un boton con un texto y que cada vez que lo pulsas cambie de negro a rojo y viceversa el color del texto
*/
/* document.addEventListener("DOMContentLoaded", ejercicio6);
function ejercicio6(e){
    document.getElementById("parrafo").addEventListener("mouseenter", (e)=>{
        e.target.classList.toggle("resaltado");
    })
    document.getElementById("parrafo").addEventListener("mouseleave", (e)=>{
        e.target.classList.toggle("resaltado");
    })
    
}
 */
/* EJERCICIO 7  
Crea un input tipo texto y que al salir del campo el contenido se pase a mayúsculas automáticamente. */
/* document.addEventListener("DOMContentLoaded", ejercicio7);
function ejercicio7(e){
    document.getElementById("texto").addEventListener("change", (e)=>{
        e.target.value=e.target.value.toUpperCase();
    })
} */

/* EJERCICIO 8
Coloca una imagen en el documento  y que cuando pasemos por encima la imagen cambie 
(lo puedes hacer con dos imágenes diferentes o la misma en diferentes tamaños)
*/

/* document.addEventListener("DOMContentLoaded", ejercicio8);
function ejercicio8(e){
    document.getElementById("foto").addEventListener("mouseenter", (e)=>{
        e.target.src="http://127.0.0.1:5500/Curso%2023-24/UD3/ejerciciosUD3/gato.jpeg";
    })
    document.getElementById("foto").addEventListener("mouseleave", (e)=>{
        e.target.src="http://127.0.0.1:5500/Curso%2023-24/UD3/ejerciciosUD3/perro.jpeg";
    })
    
} */

/* EJERCICIO 9
Haz un juego en el que el usuario tenga que adivinar una letra  aleatoria del abecedario pulsando en el teclado 
(No hay que introducirla en ningún campo de texto ni similar). Indicandole mayor o menor según el orden alfabético en un párrafo en el documento. 
*/
/* document.addEventListener("DOMContentLoaded", ejercicio9);
function ejercicio9(e){
    const abecedario="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let letraAleatoria=abecedario.charAt(Math.floor(Math.random()*abecedario.length));
    console.log(letraAleatoria);
    document.addEventListener("keydown", (e)=>{//Se podria añadir que solo se pueda pulsar una letra y avise si se pulsa otra cosa por codigo??
        let letraPulsada=e.key.toUpperCase();
        if(letraPulsada===letraAleatoria){
            document.getElementById("mostrarInformacion").innerText=`Has acertado la letra`;
        }else if(letraPulsada<letraAleatoria){
            document.getElementById("mostrarInformacion").innerText=`La letra es mayor que ${letraPulsada}`;
        }else{
            document.getElementById("mostrarInformacion").innerText=`La letra es menor que ${letraPulsada}`;
        }
    })
} */

/* EJERCICIO 10 VALIDACION FORMULARIO FICHERO APARTE */

/* EJERCICIO 11*/
