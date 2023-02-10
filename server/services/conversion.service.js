const units = {
    Celsius: {
      Kelvin: (value) => value + 273.15,
      Fahrenheit: (value) => (value * 9 / 5) + 32,
      Rankine: (value) => (value + 273.15) * 9 / 5,
    },
    Fahrenheit: {
      Kelvin: (value) => (value - 32) * 5 / 9 + 273.15,
      Celsius: (value) => (value - 32) * 5 / 9,
      Rankine: (value) => value + 459.67,
    },
    Kelvin: {
      Celsius: (value) => value - 273.15,
      Fahrenheit: (value) => (value - 273.15) * 9 / 5 + 32,
      Rankine: (value) => value * 9 / 5,
    },
    Rankine: {
      Kelvin: (value) => value * 5 / 9,
      Celsius: (value) => (value - 491.67) * 5 / 9,
      Fahrenheit: (value) => value - 459.67,
    },
    liters: {
      tablespoons: (value) => value * 67.628045,
      cubicInches: (value) => value * 61.023744,
      cups: (value) => value * 4.2267528,
      cubicFeet: (value) => value / 28.31685,
      gallons: (value) => value / 3.78541,
    },
    tablespoons: {
      liters: (value) => value / 67.628045,
      cubicInches: (value) => value / 0.90808,
      cups: (value) => value / 16,
      cubicFeet: (value) => value / 1915.013,
      gallons: (value) => value / 256,
    },
    cubicInches: {
      liters: (value) => value / 61.023744,
      tablespoons: (value) => value * 0.90808,
      cups: (value) => value / 14.4375,
      cubicFeet: (value) => value / 1728,
      gallons: (value) => value / 231,
    },
    cups: {
      liters: (value) => value / 4.2267528,
      tablespoons: (value) => value * 16,
      cubicInches: (value) => value * 14.4375,
      cubicFeet: (value) => value / 119.688,
      gallons: (value) => value / 16,
    },
    cubicFeet: {
      liters: (value) => value * 28.31685,
      tablespoons: (value) => value * 1915.013,
      cubicInches: (value) => value * 1728,
      cups: (value) => value * 119.688,
      gallons: (value) => value * 7.48052,
    },
    gallons: {
      liters: (value) => value * 3.78541,
      tablespoons: (value) => value * 256,
      cubicInches: (value) => value * 231,
      cups: (value) => value * 16,
      cubicFeet: (value) => value / 7.48052,
    }
   } 
  