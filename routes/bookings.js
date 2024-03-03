const express = require('express');
const {getBookings, getBooking, addBooking, updateBooking, deleteBooking, getTop1BookingUser} = require('../controllers/bookings');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/bestUser')
    .get(protect, authorize('admin'), getTop1BookingUser);
router.route('/')
    .get(protect, getBookings)
    .post(protect, authorize('admin', 'user'), addBooking);    
router.route('/:id')
    .get(protect, getBooking)
    .put(protect, authorize('admin', 'user'), updateBooking)
    .delete(protect, authorize('admin', 'user'), deleteBooking);

module.exports = router;