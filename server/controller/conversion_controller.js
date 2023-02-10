const apiCtrl = require("./api_controller");

function Convert(req, res) {
  var { value, fromUnit, toUnit, studentResponse } = req.body;

  value=parseFloat(value);
  studentResponse=parseFloat(studentResponse);
  
  const authoritativeAnswer = convertUnit(value, fromUnit, toUnit);

  // apiCtrl.apiSuccess(res, authoritativeAnswer);
  if (authoritativeAnswer == "invalid") {
    apiCtrl.apiSuccess(res, "invalid");
  }

  const isResponseCorrect = checkResponse(authoritativeAnswer, studentResponse);

  if (isResponseCorrect) {
    apiCtrl.apiSuccess(res, "correct");
  } else {
    apiCtrl.apiSuccess(res, "incorrect");
  }
}

function convertUnit(inputValue, inputUnit, targetUnit) {
  switch (inputUnit) {
    case "Kelvin":
      switch (targetUnit) {
        case "Celsius":
          return inputValue - 273.15;
        case "Fahrenheit":
          return (inputValue * 9) / 5 - 459.67;
        case "Rankine":
          return (inputValue * 9) / 5;
        case "Kelvin":
          return inputValue;
        default:
          return "invalid";
      }
    case "Celsius":
      switch (targetUnit) {
        case "Kelvin":
          return inputValue + 273.15;
        case "Fahrenheit":
          return (inputValue * 9) / 5 + 32;
        case "Rankine":
          return ((inputValue + 273.15) * 9) / 5;
        case "Celsius":
          return inputValue;
        default:
          return "invalid";
      }
    case "Fahrenheit":
      switch (targetUnit) {
        case "Kelvin":
          return ((inputValue + 459.67) * 5) / 9;
        case "Celsius":
          return ((inputValue - 32) * 5) / 9;
        case "Rankine":
          return inputValue + 459.67;
        case "Fahrenheit":
          return inputValue;
        default:
          return "invalid";
      }
    case "Rankine":
      switch (targetUnit) {
        case "Kelvin":
          return (inputValue * 5) / 9;
        case "Celsius":
          return (inputValue * 5) / 9 - 273.15;
        case "Fahrenheit":
          return inputValue - 459.67;
        case "Rankine":
          return inputValue;
        default:
          return "invalid";
      }
    default:
      return "invalid";
  }
}

function checkResponse(authoritativeAnswer, studentResponse) {
  return Math.abs(authoritativeAnswer - studentResponse) < 0.1;
}

function roundToTenths(value) {
  return Math.round(value * 10) / 10;
}

module.exports = {
  Convert,
};
