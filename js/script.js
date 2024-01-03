/*____DOM_GET_ELEMENTS____*/
//Botones
const btnMascotaJugador = document.getElementById("btn-mascotaJugador");
const btnReiniciar = document.getElementById("btn-reiniciar");
let btnFuego;
let btnAgua;
let btnTierra;
let botones = [];
//Divs
const spanMascotaJugador = document.getElementById("span-mascotaJugador");
const spanMascotaEnemigo = document.getElementById("span-mascotaEnemigo");
const spanVidasJugador = document.getElementById("span-vidasJugador");
const spanVidasEnemigo = document.getElementById("span-vidasEnemigo");
const mensajesJugador = document.getElementById("mensajesJugador");
const mensajesEnemigo = document.getElementById("mensajesEnemigo");
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById("contenedor-ataques");
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
/*____Variables globales____*/
let ataque;
let ataqueJugador;
let ataqueEnemigo;
let mascotaEnemigo;
let resultadoCombate;
let vidasJugador = 3;
let vidasEnemigo = 3;
let opcionDeMokepones;
let ataquesMascotaJugador;
let ataques = [];
let ataquesJugador = [];
let ataquesEnemigo = [];

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let mokepones = [];

let hipodoge = new Mokepon("Hipodoge", "./img/hipodoge.png", "3");
let capipepo = new Mokepon("Capipepo", "./img/capipepo.png", "3");
let ratigueya = new Mokepon("Ratigueya", "./img/ratigueya.png", "3");
let langostelvis = new Mokepon("Langostelvis", "./img/LWkctTb.png", "3");
let tucapalma = new Mokepon("Tucapalma", "./img/y3s277X.png", "3");
let pydos = new Mokepon("Pydos", "./img/iaJhdyY.png", "3");

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
    })

    inputHipodoge = document.getElementById(hipodoge.nombre);
    inputCapipepo = document.getElementById(capipepo.nombre);
    inputRatigueya = document.getElementById(ratigueya.nombre);
    inputLangostelvis = document.getElementById(langostelvis.nombre);
    inputTucapalma = document.getElementById(tucapalma.nombre);
    inputPydos = document.getElementById(pydos.nombre);

    seccionSeleccionarAtaqueJugador.style.display = "none";
    seccionResultado.style.display = "none";
    seccionMensajes.style.display = "none";
    seccionReiniciar.style.display = "none";
    btnMascotaJugador.addEventListener("click", seleccionarMascota);
    btnReiniciar.addEventListener("click", reiniciarJuego);
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
    if (vidasEnemigo > 0 && vidasJugador > 0) {
        if(ataqueJugador == ataqueEnemigo) {
            resultadoCombate = "Empate";
        }
        else {
            if ((ataqueJugador == "Fuego 🔥" && ataqueEnemigo == "Tierra 🌱") || (ataqueJugador == "Agua 💧" && ataqueEnemigo == "Fuego 🔥") || (ataqueJugador == "Tierra 🌱" && ataqueEnemigo == "Agua 💧")) {
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
    else if (vidasEnemigo == 0) {
        resultadoCombate = "¡FELICIDADES, has ganado la partida!";
        juegoTerminado();
    }
    else {
        resultadoCombate = "LO SIENTO, has perdido la partida";
        juegoTerminado();
    }
}

function extraerAtaques(mascota) {
    let ataques;
    mokepones.forEach((mokepon) => {
        if (mascota == mokepon.nombre) {
            ataques = mokepon.ataques;
        }
    })
    mostrarAtaquesJugador(ataques);
}

function juegoTerminado() {
    seccionResultado.innerHTML = resultadoCombate;

    btnFuego.disabled = true;
    btnAgua.disabled = true;
    btnTierra.disabled = true;

    seccionReiniciar.style.display = "block";
}

function mostrarAtaquesJugador(ataques) {
    ataques.forEach((ataque) => {
        ataquesMascotaJugador = `
        <button class="boton boton-s glass ataqueJugador__boton BAtaque" id=${ataque.id}>${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMascotaJugador;
    })
    btnAgua = document.getElementById("boton-agua");
    btnFuego = document.getElementById("boton-fuego");
    btnTierra = document.getElementById("boton-tierra");
    botones = document.querySelectorAll(".BAtaque");

    secuenciaDeAtaqueJugador();
}

function reiniciarJuego() {
    location.reload();
}

function secuenciaDeAtaque(ataque) {
    let nuevoAtaque;
    if (ataque == "🔥") {
        nuevoAtaque = "FUEGO";
    }
    else if (ataque == "💧") {
        nuevoAtaque = "AGUA";
    }
    else if (ataque == "🌱") {
        nuevoAtaque = "TIERRA";
    }
    else {
        console.log("ERROR: Ataque no identificado");
    }
    return nuevoAtaque;
}

function secuenciaDeAtaqueEnemigo() {
    let ataqueAleatorio;
    ataquesEnemigo = mascotaEnemigo.ataques;
    ataqueAleatorio = random(0, ataquesEnemigo.length - 1);
    ataqueEnemigo = secuenciaDeAtaque(ataquesEnemigo[ataqueAleatorio].nombre);
    console.log("ataqueEnemigo = " + ataqueEnemigo);
}

function secuenciaDeAtaqueJugador(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            ataquesJugador.push(secuenciaDeAtaque(e.target.textContent));
            ataqueJugador = ataquesJugador[ataquesJugador.length - 1];
            secuenciaDeAtaqueEnemigo();
            console.log("ataquesJugador[] = " + ataquesJugador);
            console.log("ataqueJugador = " + ataqueJugador);
            boton.disabled = true;
        })
    })
}

function seleccionarMascota() {
    let mascotaJugador = "";

    if (inputHipodoge.checked) {
        mascotaJugador = inputHipodoge.id;
    }
    else if (inputCapipepo.checked) {
        mascotaJugador = inputCapipepo.id;
    }
    else if (inputRatigueya.checked) {
        mascotaJugador = inputRatigueya.id;
    }
    else if (inputLangostelvis.checked) {
        mascotaJugador = inputLangostelvis.id;
    }
    else if (inputTucapalma.checked) {
        mascotaJugador = inputTucapalma.id;
    }
    else if (inputPydos.checked) {
        mascotaJugador = inputPydos.id;
    }
    else {
        alert("No seleccionaste ninguna mascota, intenta de nuevo");
    }

    spanMascotaJugador.innerHTML = mascotaJugador;

    if (mascotaJugador != "") {
        extraerAtaques(mascotaJugador)
        seleccionarMascotaEnemigo();
        seccionSeleccionarAtaqueJugador.style.display = "flex";
        seccionSeleccionarMascota.style.display = "none";
    }
}

function seleccionarMascotaEnemigo() {
    const mascotaAleatoria = random(0, mokepones.length - 1);
    mascotaEnemigo = mokepones[mascotaAleatoria];

    spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre;
}

window.addEventListener("load", iniciarJuego);