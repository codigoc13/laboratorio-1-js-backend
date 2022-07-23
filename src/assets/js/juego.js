/**
 * 2C = 2 de trebol (clubs)
 * 2D = 2 de diamante (diamont)
 * 2H = 2 de corazones (hearts)
 * 2S = 2 de picas (spades)
 */

let baraja = []
const tipos = ['C', 'D', 'H', 'S']
const letras = ['J', 'Q', 'K', 'A']

let puntosJugador = 0
let puntosComputadora = 0

// Referencia del HTML
const btnPedir = document.querySelector('#btn-pedir')
const smallPuntajeJugador = document.querySelector('small')
const divJugadorCartas = document.querySelector('#jugador-cartas')
// console.log(btnPedir)

// Esta función crea la baraja 'barajeada'
const crearBaraja = () => {
  // Se puebla el arreglo con los número y tipos de la baraja
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      baraja.push(i + tipo)
    }
  }
  // Se puebla el arreglo con las letras y tipos de la paraja
  for (let letra of letras) {
    for (let tipo of tipos) {
      baraja.push(letra + tipo)
    }
  }
  // console.log(baraja) //Descomentar si se quiere ver la baraja ordenada

  // Se barajea la baraja
  baraja = _.shuffle(baraja)

  // console.log(baraja)
}

crearBaraja()

// Esta función pide una carta
const pedirCarta = () => {
  if (baraja.length === 0) {
    throw 'No hay cartas en la baraja'
  }
  const index = Math.floor(Math.random() * 51)
  const carta = baraja.splice(index, 1)[0]
  // console.log({ carta })
  // console.log(baraja)
  return carta
}

// pedirCarta()

const valorCarta = (carta) => {
  /*const valor = carta.substring(0, carta.length - 1)
    let puntos = 0
    if (isNaN(valor)) {
      puntos = valor === 'A' ? 11 : 10
    } else {
      puntos = Number(valor)
    }
    console.log(puntos)
    return puntos */

  const valor = carta.substring(0, carta.length - 1)
  return isNaN(valor) ? (valor === 'A' ? 11 : 10) : Number(valor)
}
// const valor = valorCarta(pedirCarta())
// console.log(valor)

// Eventos
btnPedir.addEventListener('click', () => {
  // console.log('click')
  const carta = pedirCarta()
  // console.log({ carta })
  puntosJugador += valorCarta(carta)
  smallPuntajeJugador.innerText = puntosJugador
  console.log(smallPuntajeJugador.innerText)

  // <img class="carta" src="assets/cartas/10H.png" alt="" />
  const imgCarta = document.createElement('img')
  imgCarta.src = `assets/cartas/${carta}.png`
  imgCarta.classList.add('carta')
  divJugadorCartas.append(imgCarta)

  if (puntosJugador > 21) {
    btnPedir.disabled = true
    console.warn('Lo siento, ya perdiste')
  } else if (puntosJugador === 21) {
    btnPedir.disabled = true
    console.warn('21, Genial')
  }
})
