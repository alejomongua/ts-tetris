export const GRID_SIZE = 40

export default class Pieza {
  tipo: number
  matriz: boolean[][]
  matrizElementos: SVGRectElement[][]
  posicionX: number
  posicionY: number
  gameContainer: HTMLElement
  className: string
  debug: number

  constructor (gameContainer: HTMLElement, tipo?: number) {
    if (tipo) {
      this.tipo = tipo
    } else {
      this.tipo = Math.floor(Math.random() * 7)
    }

    this.debug = 0
    // Genere una cadena aleatoria para la clase
    this.className = Math.random().toString(36).slice(2)
    this.gameContainer = gameContainer
    this.posicionX = GRID_SIZE * 4
    this.posicionY = 0
    switch (this.tipo) {
      case 0:
        // Palito
        this.matriz = [
          [ false, true, false, false ],
          [ false, true, false, false ],
          [ false, true, false, false ],
          [ false, true, false, false ],
        ]
        break
      case 1:
        // L
        this.matriz = [
          [ false, true, false ],
          [ false, true, false ],
          [ false, true, true ],
        ]
        break
      case 2:
        // L al revés
        this.matriz = [
          [ false, false, true ],
          [ false, false, true ],
          [ false, true, true ],
        ]
        break
      case 3:
        // Z
        this.matriz = [
          [ false, false, true ],
          [ false, true, true ],
          [ false, true, false ],
        ]
        break
      case 4:
        // S
        this.matriz = [
          [ false, true, false ],
          [ false, true, true ],
          [ false, false, true ],
        ]
        break
      case 5:
        // T
        this.matriz = [
          [ false, false, false ],
          [ false, true, false ],
          [ true, true, true ],
        ]
        break
      default:
        // Cubito
        this.matriz = [
          [ true, true ],
          [ true, true ],
        ]
        break
    }
    this.matrizElementos = []
    let posY = this.posicionY
    for (let i = 0; i < this.matriz.length; i++) {
      const row = this.matriz[i]
      this.matrizElementos[i] = []
      let posX = this.posicionX
      for (let j = 0; j < row.length; j++) {
        const element = row[j]
        this.matrizElementos[i][j] = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        this.matrizElementos[i][j].setAttribute('x', String(posX))
        this.matrizElementos[i][j].setAttribute('y', String(posY))
        this.matrizElementos[i][j].setAttribute('width', String(GRID_SIZE))
        this.matrizElementos[i][j].setAttribute('height', String(GRID_SIZE))
        this.matrizElementos[i][j].setAttribute('data', String(this.debug))
        this.matrizElementos[i][j].classList.add(this.className)
        this.matrizElementos[i][j].style.fill = element ? 'black' : 'white'
        this.gameContainer.append(this.matrizElementos[i][j])
        posX += GRID_SIZE
      }
      posY += GRID_SIZE
    }
    this.debug++
  }

  draw () {
    let posY = this.posicionY
    this.matrizElementos.forEach(row => {
      let posX = this.posicionX
      row.forEach(element => {
        element.setAttribute('x', String(posX))
        element.setAttribute('y', String(posY))
        posX += GRID_SIZE
      })
      posY += GRID_SIZE
    })
    this.debug++
  }

  // Function to rotate the matrix 90 degree clockwise
  rotate90Clockwise () {
    // Traverse each cycle
    const size = this.matriz.length
    for (let i = 0; i < size / 2; i++) {
      for (let j = i; j < size - i - 1; j++) {
        // Swap elements of each cycle
        // in clockwise direction
        const temp = this.matriz[i][j]
        this.matriz[i][j] = this.matriz[size - 1 - j][i]
        this.matriz[size - 1 - j][i] = this.matriz[size - 1 - i][size - 1 - j]
        this.matriz[size - 1 - i][size - 1 - j] = this.matriz[j][size - 1 - i]
        this.matriz[j][size - 1 - i] = temp
      }
    }
  }

  // Function to rotate the matrix 90 degree counter clockwise
  rotate90CounterClockwise () {
    // Traverse each cycle
    const size = this.matriz.length
    for (let i = size / 2 - 1; i >= 0; i--) {
      for (let j = i; j < size - i - 1; j++) {
        // Swap elements of each cycle
        // in clockwise direction
        const temp = this.matriz[i][j]
        this.matriz[i][j] = this.matriz[size - 1 - j][i]
        this.matriz[size - 1 - j][i] = this.matriz[size - 1 - i][size - 1 - j]
        this.matriz[size - 1 - i][size - 1 - j] = this.matriz[j][size - 1 - i]
        this.matriz[j][size - 1 - i] = temp
      }
    }
  }

  limpiar () {
    const elementos = document.getElementsByClassName(this.className)
    for (let i = 0; i < elementos.length; i++) {
      this.gameContainer.removeChild(elementos[i])
    }
  }

  bajar () {
    this.posicionY += GRID_SIZE
    this.draw()
  }
}
