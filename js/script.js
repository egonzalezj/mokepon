/*____Variables globales____*/
let ataqueJugador = "";
let ataqueEnemigo = "";
let resultadoCombate = "";
let vidasJugador = 3;
let vidasEnemigo = 3;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function iniciarJuego() {
    //Botones
    let btnMascotaJugador = document.getElementById("btn-mascotaJugador");
    let btnFuego = document.getElementById("btn-fuego");
    let btnAgua = document.getElementById("btn-agua");
    let btnTierra = document.getElementById("btn-tierra");
    let btnReiniciar = document.getElementById("btn-reiniciar");
    //Secciones
    let seccionSeleccionarAtaqueJugador = document.getElementById("seleccionar-ataqueJugador");
    let seccionResultado = document.getElementById("resultado");
    let seccionMensajes = document.getElementById("mensajes");
    let seccionReiniciar = document.getElementById("reiniciar");

    seccionSeleccionarAtaqueJugador.style.display = "none";
    seccionResultado.style.display = "none";
    seccionMensajes.style.display = "none";
    seccionReiniciar.style.display = "none";

    btnFuego.disabled = false;
    btnAgua.disabled = false;
    btnTierra.disabled = false;

    btnMascotaJugador.addEventListener("click", seleccionarMascota);
    btnFuego.addEventListener("click", ataqueFuego);
    btnAgua.addEventListener("click", ataqueAgua);
    btnTierra.addEventListener("click", ataqueTierra);
    btnReiniciar.addEventListener("click", reiniciarJuego);
}

function ataqueFuego() {
    ataqueJugador = 1;
    definirAtaqueJugador(definirAtaque(ataqueJugador));
}

function ataqueAgua() {
    ataqueJugador = 2;
    definirAtaqueJugador(definirAtaque(ataqueJugador));
}

function ataqueTierra() {
    ataqueJugador = 3;
    definirAtaqueJugador(definirAtaque(ataqueJugador));
}

function crearMensaje() {
    let spanVidasJugador = document.getElementById("span-vidasJugador");
    let spanVidasEnemigo = document.getElementById("span-vidasEnemigo");
    let seccionResultado = document.getElementById("resultado");
    let seccionMensajes = document.getElementById("mensajes");
    let mensajesJugador = document.getElementById("mensajesJugador");
    let mensajesEnemigo = document.getElementById("mensajesEnemigo");
    let nuevoAtaqueJugador = document.createElement("p");
    let nuevoAtaqueEnemigo = document.createElement("p");

    seccionMensajes.style.display = "grid";
    seccionResultado.style.display = "flex";
    spanVidasJugador.innerHTML = vidasJugador;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
    nuevoAtaqueJugador.innerHTML = ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;
    seccionResultado.innerHTML = resultadoCombate;
    mensajesJugador.appendChild(nuevoAtaqueJugador);
    mensajesEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function combate() {
    if(vidasEnemigo > 0 && vidasJugador > 0) {
        if(ataqueJugador == ataqueEnemigo) {
            resultadoCombate = "Empate";
        }
        else {
            if((ataqueJugador == "Fuego 🔥" && ataqueEnemigo == "Tierra 🌱") || (ataqueJugador == "Agua 💧" && ataqueEnemigo == "Fuego 🔥") || (ataqueJugador == "Tierra 🌱" && ataqueEnemigo == "Agua 💧")) {
                resultadoCombate = "Ganaste";
                vidasEnemigo--;
            }
            else {
                resultadoCombate = "Perdiste";
                vidasJugador--;
            }
        }
        crearMensaje();
    }
    else if(vidasEnemigo == 0) {
        resultadoCombate = "¡FELICIDADES, has ganado la partida!";
        juegoTerminado();
    }
    else {
        resultadoCombate = "LO SIENTO, has perdido la partida";
        juegoTerminado();
    }
}

function definirAtaque(ataque) {
    let ataqueDefinido = "";
    switch(ataque) {
        case 1:
            ataqueDefinido = "Fuego 🔥";
            break;
        case 2:
            ataqueDefinido = "Agua 💧";
            break;
        case 3:
            ataqueDefinido = "Tierra 🌱";
            break;
        default:
            ataqueDefinido = "--";
            break;
    }
    return ataqueDefinido;
}

function definirAtaqueJugador(ataque) {
    ataqueJugador = ataque;
    definirAtaqueEnemigo();
}

function definirAtaqueEnemigo() {
    ataqueEnemigo = definirAtaque(random(1, 3));
    combate();
}

function juegoTerminado() {
  //Botones
    let btnFuego = document.getElementById("btn-fuego");
    let btnAgua = document.getElementById("btn-agua");
    let btnTierra = document.getElementById("btn-tierra");

  //Secciones
    let seccionResultado = document.getElementById("resultado");
    let seccionReiniciar = document.getElementById("reiniciar");

    seccionResultado.innerHTML = resultadoCombate;

    btnFuego.disabled = true;
    btnAgua.disabled = true;
    btnTierra.disabled = true;

    seccionReiniciar.style.display = "block";
}

function reiniciarJuego() {
    location.reload();
}

function seleccionarMascota() {
    //Input radio
    let inputHipodoge = document.getElementById("hipodoge");
    let inputCapipepo = document.getElementById("capipepo");
    let inputRatigueya = document.getElementById("ratigueya");
    let inputLangostelvis = document.getElementById("langostelvis");
    let inputTucapalma = document.getElementById("tucapalma");
    let inputPydos = document.getElementById("pydos");
    //Secciones
    let seccionSeleccionarMascota = document.getElementById("seleccionar-mascotaJugador");
    let seccionSeleccionarAtaqueJugador = document.getElementById("seleccionar-ataqueJugador");

    let mascotaSeleccionada = "";

    if (inputHipodoge.checked) {
        mascotaSeleccionada = "Hipodoge";
    }
    else if(inputCapipepo.checked) {
        mascotaSeleccionada = "Capipepo";
    }
    else if(inputRatigueya.checked) {
        mascotaSeleccionada = "Ratigueya";
    }
    else if(inputLangostelvis.checked) {
        mascotaSeleccionada = "Langostelvis";
    }
    else if(inputTucapalma.checked) {
        mascotaSeleccionada = "Tucapalma";
    }
    else if(inputPydos.checked) {
        mascotaSeleccionada = "Pydos";
    }
    else {
        alert("No seleccionaste ninguna mascota");
    }

    let spanMascotaJugador = document.getElementById("span-mascotaJugador");
    spanMascotaJugador.innerHTML = mascotaSeleccionada;

    if(mascotaSeleccionada != "") {
        seleccionarMascotaEnemigo();
        seccionSeleccionarAtaqueJugador.style.display = "flex";
        seccionSeleccionarMascota.style.display = "none";
    }
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = random(1,6);
    let mascotaEnemigo = "";

    switch(mascotaAleatoria) {
        case 1:
            mascotaEnemigo = "Hipodoge";
            break;
        case 2:
            mascotaEnemigo = "Capipepo";
            break;
        case 3:
            mascotaEnemigo = "Ratigueya";
            break;
        case 4:
            mascotaEnemigo = "Langostelvis";
            break;
        case 5:
            mascotaEnemigo = "Tucapalma";
            break;
        case 6:
            mascotaEnemigo = "Pydos";
            break;
        default:
            break;
    }
    let spanMascotaEnemigo = document.getElementById("span-mascotaEnemigo");
    spanMascotaEnemigo.innerHTML = mascotaEnemigo;
}

window.addEventListener("load", iniciarJuego);