export class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = null
  }

  addNumber(num) {
    if (this.currentOperand.length >= 16) return
    if (num === ',' && this.currentOperand.includes(',')) return
    this.currentOperand = this.currentOperand.toString() + num.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.calculate()
    }
    let displayed
    operation === 'ʸ√x'
      ? displayed = '√'
      : operation === 'xʸ'
        ? displayed = '^'
        : displayed = operation
    this.operation = displayed
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  calculate() {
    let result
    const prev = parseFloat(this.previousOperand.replace(',', '.'))
    const current = parseFloat(this.currentOperand.replace(',', '.'))
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '×':
        result = prev * current
        break
      case '÷':
        if (current === 0) {
          this.currentOperand = 'Division by zero is impossible'
          return
        } else {
          result = prev / current
        }
        break
      case '√':
        let root = current / prev
        for (let i = 0; i < 10; i++) {
          root = ((prev - 1) * root + current / (root ** (prev - 1))) / prev
        }
        result = root
        break
      case '^':
        let square = 1
        for (let i = 0; i < current; i++) {
          square *= prev
        }
        result = square
        break
      default:
        return
    }
    this.currentOperand = Number.isInteger(result)
      ? result.toString().replace('.', ',')
      : result.toFixed(15).toString().replace(/0+$/, '').replace(/\./, ',').replace(/,+$/, ',0')
    this.operation = null
    this.previousOperand = ''
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand
    if (this.operation !== null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = this.previousOperand
    }
  }

  operate(operation) {
    const current = parseFloat(this.currentOperand.replace(',', '.'))
    if (isNaN(current)) return
    let result
    switch (operation) {
      case '%':
        result = current / 100
        break
      case '±':
        result = -current
        break
      case 'x²':
        result = current ** 2
        break
      case 'x³':
        result = current ** 3
        break
      case '10ˣ':
        result = 10 ** current
        break
      case '1/x':
        if (current === 0) {
          this.currentOperand = 'Division by zero is impossible'
          return
        } else {
          result = 1 / current
        }
        break
      case '√x':
        if (current === 0) {
          result = 0
        } else {
          let squareRoot = current / 2
          for (let i = 0; i < 10; i++) {
            squareRoot = (squareRoot + current / squareRoot) / 2
          }
          result = squareRoot
        }
        break
      case '∛x':
        if (current === 0) {
          result = 0
        } else {
          let cubeRoot = current / 3
          for (let i = 0; i < 10; i++) {
            cubeRoot = (2 * cubeRoot + current / (cubeRoot * cubeRoot)) / 3
          }
          result = cubeRoot
        }
        break
      case 'x!':
        if (current < 0) {
          this.currentOperand = 'Invalid input'
          return
        } else {
          result = 1
          for (let i = 2; i <= current; i++) {
            result *= i
          }
        }
        break
      default:
        return
    }
    this.currentOperand = Number.isInteger(result)
      ? result.toString().replace('.', ',')
      : result.toFixed(15).toString().replace(/0+$/, '').replace(/\./, ',').replace(/,+$/, ',0')
  }
}