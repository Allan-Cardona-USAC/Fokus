const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonDescansoLargo = document.querySelector('.app__card-button--largo')
// variable para el cambio de imagen
const baner = document.querySelector('.app__image');
// variable para el titulo
const titulo = document.querySelector('.app__title');
// variable para el active del boton y usamos el querySelectorAll paro tomar a todos
const botones = document.querySelectorAll('.app__card-button');
//variable para modificar y hacer sonar la musica
const inputEnfoqueMusica = document.querySelector("#alternar-musica");
// variable para modificar o accionar el temporizador
const botonIniciarPausar = document.querySelector('#start-pause');
// variable para modificar texto de boton
const textoIniciarPausar = document.querySelector('#start-pause span');
//variable para cambiar icono de boton
const iconoInicialPausar = document.querySelector('.app__card-primary-butto-icon');
// variable para mostrar el tiempo en pantalla
const tiempoEnPantalla = document.querySelector('#timer');

// creamos una nueva variable para el manejo de objetos
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
/*Primero, para cada archivo de audio, es necesario crear una instancia del objeto Audio y guardarlas en variables. Entonces, hice lo siguiente: */
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3')
// creacion de variable para el tiempo del temporizador 
let tiempoTranscurridoEnSegundos = 1500;

let intervaloId = null;

/*
// ahora vamos a escuchar un evento y colocamos una funsion en flecha o aroow funtion
botonCorto.addEventListener('click' , ()=>{
    // va agarrar el valor que tenemos y lo va a sustituir por el que queremos
    html.setAttribute('data-contexto', 'descanso-corto')
    //Cambio de imagen al ejecutarse el evento 'click'
    baner.setAttribute('src', '/imagenes/descanso-corto.png')
})
// ahora lo implementaremos con el boton de enfoque
botonEnfoque.addEventListener('click' , ()=>{
    // va agarrar el valor que tenemos y lo va a sustituir por el que queremos
    html.setAttribute('data-contexto', 'enfoque')
    //Cambio de imagen al ejecutarse el evento 'click'
    baner.setAttribute('src', '/imagenes/enfoque.png')
})
// ahora lo implementaremos con el boton descanso largo
botonDescansoLargo.addEventListener('click' , ()=>{
    // va agarrar el valor que tenemos y lo va a sustituir por el que queremos
    html.setAttribute('data-contexto', 'descanso-largo')
    //Cambio de imagen al ejecutarse el evento 'click'
    baner.setAttribute('src', '/imagenes/descanso-largo.png')

})
*/
//agregamos la musica en un cilco con loop
musica.loop = true;
// vamos a crear otro funcion de flecha
inputEnfoqueMusica.addEventListener('change', ()=>{
    // Si musica esta pausada
    if (musica.paused ) {
        // entonces reproducimos
        musica.play();
    }else{
        // si no pausamos
        musica.pause();
    }

})

// Vamos a optimizar el codigo creando una funcion que mande a llamar al contexto
// y al cambio de imagen en una solo funcion 
// nameFuntion('cambio de contexto',' cambio de imagen')
function cambioContextoImagen (contexto, imagen){
    // llamamos a el tiempo para que cambie conforme se cambie el contexto
    mostrarTiempo();
    // es un bucle para cada una de las funciones
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto',contexto);
    baner.setAttribute('src', imagen);
    // creamos un case para poder modificar el texto
    switch (contexto) {
        case "enfoque":
            // aqui agregamos el texto del html a mostrar
            titulo.innerHTML =`Siempre debes,<br>
            <strong class="app__title-strong"> llevar tus habilidades al limite.</strong>`
            break;
        case "descanso-corto":
            // aqui agregamos el texto del html a mostrar
            titulo.innerHTML = `Se diferente,<br>
            <strong class="app__title-strong"> el cambio esta en ti.</strong>`
            break;
        case "descanso-largo":
            // aqui agregamos el texto del html a mostrar
            titulo.innerHTML = `Si lo puedes,<br>
            <strong class="app__title-strong">Imaginar lo puedes Programar.</strong>`
            break;
        default:
            break;
    }
}
botonCorto.addEventListener('click' , ()=>{
    // llamamos la variable donde almacenamos el tiempo y modificamos du conteo
    tiempoTranscurridoEnSegundos = 300;
    //mandamos a llamar ala funcion y podemos cambiar los parametros a una sola linea de cod
    cambioContextoImagen('descanso-corto','/imagenes/descanso-corto.png')
    botonCorto.classList.add('active');
})
botonEnfoque.addEventListener('click' , ()=>{
    tiempoTranscurridoEnSegundos = 1500;
    //mandamos a llamar ala funcion y podemos cambiar los parametros a una sola linea de cod
    cambioContextoImagen('enfoque','/imagenes/enfoque.png')
    botonEnfoque.classList.add('active');
})
botonDescansoLargo.addEventListener('click' , ()=>{
    tiempoTranscurridoEnSegundos = 900;
    //mandamos a llamar ala funcion y podemos cambiar los parametros a una sola linea de cod
    cambioContextoImagen('descanso-largo','/imagenes/descanso-largo.png')
    botonDescansoLargo.classList.add('active');
})

/*FUNSION PARA MANIPULACION DEL TIEMPO */
const cuentaRegresiva = () =>{
    if (tiempoTranscurridoEnSegundos <= 0) {
        //Después, llamé a "audioTiempoFinalizado " dentro de la función `cuentaRegresiva()`Después, 
        //llamé a "audioTiempoFinalizado " dentro de la función `cuentaRegresiva()`
        audioTiempoFinalizado .play()
        alert("Tiempo Colcluido")
        //llamamos la funcion reiniciar 
        reiniciar();
        // este retur es pára interumpir el bucle que se forma
        return
    }
    // usamos textContent cuando queremos agregar texto a nuestro html
    textoIniciarPausar.textContent = "Pausar";
    // usamos para cambiar el icono de pausa con image
    iconoInicialPausar.setAttribute('src','/imagenes/pause.png')
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo();
    console.log(tiempoTranscurridoEnSegundos)
    console.log('Id: ' + intervaloId) // Muestra el ID actual
}

//ejecutamos el codigo del evnto al escuchar
// en los parentesis va cual es el evento que queremos escuchar
botonIniciarPausar.addEventListener('click',iniciarPausar)

/*Y por último, llamé a "audioPausa" y 
"audioPlay" dentro de la función iniciarOuPausar() */

// creacion de otra funsion 
 function iniciarPausar(){
    //setencia if para pausar
    if (intervaloId) {
        audioPausa.play();  //Y por último, llamé a "audioPausa"
        reiniciar()
        return
    }
    // set nos indica el intervalo en que una cosa va a ocurrir
    // setInterval usa un formato de milisegunos 1 sg = 1000 segundos
    audioPlay.play(); //Y por último, llamé a "audioPausa"
    intervaloId = setInterval(cuentaRegresiva, 1000)
 }
 // funsion para reiniciar la pagina
 function reiniciar(){
    textoIniciarPausar.textContent = "Comenzar";
    iconoInicialPausar.setAttribute('src','/imagenes/play_arrow.png')
    // limpiamos el temporizador 
    clearInterval(intervaloId)
    intervaloId = null;
 }
 //Funcion para mostrar el tiempo en pantalla
 function mostrarTiempo ()
 {
    // instanciar un objeto date es para manejar fechas y horas
    // multiplicamos la variable por 1000 por que asi tienne un formato en minutos
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000) 
    // usando el metodo formatea la hora deacuerdo a la zona o region
    const tiempoFormatiado = tiempo.toLocaleTimeString("es-GT" , {minute:'2-digit', second:'2-digit'})
    tiempoEnPantalla.innerHTML=`${tiempoFormatiado}`
 }
 // mandamos a llamar la funcion para que se muestre siempre el temporizador
 mostrarTiempo();