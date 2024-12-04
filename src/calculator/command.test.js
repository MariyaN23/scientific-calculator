import { Calculator } from './calculator.js'
import {
  AddNumberCommand,
  ChooseOperationCommand,
  CalculateCommand,
  ClearCommand,
  OperateCommand,
  MemoryCommand,
} from './command.js'

describe('Command Tests', () => {
  let calculator

  beforeEach(() => {
    const previousOperandTextElement = { innerText: '' }
    const currentOperandTextElement = { innerText: '' }
    calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  })

  test('AddNumberCommand should add a number', () => {
    const command = new AddNumberCommand(calculator, '5')
    command.execute()
    expect(calculator.currentOperand).toBe('5')
  })

  test('ClearCommand should clear operation, current and previous values', () => {
    calculator.addNumber('5')
    const command = new ClearCommand(calculator)
    command.execute()
    expect(calculator.currentOperand).toBe('')
    expect(calculator.previousOperand).toBe('')
    expect(calculator.operation).toBeNull()
  })

  test('ChooseOperationCommand should choose an operation', () => {
    calculator.addNumber('5')
    const command = new ChooseOperationCommand(calculator, '+')
    command.execute()
    expect(calculator.operation).toBe('+')
    expect(calculator.previousOperand).toBe('5')
    expect(calculator.currentOperand).toBe('')
  })

  test('CalculateCommand should calculate result correctly', () => {
    calculator.addNumber('2')
    calculator.chooseOperation('+')
    calculator.addNumber('3')
    const command = new CalculateCommand(calculator)
    command.execute()
    expect(calculator.currentOperand).toBe('5')
  })

  test('OperateCommand should do correct operation on the current operand', () => {
    calculator.addNumber('1')
    const command = new OperateCommand(calculator, '%')
    command.execute()
    expect(calculator.currentOperand).toBe('0,01')
  })

  test('MemoryCommand should do correct operations in memory', () => {
    calculator.addNumber('5')
    const command = new MemoryCommand(calculator, 'm+')
    command.execute()
    const command2 = new MemoryCommand(calculator, 'mr')
    command2.execute()
    expect(calculator.currentOperand).toBe('5')
  })
})
