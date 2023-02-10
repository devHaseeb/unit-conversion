const express = require('express');
const router = express.Router();
const conversionController = require('../controllers/conversion');
const { convertUnit } = require('../controllers/conversion');

router.post('/temperature', conversionController.convertTemperature);
router.post('/volume', conversionController.convertVolume);

router.get('/temperature/:value/:fromUnit/:toUnit', convertUnit(TEMPERATURE_UNIT_CONVERSIONS));
router.get('/volume/:value/:fromUnit/:toUnit', convertUnit(VOLUME_UNIT_CONVERSIONS));

module.exports = router;