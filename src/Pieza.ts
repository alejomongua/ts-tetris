export const GRID_SIZE = 40

export default class Pieza {
  tipo: number
  matriz: boolean[][]
  posicionX: number
  posicionY: number
  gameContainer: HTMLElement

  constructor (gameContainer: HTMLElement, tipo?: number) {
    if (tipo) {
      this.tipo = tipo
    } else {
      this.tipo = Math.floor(Math.random() * 7)
    }
    this.gameContainer = gameContainer
    this.posicionX = GRID_SIZE * 3
    this.posicionY = 0
    switch (this.tipo) {
      case 0:
        // Palito
        this.matriz = [
          [ false, true, false ],
          [ false, true, false ],
          [ false, true, false ],
          [ false, true, false ],
        ]
        break
      case 1:
        // L
        this.matriz = [
          [ false, false, false ],
          [ false, true, false ],
          [ false, true, false ],
          [ false, true, true ],
        ]
        break
      case 2:
        // L al revés
        this.matriz = [
          [ false, false, false ],
          [ false, false, true ],
          [ false, false, true ],
          [ false, true, true ],
        ]
        break
      case 3:
        // Z
        this.matriz = [
          [ false, false, false ],
          [ false, false, true ],
          [ false, true, true ],
          [ false, true, false ],
        ]
        break
      case 4:
        // S
        this.matriz = [
          [ false, false, false ],
          [ false, true, false ],
          [ false, true, true ],
          [ false, false, true ],
        ]
        break
      case 5:
        // T
        this.matriz = [
          [ false, false, false ],
          [ false, false, false ],
          [ false, true, false ],
          [ true, true, true ],
        ]
        break
      default:
        // Cubito
        this.matriz = [
          [ false, false, false ],
          [ false, false, false ],
          [ false, true, true ],
          [ false, true, true ],
        ]
        break
    }
  }

  draw () {
    let posY = this.posicionY
    this.matriz.forEach(row => {
      let posX = this.posicionX
      row.forEach(element => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        rect.setAttribute('x', String(posX))
        rect.setAttribute('y', String(posY))
        rect.setAttribute('width', String(GRID_SIZE))
        rect.setAttribute('height', String(GRID_SIZE))
        rect.style.fill = element ? 'black' : 'white'
        this.gameContainer.append(rect)
        posX += GRID_SIZE
      })
      posY += GRID_SIZE
    })
  }
}
