const express = require('express');

const {getCoWorkingSpaces, getCoWorkingSpace, createCoWorkingSpace, updateCoWorkingSpace, deleteCoWorkingSpace} = require('../controllers/coworkingspaces')

const bookingRouter = require('./bookings');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

router.use('/:coworkingspaceId/bookings', bookingRouter);

router.route('/').get(getCoWorkingSpaces).post(protect,authorize('admin'), createCoWorkingSpace);
router.route('/:id').get(getCoWorkingSpace).put(protect,authorize('admin'), updateCoWorkingSpace).delete(protect, authorize('admin'), deleteCoWorkingSpace);

module.exports = router;
