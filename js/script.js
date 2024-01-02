/*____DOM_GET_ELEMENTS____*/
//Botones
const btnMascotaJugador = document.getElementById("btn-mascotaJugador");
const btnFuego = document.getElementById("btn-fuego");
const btnAgua = document.getElementById("btn-agua");
const btnTierra = document.getElementById("btn-tierra");
const btnReiniciar = document.getElementById("btn-reiniciar");
//Divs
const spanMascotaJugador = document.getElementById("span-mascotaJugador");
const spanMascotaEnemigo = document.getElementById("span-mascotaEnemigo");
const spanVidasJugador = document.getElementById("span-vidasJugador");
const spanVidasEnemigo = document.getElementById("span-vidasEnemigo");
const mensajesJugador = document.getElementById("mensajesJugador");
const mensajesEnemigo = document.getElementById("mensajesEnemigo");
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
//Input radio
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let inputLangostelvis;
let inputTucapalma;
let inputPydos;
//Secciones
const seccionSeleccionarMascota = document.getElementById("seleccionar-mascotaJugador");
const seccionSeleccionarAtaqueJugador = document.getElementById("seleccionar-ataqueJugador");
const seccionResultado = document.getElementById("resultado");
const seccionMensajes = document.getElementById("mensajes");
const seccionReiniciar = document.getElementById("reiniciar");
/*____DOM_CREATE_ELEMENTS____*/
//Paragraph
//let nuevoAtaqueJugador = document.createElement("p");
//let nuevoAtaqueEnemigo = document.createElement("p");
/*____Variables globales____*/
let ataqueJugador = "";
let ataqueEnemigo = "";
let resultadoCombate = "";
let vidasJugador = 3;
let vidasEnemigo = 3;
let opcionDeMokepones;

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let mokepones = [];

let hipodoge = new Mokepon("Hipodoge", "/img/hipodoge.png", "3");
let capipepo = new Mokepon("Capipepo", "/img/capipepo.png", "3");
let ratigueya = new Mokepon("Ratigueya", "/img/ratigueya.png", "3");
let langostelvis = new Mokepon("Langostelvis", "/img/LWkctTb.png", "3");
let tucapalma = new Mokepon("Tucapalma", "/img/y3s277X.png", "3");
let pydos = new Mokepon("Pydos", "/img/iaJhdyY.png", "3");

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

langostelvis.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
)

tucapalma.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
)

pydos.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function iniciarJuego() {

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="mascotaJugador__tarjeta__mascota glass" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones;
        inputHipodoge = document.getElementById(hipodoge.nombre);
        inputCapipepo = document.getElementById(capipepo.nombre);
        inputRatigueya = document.getElementById(ratigueya.nombre);
        inputLangostelvis = document.getElementById(langostelvis.nombre);
        inputTucapalma = document.getElementById(tucapalma.nombre);
        inputPydos = document.getElementById(pydos.nombre);
    })

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
    spanMascotaEnemigo.innerHTML = mascotaEnemigo;
}

window.addEventListener("load", iniciarJuego);