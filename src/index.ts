import Pieza, { GRID_SIZE } from './Pieza'
import './styles.css'

const gameContainer = document.getElementById('game-container')
const LISTA_DE_CLASES = [ 'bg-white', 'border', 'border-black' ]

if (gameContainer) {
  gameContainer.style.width = `${GRID_SIZE * 10}px`
  gameContainer.style.height = `${GRID_SIZE * 20}px`
  LISTA_DE_CLASES.forEach(clase => gameContainer.classList.add(clase))
  const pieza = new Pieza(gameContainer)
  pieza.draw()
}
