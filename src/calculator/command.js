class Command {
  constructor(calculator) {
    this.calculator = calculator
  }

  execute() {
  }
}

export class AddNumberCommand extends Command {
  constructor(calculator, num) {
    super(calculator)
    this.num = num
  }

  execute() {
    this.calculator.addNumber(this.num)
    this.calculator.updateDisplay()
  }
}

export class ChooseOperationCommand extends Command {
  constructor(calculator, operation) {
    super(calculator)
    this.operation = operation
  }

  execute() {
    this.calculator.chooseOperation(this.operation)
    this.calculator.updateDisplay()
  }
}

export class CalculateCommand extends Command {
  execute() {
    this.calculator.calculate()
    this.calculator.updateDisplay()
  }
}

export class ClearCommand extends Command {
  execute() {
    this.calculator.clear()
    this.calculator.updateDisplay()
  }
}

export class OperateCommand extends Command {
  constructor(calculator, operation) {
    super(calculator)
    this.operation = operation
  }

  execute() {
    this.calculator.operate(this.operation)
    this.calculator.updateDisplay()
  }
}

export class MemoryCommand extends Command {
  constructor(calculator, operation) {
    super(calculator)
    this.operation = operation
  }

  execute() {
    this.calculator.memory(this.operation)
    this.calculator.updateDisplay()
  }
}