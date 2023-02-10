const mongoose = require('mongoose');

const ConversionSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  fromUnit: {
    type: String,
    required: true
  },
  toUnit: {
    type: String,
    required: true
  },
  result: {
    type: Number,
    required: true
  },
  studentResponse: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model('Conversion', ConversionSchema);