const memoryButtons = document.querySelectorAll('[data-memory]')
const allButtons = document.querySelectorAll('button')

export const Operations = {
  Plus: '+',
  Minus: '-',
  Multiply: '×',
  Divide: '÷',
  Root: '√',
  Power: '^',
  Percent: '%',
  SignChange: '±',
  Square: 'x²',
  Cube: 'x³',
  TenPower: '10ˣ',
  Reciprocal: '1/x',
  SquareRoot: '√x',
  CubeRoot: '∛x',
  Factorial: 'x!',
  AllClear: 'AC',
}

export const Memory = {
  Clear: 'mc',
  Add: 'm+',
  Subtraction: 'm-',
  Recall: 'mr',
}

export class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
    this.memoryValue = null
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
      ? (displayed = Operations.Root)
      : operation === 'xʸ'
        ? (displayed = Operations.Power)
        : (displayed = operation)
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
      case Operations.Plus:
        result = prev + current
        break

      case Operations.Minus:
        result = prev - current
        break

      case Operations.Multiply:
        result = prev * current
        break

      case Operations.Divide:
        if (current === 0) {
          this.currentOperand = 'Division by zero is impossible'
          this.disableButtons(true)

          return
        } else {
          result = prev / current
        }

        break

      case Operations.Root:
        if (prev <= 0) {
          this.currentOperand = 'Invalid input'
          this.disableButtons(true)

          return
        } else {
          let root = current / prev

          for (let i = 0; i < current; i++) {
            root = ((prev - 1) * root + current / root ** (prev - 1)) / prev
          }

          result = root
        }

        break

      case Operations.Power:
        if (current === 0) {
          result = 1
        }

        if (current === 0 && prev === 0) {
          this.currentOperand = 'Invalid input'
          this.disableButtons(true)

          return
        }

        let power = 1
        let absExponent

        if (current > 0) {
          absExponent = current
        } else if (current < 0) {
          absExponent = current * -1
        }

        for (let i = 0; i < absExponent; i++) {
          power *= prev
        }

        if (current < 0) {
          result = 1 / power
        } else if (current > 0) {
          result = power
        }

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
      case Operations.Percent:
        result = current / 100
        break

      case Operations.SignChange:
        result = -current
        break

      case Operations.Square:
        result = current ** 2
        break

      case Operations.Cube:
        result = current ** 3
        break

      case Operations.TenPower:
        result = 10 ** current
        break

      case Operations.Reciprocal:
        if (current === 0) {
          this.currentOperand = 'Division by zero is impossible'
          this.disableButtons(true)

          return
        } else {
          result = 1 / current
        }

        break

      case Operations.SquareRoot:
        if (current < 0) {
          this.currentOperand = 'Invalid input'
          this.disableButtons(true)

          return
        } else if (current === 0) {
          result = 0
        } else {
          let squareRoot = current / 2

          for (let i = 0; i < 10; i++) {
            squareRoot = (squareRoot + current / squareRoot) / 2
          }

          result = squareRoot
        }

        break

      case Operations.CubeRoot:
        if (current < 0) {
          this.currentOperand = 'Invalid input'
          this.disableButtons(true)

          return
        } else if (current === 0) {
          result = 0
        } else {
          let cubeRoot = current / 3

          for (let i = 0; i < 10; i++) {
            cubeRoot = (2 * cubeRoot + current / (cubeRoot * cubeRoot)) / 3
          }

          result = cubeRoot
        }

        break

      case Operations.Factorial:
        if (current < 0) {
          this.currentOperand = 'Invalid input'
          this.disableButtons(true)

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

  disableButtons(disable) {
    allButtons.forEach((button) => {
      if (
        button.textContent !== Operations.AllClear &&
        button.textContent !== Memory.Clear &&
        button.textContent !== Memory.Recall
      ) {
        button.disabled = disable
      }
    })
  }

  memory(memoryOperation) {
    const current = parseFloat(this.currentOperand.replace(',', '.'))
    switch (memoryOperation) {
      case Memory.Clear:
        this.memoryValue = null
        this.disableMemoryButtons(true)
        break

      case Memory.Add:
        if (this.memoryValue === null) {
          this.disableMemoryButtons(true)
        }

        if (isNaN(current)) {
          return
        }

        this.memoryValue += current
        this.disableMemoryButtons(false)
        break

      case Memory.Subtraction:
        if (this.memoryValue === null) {
          this.disableMemoryButtons(true)
        }

        if (isNaN(current)) {
          return
        }

        this.memoryValue -= current
        this.disableMemoryButtons(false)
        break

      case Memory.Recall:
        if (this.memoryValue === null) return

        this.currentOperand = this.memoryValue.toString().replace('.', ',')
        this.disableMemoryButtons(false)
        break

      default:
        return
    }
  }

  disableMemoryButtons(disable) {
    memoryButtons.forEach((button) => {
      if (button.textContent === Memory.Clear || button.textContent === Memory.Recall) {
        button.disabled = disable
      }
    })
  }
}
