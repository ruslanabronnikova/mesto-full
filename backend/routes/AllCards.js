const router = require('express').Router();
const { getAllCards } = require('../controllers/AllCards');

router.get('/', getAllCards)

module.exports = router;