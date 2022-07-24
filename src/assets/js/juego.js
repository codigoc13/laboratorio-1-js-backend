;(() => {
  ;('use strict') // Hace que el JS me obligue a declarar las variables de la manera correcta
  // const personajes = ['Ana', 'Mercy']
  // console.log({ personajes })

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
  const btnDetener = document.querySelector('#btn-detener')
  const btnNuevo = document.querySelector('#btn-nuevo')
  const puntosHTML = document.querySelectorAll('small')
  const divJugadorCartas = document.querySelector('#jugador-cartas')
  const divComputadoraCartas = document.querySelector('#computadora-cartas')

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

    // Se barajea la baraja
    baraja = _.shuffle(baraja)
  }

  crearBaraja()

  /**
   *  Se soluciona el error del desborde del arreglo al eliminar cartas del mismo
   *  y no modificar el número máximo posible del random
   */
  // Esta función pide una carta
  const pedirCarta = () => {
    const barajaTamanio = baraja.length
    if (barajaTamanio === 0) {
      throw 'No hay cartas en la baraja'
    }
    const index = Math.floor(Math.random() * barajaTamanio)
    const carta = baraja.splice(index, 1)[0]
    return carta
  }

  // Esta función obtiene el valor de la carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1)
    return isNaN(valor) ? (valor === 'A' ? 11 : 10) : Number(valor)
  }

  // Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    do {
      const carta = pedirCarta()
      puntosComputadora += valorCarta(carta)
      puntosHTML[1].innerText = puntosComputadora
      // console.log(smallPuntajeJugador.innerText)

      const imgCarta = document.createElement('img')
      imgCarta.src = `assets/cartas/${carta}.png`
      imgCarta.classList.add('carta')
      divComputadoraCartas.append(imgCarta)

      if (puntosMinimos > 21) {
        break
      }
    } while (puntosComputadora <= puntosMinimos && puntosMinimos <= 21)

    setTimeout(() => {
      if (puntosMinimos === puntosComputadora) {
        alert('Hubo empate')
      } else if (puntosMinimos > 21) {
        alert('Computadora gana')
      } else if (puntosComputadora > 21) {
        alert('Genial, ganaste')
      } else {
        alert('Computadora gana')
      }
    }, 100)
  }

  // Eventos
  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta()
    puntosJugador += valorCarta(carta)
    puntosHTML[0].innerText = puntosJugador
    // console.log(smallPuntajeJugador.innerText)

    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divJugadorCartas.append(imgCarta)

    if (puntosJugador > 21) {
      btnPedir.disabled = true
      btnDetener.disabled = true
      // console.warn('Lo siento, ya perdiste')
      turnoComputadora(puntosJugador)
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true
      btnDetener.disabled = true
      // console.warn('21, Genial')
      turnoComputadora(puntosJugador)
    }
  })

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(puntosJugador)
  })

  btnNuevo.addEventListener('click', () => {
    puntosJugador = 0
    puntosComputadora = 0
    btnPedir.disabled = false
    btnDetener.disabled = false
    puntosHTML[0].innerText = 0
    puntosHTML[1].innerText = 0
    divJugadorCartas.innerHTML = ''
    divComputadoraCartas.innerHTML = ''
    console.clear()
    crearBaraja()
  })
})()
