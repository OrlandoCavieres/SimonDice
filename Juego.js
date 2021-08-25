const celeste = document.getElementById("celeste")
const violeta = document.getElementById("violeta")
const naranja = document.getElementById("naranja")
const verde = document.getElementById("verde")
const botonEmpezar = document.getElementById("botonEmpezar")

const nombre = document.getElementById("nombreJugador")
const nivel = document.getElementById("nivel")
const puntos = document.getElementById("puntos")

const ULTIMO_NIVEL = 3

class SimonDice {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.actualizarDatos()
    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        botonEmpezar.classList.toggle("hide")
        this.nivel = 1
        this.puntuacion = 0
        this.colores = {celeste, violeta, naranja, verde}
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL) .fill(0) .map( () => Math.floor(Math.random() * 4) )
    }

    actualizarDatos() {
        swal({
                title: "Simon Dice",
                text: "Ingresa tu nombre:",
                content: "input"
            })
            .then( name => {
                if (name) {
                    nombre.innerHTML = name
                } else {
                    nombre.innerHTML = "Anónimo"
                }
                nivel.innerHTML = this.nivel
                puntos.innerHTML = "0"
                this.generarSecuencia()
                setTimeout(this.siguienteNivel, 500)
            })
    }

    siguienteNivel() {
        this.subnivel = 0
        nivel.innerHTML = this.nivel
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0: return "celeste"
            case 1: return "violeta"
            case 2: return "naranja"
            case 3: return "verde"
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case "celeste": return 0
            case "violeta": return 1
            case "naranja": return 2
            case "verde": return 3
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            let color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout( () => this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add("light")
        setTimeout( () => this.apagarColor(color), 350)
    }

    apagarColor(color) {
        this.colores[color].classList.remove("light")
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener("click", this.elegirColor)
        this.colores.violeta.addEventListener("click", this.elegirColor)
        this.colores.naranja.addEventListener("click", this.elegirColor)
        this.colores.verde.addEventListener("click", this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener("click", this.elegirColor)
        this.colores.violeta.removeEventListener("click", this.elegirColor)
        this.colores.naranja.removeEventListener("click", this.elegirColor)
        this.colores.verde.removeEventListener("click", this.elegirColor)
    }

    elegirColor(evento) {
        const nombreColor = evento.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if ( numeroColor === this.secuencia[this.subnivel] ) {
            this.subnivel++
            this.puntuacion++
            if (this.subnivel === this.nivel) {
                this.nivel++
                puntos.innerHTML = this.puntuacion
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganarJuego()
                } else {
                    swal("Muy Bien!", `Nivel: ${this.nivel}`, "success")
                        .then( () => setTimeout(this.siguienteNivel, 1200) )
                }
            }
        }
        else {
            this.perderJuego()
        }
    }

    ganarJuego() {
        swal("Simon Dice", "Felicitaciones, ganaste el juego!", "success")
            .then( () => {
                this.eliminarEventosClick()
                this.inicializar()
            })
    }

    perderJuego() {
        swal("Simon Dice", "Has perdido!", "error")
            .then( () => {
                this.eliminarEventosClick()
                this.inicializar()
            })
    }


}

function empezarJuego() {
    window.juego = new SimonDice()
}