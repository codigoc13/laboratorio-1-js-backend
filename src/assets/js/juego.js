/**
 * 2C = 2 de trebol (clubs)
 * 2D = 2 de diamante (diamont)
 * 2H = 2 de corazones (hearts)
 * 2S = 2 de picas (spades)
 */

let baraja = []
const tipos = ['C', 'D', 'H', 'S']
const letras = ['J', 'Q', 'K', 'A']

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

  console.log(baraja)
}

crearBaraja()

// Esta función pide una carta
const pedirCarta = () => {
  if (baraja.length === 0) {
    throw 'No hay cartas en la baraja'
  }
  const index = Math.floor(Math.random() * 51)
  const carta = baraja.splice(index, 1)[0]
  console.log({ carta })
  console.log(baraja)
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
const valor = valorCarta(pedirCarta())
console.log(valor)
