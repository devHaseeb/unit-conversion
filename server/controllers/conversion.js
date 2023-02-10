const conversionRoutes = require('express').Router();
const Conversion = require('../models/conversion');
const { roundToTenths } = require('../utils/math');

conversionRoutes.post('/conversions', (req, res) => {
  const { inputValue, fromUnit, toUnit, studentResponse } = req.body;

  const authoritativeAnswer = convertUnit(inputValue, fromUnit, toUnit);

  const isResponseCorrect = checkResponse(authoritativeAnswer, studentResponse);

  const conversion = new Conversion({
    inputValue,
    fromUnit,
    toUnit,
    studentResponse,
    authoritativeAnswer,
    isResponseCorrect
  });

  conversion.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).send(conversion);
  });
});

conversionRoutes.get('/conversions', (req, res) => {
  Conversion.find({}, (err, conversions) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(conversions);
  });
});

function checkResponse(authoritativeAnswer, studentResponse) {
  return Math.abs(authoritativeAnswer - studentResponse) < 0.1;
}

function convertUnit(inputValue, inputUnit, targetUnit) {
  switch (inputUnit) {
    case 'Kelvin':
      switch (targetUnit) {
        case 'Celsius':
          return inputValue - 273.15;
        case 'Fahrenheit':
          return (inputValue * 9 / 5) - 459.67;
        case 'Rankine':
          return inputValue * 9 / 5;
        case 'Kelvin':
          return inputValue;
        default:
          return 'Invalid unit of measure';
      }
    case 'Celsius':
      switch (targetUnit) {
        case 'Kelvin':
          return inputValue + 273.15;
        case 'Fahrenheit':
          return (inputValue * 9 / 5) + 32;
        case 'Rankine':
          return (inputValue + 273.15) * 9 / 5;
        case 'Celsius':
          return inputValue;
        default:
          return 'Invalid unit of measure';
      }
    case 'Fahrenheit':
      switch (targetUnit) {
        case 'Kelvin':
          return (inputValue + 459.67) * 5 / 9;
        case 'Celsius':
          return (inputValue - 32) * 5 / 9;
        case 'Rankine':
          return (inputValue + 459.67);
        case 'Fahrenheit':
          return inputValue;
        default:
          return 'Invalid unit of measure';
      }
    case 'Rankine':
      switch (targetUnit) {
        case 'Kelvin':
          return inputValue * 5 / 9;
        case 'Celsius':
          return (inputValue * 5 / 9) - 273.15;
        case 'Fahrenheit':
          return inputValue - 459.67;
        case 'Rankine':
          return inputValue;
        default:
          return 'Invalid unit of measure';
      }
    default:
      return 'Invalid unit of measure';
  }
}



exports.convertUnits = async (req, res) => {
    const { value, inputUnit, targetUnit, response } = req.body;
  
    try {
      // Validate the input
      if (isNaN(value) || isNaN(response)) {
        return res.status(400).json({ error: 'Invalid input: value or response is not a number' });
      }
  
      // Check if the input unit and target unit are valid
      if (!Object.values(Conversion.units).includes(inputUnit) || !Object.values(Conversion.units).includes(targetUnit)) {
        return res.status(400).json({ error: 'Invalid input: input unit or target unit is not valid' });
      }
  
      // Convert the value to Kelvin
      let convertedValue = Conversion.convertToKelvin(value, inputUnit);
  
      // Round the converted value to the tenths place
      convertedValue = Math.round(convertedValue * 10) / 10;
  
      // Convert the rounded converted value to the target unit
      const convertedResponse = Conversion.convertFromKelvin(convertedValue, targetUnit);
  
      // Round the converted response to the tenths place
      convertedResponse = Math.round(convertedResponse * 10) / 10;
  
      // Check if the student's response is correct
      let result;
      if (convertedResponse === response) {
        result = 'correct';
      } else if (isNaN(convertedResponse)) {
        result = 'invalid';
      } else {
        result = 'incorrect';
      }
  
      // Store the conversion in the database
      const conversion = new Conversion({
        value,
        inputUnit,
        targetUnit,
        response,
        result
      });
      await conversion.save();
  
      // Return the result
      res.json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const TEMPERATURE_UNIT_CONVERSIONS = {
    kelvin: {
      celsius: (value) => value - 273.15,
      fahrenheit: (value) => (value * 9/5) - 459.67,
      rankine: (value) => value * 1.8
    },
    celsius: {
      kelvin: (value) => value + 273.15,
      fahrenheit: (value) => (value * 9/5) + 32,
      rankine: (value) => (value + 273.15) * 1.8
    },
    fahrenheit: {
      kelvin: (value) => (value + 459.67) * 5/9,
      celsius: (value) => (value - 32) * 5/9,
      rankine: (value) => value + 459.67
    },
    rankine: {
      kelvin: (value) => value / 1.8,
      celsius: (value) => (value / 1.8) - 273.15,
      fahrenheit: (value) => value - 459.67
    }
  };

  const VOLUME_UNIT_CONVERSIONS = {
    liters: {
      tablespoons: (value) => value * 67.628045,
      cubicInches: (value) => value * 61.023744,
      cups: (value) => value * 4.2267528,
      cubicFeet: (value) => value * 0.0353147,
      gallons: (value) => value * 0.2641721
    },
    tablespoons: {
      liters: (value) => value * 0.0147868,
      cubicInches: (value) => value * 0.902344,
      cups: (value) => value * 0.0625,
      cubicFeet: (value) => value * 0.00052219,
      gallons: (value) => value * 0.00390625
    },
    cubicInches: {
      liters: (value) => value * 0.0163871,
      tablespoons: (value) => value * 1.1082311,
      cups: (value) => value * 0.0692641,
      cubicFeet: (value) => value * 0.00057870,
      gallons: (value) => value * 0.004329
    },
    cups: {
      liters: (value) => value * 0.2365882,
      tablespoons: (value) => value * 16,
      cubicInches: (value) => value * 14.4375,
      cubicFeet: (value) => value * 0.00835503,
      gallons: (value) => value * 0.0625
    },
    cubicFeet: {
      liters: (value) => value * 28.31685,
      tablespoons: (value) => value * 1915.013,
      cubicInches: (value) => value * 1728,
      cups: (value) => value * 119.688,
      gallons: (value) => value * 7.48052
    },
    gallons: {
      liters: (value) => value * 3.78541,
      tablespoons: (value) => value * 256,
      cubicInches: (value) => value * 231,
      cubicFeet: (value) => value * 0.133681,
      cups: (value) => value * 16
    },
  };
  