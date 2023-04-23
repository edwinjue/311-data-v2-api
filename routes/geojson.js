const express = require('express');

const router = express.Router();
const geojsonController = require('../controllers/geojson');

/* Process requests like /geojson/geocode?latitude=34.051511&longitude=-118.251459 */
router.get('/geocode', geojsonController.geocode);

module.exports = router;
