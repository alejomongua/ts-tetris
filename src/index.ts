import Pieza, { GRID_SIZE } from './Pieza'
import './styles.css'

const gameContainer = document.getElementById('game-container')
const LISTA_DE_CLASES = [ 'bg-white', 'border', 'border-black' ]
const DEFAULT_TIMER_INTERVAL = 1500

if (gameContainer) {
  gameContainer.style.width = `${GRID_SIZE * 10}px`
  gameContainer.style.height = `${GRID_SIZE * 20}px`
  LISTA_DE_CLASES.forEach(clase => gameContainer.classList.add(clase))
  let pieza = new Pieza(gameContainer)
  pieza.draw()

  const mainTimer = setInterval(() => {
    pieza.bajar()
    if (pieza.posicionY === 20) {
      pieza = new Pieza(gameContainer)
    }
  }, DEFAULT_TIMER_INTERVAL)

  setInterval(() => pieza.rotate90CounterClockwise(), 500)
}
