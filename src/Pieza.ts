export const GRID_SIZE = 40

export default class Pieza {
  tipo: number
  matrizElementos: SVGRectElement[][]
  posicionX: number
  posicionY: number
  gameContainer: HTMLElement
  className: string

  constructor (gameContainer: HTMLElement, tipo?: number) {
    let matriz:boolean[][]
    if (tipo) {
      this.tipo = tipo
    } else {
      this.tipo = Math.floor(Math.random() * 7)
    }

    // Genere una cadena aleatoria para la clase
    this.className = Math.random().toString(36).slice(2)
    this.gameContainer = gameContainer
    this.posicionX = 4
    switch (this.tipo) {
      case 0:
        // Palito
        matriz = [
          [ true, true, true, true ],
        ]
        break
      case 1:
        // L
        matriz = [
          [ true, false ],
          [ true, false ],
          [ true, true ],
        ]
        break
      case 2:
        // L al revés
        matriz = [
          [ false, true ],
          [ false, true ],
          [ true, true ],
        ]
        break
      case 3:
        // Z
        matriz = [
          [ false, true ],
          [ true, true ],
          [ true, false ],
        ]
        break
      case 4:
        // S
        matriz = [
          [ true, false ],
          [ true, true ],
          [ false, true ],
        ]
        break
      case 5:
        // T
        matriz = [
          [ false, true, false ],
          [ true, true, true ],
        ]
        break
      default:
        // Cubito
        matriz = [
          [ true, true ],
          [ true, true ],
        ]
        break
    }
    this.matrizElementos = []
    this.posicionY = matriz.length
    let posY = this.posicionY
    for (let i = 0; i < matriz.length; i++) {
      const row = matriz[i]
      this.matrizElementos[i] = []
      let posX = this.posicionX
      for (let j = 0; j < row.length; j++) {
        const element = row[j]
        this.matrizElementos[i][j] = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        this.matrizElementos[i][j].setAttribute('x', String(posX * GRID_SIZE))
        this.matrizElementos[i][j].setAttribute('y', String(posY * GRID_SIZE))
        this.matrizElementos[i][j].setAttribute('width', String(GRID_SIZE))
        this.matrizElementos[i][j].setAttribute('height', String(GRID_SIZE))
        this.matrizElementos[i][j].classList.add(this.className)
        this.matrizElementos[i][j].style.fill = element ? 'black' : 'white'
        this.gameContainer.append(this.matrizElementos[i][j])
        posX += 1
      }
      posY += 1
    }
  }

  draw () {
    let posY = this.posicionY - this.matrizElementos.length
    this.matrizElementos.forEach(row => {
      let posX = this.posicionX
      row.forEach(element => {
        element.setAttribute('x', String(posX * GRID_SIZE))
        element.setAttribute('y', String(posY * GRID_SIZE))
        posX += 1
      })
      posY += 1
    })
  }

  rotate90Clockwise () {
    const size1 = this.matrizElementos.length
    const size2 = this.matrizElementos[0].length
    const newMatrix:SVGRectElement[][] = []
    for (let j = 0; j < size2; j++) {
      newMatrix[j] = []
      for (let i = 0; i < size1; i++) {
        newMatrix[j][i] = this.matrizElementos[size1 - i - 1][j]
      }
    }
    this.matrizElementos = newMatrix
    this.draw()
  }

  // Function to rotate the matrix 90 degree counter clockwise
  rotate90CounterClockwise () {
    const size1 = this.matrizElementos.length
    const size2 = this.matrizElementos[0].length
    const newMatrix:SVGRectElement[][] = []
    for (let j = 0; j < size2; j++) {
      newMatrix[j] = []
      for (let i = 0; i < size1; i++) {
        newMatrix[j][i] = this.matrizElementos[i][size2 - j - 1]
      }
    }
    this.matrizElementos = newMatrix
    this.draw()
  }

  limpiar () {
    const elementos = document.getElementsByClassName(this.className)
    for (let i = 0; i < elementos.length; i++) {
      this.gameContainer.removeChild(elementos[i])
    }
  }

  bajar () {
    this.posicionY += 1
    this.draw()
  }
}
