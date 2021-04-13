const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidents');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/', incidentController.getIncidents);

//POST add Incidents
router.post('/createInc', incidentController.addIncident);

module.exports = router;