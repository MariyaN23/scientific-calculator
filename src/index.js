import './styles.css'
import { Calculator } from './calculator/calculator.js'
import { AddNumberCommand, CalculateCommand, ChooseOperationCommand, ClearCommand } from './calculator/command.js'

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandValue = document.querySelector('[data-previous-operand]')
const currentOperandValue = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandValue, currentOperandValue)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    const command = new AddNumberCommand(calculator, button.innerText)
    command.execute()
  })
})

operationButtons.forEach(button => {
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
})