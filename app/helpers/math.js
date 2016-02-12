import Ember from 'ember';

export function math(params) {
  var operand1 = params[0];
  var operator = params[1];
  var operand2 = params[2];

  Ember.Logger.info("nag", operand1, operator, operand2);
  var result;
  switch (operator) {
    case '+':
    {
      result = operand1 + operand2;
      break;
    }
    case '-':
    {
      result = operand1 - operand2;
      break;
    }
    case '*':
    {
      result = operand1 * operand2;
      break;
    }
    case '/':
    {
      result = Number(operand1 / operand2).toFixed(2);
      break;
    }
  }
  return result;
}

export default Ember.Helper.helper(math);
