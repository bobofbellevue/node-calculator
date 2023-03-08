/* Note to reviewer: I'm putting the leading curly brace of functions on a line by themselves to work with VIM's [[ and ]] commands. */

const rs = require('readline-sync');

/* limited expressions supported: two numbers surrounding one of these operators: /, *, -, or +. */
function parseExpression(expression, params)
{
  let string1 = '', string2 = '', string3 = '';
  let foundSpace = 0;
  for (let i=0; i < expression.length; i++) {
    if (expression[i] === ' ') {
      foundSpace++;
      continue;
    }
    switch (foundSpace) {
      case 0:
	string1 += expression[i];
	break;
      case 1:
	string2 += expression[i];
	break;
      case 2:
	string3 += expression[i];
	break;
      default:
	break;
    }
  }
  if (foundSpace != 2 || isNaN(string1) || string2.length != 1 || isNaN(string3)) {
    return false;
  }
  switch (string2[0]) {
    case '/':
    case '*':
    case '-':
    case '+':
      break;
    default:
      return false;
  }
  if (params) {
    params.num1 = string1 * 1;
    params.op = string2;
    params.num2 = string3 * 1;
  }
  return true;
}

function getValidOperator()
{
  let operator = '';
  do {
    operator = rs.question('What operation would you like to perform? [/, *, -, or +]: ');
    if (! operator) {
      console.log('Please enter a valid operator [/, *, -, or +].');
      continue;
    }
    if (parseExpression(operator)) {
      return operator;
    }
    switch (operator[0]) {
      case '/':
      case '*':
      case '-':
      case '+':
	valid = true;
	break;
      default:
	console.log('Please enter a valid operator [/, *, -, or +].');
	operator = '';
	continue;
    }
  } while (! operator);
  return operator;
}

function getValidNumber(ordinal)
{
  const number = rs.questionFloat('Please enter the ' + ordinal + ' number: ');
  return number;
}

function applyOperator(operator, firstNumber, secondNumber)
{
  let result = 0;
  switch (operator[0]) {
    case '/':
      result = firstNumber / secondNumber;
      break;
    case '*':
      result = firstNumber * secondNumber;
      break;
    case '-':
      result = firstNumber - secondNumber;
      break;
    case '+':
      result = firstNumber + secondNumber;
      break;
    default:
      result = NaN;
      break;
  }
  return result;
}

let firstNumber = 0;
let secondNumber = 0;
let operator = getValidOperator();
let expression = operator;
let params = {num1: firstNumber, num2: secondNumber, op: operator};
if (parseExpression(expression, params)) {
  firstNumber = params.num1;
  operator = params.op;
  secondNumber = params.num2;
}
else {
  firstNumber = getValidNumber('first');
  secondNumber = getValidNumber('second');
}
let result = applyOperator(operator, firstNumber, secondNumber);

console.log('The result is: ' + result);
