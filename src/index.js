import './styles.css'

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandValue = document.querySelector('[data-previous-operand]')
const currentOperandValue = document.querySelector('[data-current-operand]')

class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperand = previousOperand
    this.currentOperand = currentOperand
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
    this.operation = operation
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
        result = prev / current
        break
      default:
        return
    }
    this.currentOperand = Number.isInteger(result)
      ? result.toString().replace('.', ',')
      : result.toFixed(15).toString().replace(/0+$/, '').replace(/\./, ',').replace(/,+$/, ',0')
    console.log(this.currentOperand)
    this.operation = null
    this.previousOperand = ''
  }

  updateDisplay() {
    currentOperandValue.innerText = (this.currentOperand)
    if (this.operation !== null) {
      previousOperandValue.innerText = `${this.previousOperand} ${this.operation}`
    } else {
      previousOperandValue.innerText = this.previousOperand
    }
  }
}

const calculator = new Calculator(previousOperandValue, currentOperandValue)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.addNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log(button.innerText)
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.calculate()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})