/*____DOM_GET_ELEMENTS____*/
//Botones
const btnMascotaJugador = document.getElementById("btn-mascotaJugador");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnMoverDerecha = document.getElementById("btn-derecha-mapaMokepon");
const btnMoverIzquierda = document.getElementById("btn-izquierda-mapaMokepon");
const btnMoverArriba = document.getElementById("btn-arriba-mapaMokepon");
const btnMoverAbajo = document.getElementById("btn-abajo-mapaMokepon");

let btnFuego;
let btnAgua;
let btnTierra;
let botones = [];
//Divs
const spanMascotaJugador = document.getElementById("span-mascotaJugador");
const spanMascotaEnemigo = document.getElementById("span-mascotaEnemigo");
const spanVictoriasJugador = document.getElementById("span-victoriasJugador");
const spanVictoriasEnemigo = document.getElementById("span-victoriasEnemigo");
const mensajesJugador = document.getElementById("mensajesJugador");
const mensajesEnemigo = document.getElementById("mensajesEnemigo");
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById("contenedor-ataques");
//Canvas
const mapa = document.getElementById("mapa");
//Input radio
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let inputLangostelvis;
let inputTucapalma;
let inputPydos;
//Secciones
const seccionSeleccionarMascota = document.getElementById("seleccionar-mascotaJugador");
const seccionVerMapa = document.getElementById("ver-mapa");
const seccionSeleccionarAtaqueJugador = document.getElementById("seleccionar-ataqueJugador");
const seccionResultado = document.getElementById("resultado");
const seccionMensajes = document.getElementById("mensajes");
const seccionReiniciar = document.getElementById("reiniciar");
/*____Variables globales____*/
let ataque;
let ataqueJugador;
let ataqueEnemigo;
let mascotaJugador;
let mascotaEnemigo;
let objMascotaJugador;
let resultadoCombate = "";
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let opcionDeMokepones;
let ataquesMascotaJugador;
let ataquesDisponibles;
let ataquesJugador = [];
let ataquesEnemigo = [];
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./img/mokemap.png";

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.x = x;
        this.y = y;
        this.width = 90;
        this.height = 90;
        this.mapaFoto = new Image();
        this.mapaFoto.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.width,
            this.height,
        )
    }
}

let mokepones = [];
let enemigos = [];

let hipodoge = new Mokepon("Hipodoge", "./img/hipodoge.png", "3", "./img/hipodoge.png");
let capipepo = new Mokepon("Capipepo", "./img/capipepo.png", "3", "./img/capipepo.png");
let ratigueya = new Mokepon("Ratigueya", "./img/ratigueya.png", "3", "./img/ratigueya.png");
let langostelvis = new Mokepon("Langostelvis", "./img/langostelvis.png", "3", "./img/langostelvis.png");
let tucapalma = new Mokepon("Tucapalma", "./img/tucapalma.png", "3", "./img/tucapalma.png");
let pydos = new Mokepon("Pydos", "./img/pydos.png", "3", "./img/pydos.png");

//Enemigos
let hipodogeEnemigo = new Mokepon("Hipodoge", "./img/hipodoge.png", "3", "./img/hipodoge.png", 7, 170);
let capipepoEnemigo = new Mokepon("Capipepo", "./img/capipepo.png", "3", "./img/capipepo.png", 570, 170);
let ratigueyaEnemigo = new Mokepon("Ratigueya", "./img/ratigueya.png", "3", "./img/ratigueya.png", 320, 310);
let langostelvisEnemigo = new Mokepon("Langostelvis", "./img/langostelvis.png", "3", "./img/langostelvis.png", 160, 330);
let tucapalmaEnemigo = new Mokepon("Tucapalma", "./img/tucapalma.png", "3", "./img/tucapalma.png", 270, 40);
let pydosEnemigo = new Mokepon("Pydos", "./img/pydos.png", "3", "./img/pydos.png", 760, 250);

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
enemigos.push(hipodogeEnemigo, capipepoEnemigo, ratigueyaEnemigo, langostelvisEnemigo, tucapalmaEnemigo, pydosEnemigo);

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
    seccionVerMapa.style.display = "none";
    seccionSeleccionarAtaqueJugador.style.display = "none";
    seccionResultado.style.display = "none";
    seccionMensajes.style.display = "none";
    seccionReiniciar.style.display = "none";
    btnMascotaJugador.addEventListener("click", seleccionarMascota);
    btnReiniciar.addEventListener("click", reiniciarJuego);
    btnMoverDerecha.addEventListener("mousedown", moverMascotaDerecha);
    btnMoverIzquierda.addEventListener("mousedown", moverMascotaIzquierda);
    btnMoverArriba.addEventListener("mousedown", moverMascotaArriba);
    btnMoverAbajo.addEventListener("mousedown", moverMascotaAbajo);
    btnMoverDerecha.addEventListener("mouseup", detenerMovimiento);
    btnMoverIzquierda.addEventListener("mouseup", detenerMovimiento);
    btnMoverArriba.addEventListener("mouseup", detenerMovimiento);
    btnMoverAbajo.addEventListener("mouseup", detenerMovimiento);
}

function iniciarMapa(){
    mapa.width = 854;
    mapa.height = 480;
    intervalo = setInterval(pintarCanvas, 50, objMascotaJugador);
    window.addEventListener("keydown", teclaPresionada);
    window.addEventListener("keyup", detenerMovimiento);
}

function crearMensaje() {
    let nuevoAtaqueJugador = document.createElement("p");
    let nuevoAtaqueEnemigo = document.createElement("p");
    spanVictoriasJugador.innerHTML = victoriasJugador;
    spanVictoriasEnemigo.innerHTML = victoriasEnemigo;
    nuevoAtaqueJugador.innerHTML = ataqueJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo;
    seccionResultado.innerHTML = resultadoCombate;
    mensajesJugador.appendChild(nuevoAtaqueJugador);
    mensajesEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function combate() {
    if (ataquesDisponibles >= 0) {
        if(ataqueJugador == ataqueEnemigo) {
            resultadoCombate = "Empate";
        }
        else {
            if ((ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra") || (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego") || (ataqueJugador == "Tierra" && ataqueEnemigo == "Agua")) {
                resultadoCombate = "Ganaste";
                victoriasJugador++;
            }
            else {
                resultadoCombate = "Perdiste";
                victoriasEnemigo++;
            }
        }
        ataquesDisponibles--;
        crearMensaje();
    }
    if(ataquesDisponibles <= 0) {
        if (victoriasJugador == victoriasEnemigo) {
            resultadoCombate = "Partida EMPATADA";
            juegoTerminado();
        }
        else if (victoriasJugador > victoriasEnemigo) {
            resultadoCombate = "¡FELICIDADES, has ganado la partida!";
            juegoTerminado();
        }
        else {
            resultadoCombate = "LO SIENTO, has perdido la partida";
            juegoTerminado();
        }
    }
}

function detenerMovimiento() {
    objMascotaJugador.velocidadX = 0;
    objMascotaJugador.velocidadY = 0;
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

function moverMascotaDerecha() {
    objMascotaJugador.velocidadX = 5;
}

function moverMascotaIzquierda() {
    objMascotaJugador.velocidadX = -5;
}

function moverMascotaArriba() {
    objMascotaJugador.velocidadY = -5;
}

function moverMascotaAbajo() {
    objMascotaJugador.velocidadY = 5;
}

function obtenerObjetoMascota(mascota) {
    let objMascota;
    mokepones.forEach((mokepon) => {
        if (mascota == mokepon.nombre) {
            objMascota = mokepon;
        }
    })
    return objMascota;
}

function pintarCanvas(mascota) {
    mascota.x += mascota.velocidadX;
    mascota.y += mascota.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    );
    mascota.pintarMokepon();
    pintarEnemigos();
    if (objMascotaJugador.velocidadX != 0 || objMascotaJugador.velocidadY !=0) {
        enemigos.forEach((enemigo) => {
            revisarColision(enemigo);
        });
    }
}

function pintarEnemigos() {
    hipodogeEnemigo.pintarMokepon();
    capipepoEnemigo.pintarMokepon();
    ratigueyaEnemigo.pintarMokepon();
    langostelvisEnemigo.pintarMokepon();
    tucapalmaEnemigo.pintarMokepon();
    pydosEnemigo.pintarMokepon();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function reiniciarJuego() {
    location.reload();
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.height;
    const izquierdaEnemigo = enemigo.x;
    const derechaEnemigo = enemigo.x + enemigo.width;

    const arribaMascota = objMascotaJugador.y;
    const abajoMascota = objMascotaJugador.y + objMascotaJugador.height;
    const izquierdaMascota = objMascotaJugador.x;
    const derechaMascota = objMascotaJugador.x + objMascotaJugador.width;

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento();
    alert("Hay colisión con " + enemigo.nombre);
}

function secuenciaDeAtaque(ataque) {
    let nuevoAtaque;
    if (ataque == "🔥") {
        nuevoAtaque = "Fuego";
    }
    else if (ataque == "💧") {
        nuevoAtaque = "Agua";
    }
    else if (ataque == "🌱") {
        nuevoAtaque = "Tierra";
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
    combate();
}

function secuenciaDeAtaqueJugador(){
    ataquesDisponibles = botones.length;
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            ataquesJugador.push(secuenciaDeAtaque(e.target.textContent));
            ataqueJugador = ataquesJugador[ataquesJugador.length - 1];
            secuenciaDeAtaqueEnemigo();
            boton.disabled = true;
        })
    })
}

function seleccionarMascota() {
    mascotaJugador="";

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
        //seccionSeleccionarAtaqueJugador.style.display = "flex";
        seccionMensajes.style.display = "grid";
        seccionResultado.style.display = "flex";
        seccionSeleccionarMascota.style.display = "none";
        seccionVerMapa.style.display = "flex";
        objMascotaJugador = obtenerObjetoMascota(mascotaJugador);
        iniciarMapa();
    }
}

function seleccionarMascotaEnemigo() {
    const mascotaAleatoria = random(0, mokepones.length - 1);
    mascotaEnemigo = mokepones[mascotaAleatoria];

    spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre;
}

function teclaPresionada(event) {
    switch(event.key) {
        case "ArrowUp":
            moverMascotaArriba();
            break;
        case "ArrowDown":
            moverMascotaAbajo();
            break;
        case "ArrowLeft":
            moverMascotaIzquierda();
            break;
        case "ArrowRight":
            moverMascotaDerecha();
            break;
        default:
            break;
    }
}

window.addEventListener("load", iniciarJuego);