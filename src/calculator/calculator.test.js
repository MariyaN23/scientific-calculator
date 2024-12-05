import { Calculator } from './calculator.js'

describe('Calculator Tests', () => {
  let calculator

  beforeEach(() => {
    const previousOperandTextElement = { innerText: '' }
    const currentOperandTextElement = { innerText: '' }
    calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  })

  describe('Calculate method', () => {
    test('should be correct addition', () => {
      calculator.currentOperand = '2'
      calculator.chooseOperation('+')
      calculator.currentOperand = '3'
      calculator.calculate()
      expect(calculator.currentOperand).toBe('5')
    })

    test('should be correct subtraction', () => {
      calculator.currentOperand = '5'
      calculator.chooseOperation('-')
      calculator.currentOperand = '2'
      calculator.calculate()
      expect(calculator.currentOperand).toBe('3')
    })

    test('should be correct multiplication', () => {
      calculator.currentOperand = '2'
      calculator.chooseOperation('×')
      calculator.currentOperand = '3'
      calculator.calculate()
      expect(calculator.currentOperand).toBe('6')
    })

    test('should be correct division', () => {
      calculator.currentOperand = '6'
      calculator.chooseOperation('÷')
      calculator.currentOperand = '3'
      calculator.calculate()
      expect(calculator.currentOperand).toBe('2')
    })

    test('division by zero should be impossible', () => {
      calculator.currentOperand = '6'
      calculator.chooseOperation('÷')
      calculator.currentOperand = '0'
      calculator.calculate()
      expect(calculator.currentOperand).toBe('Division by zero is impossible')
    })

    test('should be correct calculation of specified root from current number', () => {
      calculator.currentOperand = '5'
      calculator.chooseOperation('√')
      calculator.currentOperand = '243'
      calculator.calculate()
      expect(calculator.currentOperand).toBe('3')
    })

    test('calculating root of number equal or less than zero should be impossible', () => {
      calculator.currentOperand = '-10'
      calculator.chooseOperation('√')
      calculator.currentOperand = '243'
      calculator.calculate()
      expect(calculator.currentOperand).toBe('Invalid input')
    })

    test('should be correct calculation of specified power from current number', () => {
      calculator.currentOperand = '5'
      calculator.chooseOperation('^')
      calculator.currentOperand = '3'
      calculator.calculate()
      expect(calculator.currentOperand).toBe('125')
    })
  })

  describe('Operate method', () => {
    test('should be correct percentage operation', () => {
      calculator.currentOperand = '5'
      calculator.operate('%')
      expect(calculator.currentOperand).toBe('0,05')
    })

    test('should be correct squaring operation', () => {
      calculator.currentOperand = '5'
      calculator.operate('x²')
      expect(calculator.currentOperand).toBe('25')
    })

    test('should be correct cube operation', () => {
      calculator.currentOperand = '2'
      calculator.operate('x³')
      expect(calculator.currentOperand).toBe('8')
    })

    test('should be correct 10 to the power operation', () => {
      calculator.currentOperand = '3'
      calculator.operate('10ˣ')
      expect(calculator.currentOperand).toBe('1000')
    })

    test('should be correct reciprocal value', () => {
      calculator.currentOperand = '2'
      calculator.operate('1/x')
      expect(calculator.currentOperand).toBe('0,5')
    })

    test('getting reciprocal value from zero should be impossible', () => {
      calculator.currentOperand = '0'
      calculator.operate('1/x')
      expect(calculator.currentOperand).toBe('Division by zero is impossible')
    })

    test('should be correct square root operation', () => {
      calculator.currentOperand = '4'
      calculator.operate('√x')
      expect(calculator.currentOperand).toBe('2')
    })

    test('getting square root from negative number should be impossible', () => {
      calculator.currentOperand = '-4'
      calculator.operate('√x')
      expect(calculator.currentOperand).toBe('Invalid input')
    })

    test('should be correct cube root operation', () => {
      calculator.currentOperand = '27'
      calculator.operate('∛x')
      expect(calculator.currentOperand).toBe('3')
    })

    test('getting cube root from negative number should be impossible', () => {
      calculator.currentOperand = '-27'
      calculator.operate('∛x')
      expect(calculator.currentOperand).toBe('Invalid input')
    })

    test('should be correct factorial operation', () => {
      calculator.currentOperand = '5'
      calculator.operate('x!')
      expect(calculator.currentOperand).toBe('120')
    })

    test('getting factorial from negative number should be impossible', () => {
      calculator.currentOperand = '-5'
      calculator.operate('x!')
      expect(calculator.currentOperand).toBe('Invalid input')
    })
  })

  describe('Memory method', () => {
     test('should correctly clear memory', () => {
       calculator.memoryValue = 5
       calculator.memory('mc')
       expect(calculator.memoryValue).toBe(null)
     })

     test('should be correct adding to memory', () => {
       calculator.currentOperand = '5'
       calculator.memory('m+')
       expect(calculator.memoryValue).toBe(5)
       calculator.memory('m+')
       expect(calculator.memoryValue).toBe(10)
     })

     test('should be correct subtraction from memory', () => {
       calculator.currentOperand = '5'
       calculator.memory('m-')
       expect(calculator.memoryValue).toBe(-5)
       calculator.currentOperand = '5'
       calculator.memory('m-')
       expect(calculator.memoryValue).toBe(-10)
     })

     test('should be correct recall from memory', () => {
       calculator.memoryValue = 5
       calculator.memory('mr')
       expect(calculator.currentOperand).toBe('5')
     })
   })
})