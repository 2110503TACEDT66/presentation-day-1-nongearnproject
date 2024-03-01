const express = require('express');
const router = express.Router();

const {protect,authorize} = require('../middleware/auth');

const {getCoWorkingSpaces, getCoWorkingSpace, updateCoWorkingSpace, deleteCoWorkingSpace, createCoWorkingSpace} = require('../controllers/coWorkingSpaces');
const appointmentRouter = require('./appointments');

router.use('/:coworkingspaceID/appointments/',appointmentRouter);

router.route('/').get(getCoWorkingSpaces).post(protect,authorize('admin'),createCoWorkingSpace)
router.route('/:id').get(getCoWorkingSpace).put(protect,authorize('admin'),updateCoWorkingSpace).delete(protect,authorize('admin'),deleteCoWorkingSpace)

module.exports = router;