const express = require('express');
const router = express.Router();

const {protect,authorize} = require('../middleware/auth');

const {getCoWorkingSpaces, getCoWorkingSpace, createCoWorkingSpace, updateCoWorkingSpace, deleteCoWorkingSpace, getSpaces} = require('../controllers/coWorkingSpaces');
const appointmentRouter = require('./appointments');

router.use('/:coworkingspaceID/appointments/', appointmentRouter);

router.route('/spaces').get(getSpaces);

router.route('/').get(getCoWorkingSpaces).post(protect,authorize('admin'), createCoWorkingSpace);
router.route('/:id').get(getCoWorkingSpace).put(protect,authorize('admin'), updateCoWorkingSpace).delete(protect, authorize('admin'), deleteCoWorkingSpace);

module.exports = router;