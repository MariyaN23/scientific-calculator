import './styles.css'
import { Calculator, Memory, Operations } from './calculator/calculator.js'
import {
  AddNumberCommand,
  CalculateCommand,
  ChooseOperationCommand,
  ClearCommand,
  MemoryCommand,
  OperateCommand,
} from './calculator/command.js'

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const operateButtons = document.querySelectorAll('[data-operate]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandValue = document.querySelector('[data-previous-operand]')
const currentOperandValue = document.querySelector('[data-current-operand]')
const memoryButtons = document.querySelectorAll('[data-memory]')
const allButtons = document.querySelectorAll('button')

const calculator = new Calculator(previousOperandValue, currentOperandValue)

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const command = new AddNumberCommand(calculator, button.innerText)
    command.execute()
  })
})

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const command = new ChooseOperationCommand(calculator, button.innerText)
    command.execute()
  })
})

equalsButton.addEventListener('click', () => {
  const command = new CalculateCommand(calculator)
  command.execute()
})

allClearButton.addEventListener('click', () => {
  const command = new ClearCommand(calculator)
  command.execute()
  allButtons.forEach((button) => {
    if (
      button.textContent !== Operations.AllClear &&
      button.textContent !== Memory.Clear &&
      button.textContent !== Memory.Recall
    ) {
      button.disabled = false
    }
  })
})

operateButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const command = new OperateCommand(calculator, button.innerText)
    command.execute()
  })
})

memoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const command = new MemoryCommand(calculator, button.innerText)
    command.execute()
  })

  if (!calculator.memoryValue) {
    button.textContent === Memory.Clear || button.textContent === Memory.Recall ? (button.disabled = true) : ''
  }
})
