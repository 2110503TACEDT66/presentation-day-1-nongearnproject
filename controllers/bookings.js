const Booking = require('../models/Booking');
const CoWorkingSpace = require('../models/CoWorkingSpace');

exports.getBookings = async (req, res, next) => {
    let query;

    if(req.user.role !== 'admin') {
        query = Booking.find({user: req.user.id}).populate({
            path: 'coworkingspace',
            select: 'name tel address'
        });
    } else {
        if (req.params.coworkingspaceId) {
            console.log(req.params.coworkingspaceId);
            query = Booking.find({coworkingspace: req.params.coworkingspaceId}).populate({
                path: 'coworkingspace',
                select: 'name tel address'
            });
        } else {
            query = Booking.find().populate({
                path: 'coworkingspace',
                select: 'name tel address'
            });
        }
    }

    try {
        const bookings = await query;

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Cannot find Booking"
        });
    }
}

exports.getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id).populate({
            path: 'coworkingspace',
            select: 'name description tel'
        });

        if(!booking) {
            return res.status(404).json({
                success: false, 
                message: `No booking with the id of ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Cannot find Booking"
        });
    }
}

exports.addBooking = async (req, res, next) => {
    try {

        req.body.coworkingspace = req.params.coworkingspaceId;
        console.log(req.params.coworkingspaceId)
        const coworkingspace = await CoWorkingSpace.findById(req.params.coworkingspaceId);


        if (!coworkingspace) {
            return res.status(404).json({
                success: false,
                message: `No coworkingspace with the id of ${req.params.coworkingspaceId}`
            });
        }

        req.body.user = req.user.id;
        
        const existedBookings = await Booking.find({user: req.user.id});
        if(existedBookings.length >= 3 && req.user.role != 'admin') {
            return res.status(400).json({
                success: false,
                message: `The user with ID ${req.user.id} has already made 3 bookings`
            });
        }
        console.log("asd");
        const booking = await Booking.create(req.body);
        
        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Cannot create Booking"
        });
    }
}


exports.updateBooking = async (req, res, next) => {
    try {
        let booking = await Booking.findById(req.params.id);

        if(!booking) {
            return res.status(404).json({
                success: false, 
                message: `No booking with the id of ${req.params.id}`
            });
        }

        if(booking.user.toString() !== req.user.id && req.user.role != 'admin') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to delete this bootcamp`
            });
        }

        booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Cannot update Booking"
        });
    }
}

exports.deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if(!booking) {
            return res.status(404).json({
                success: false, 
                message: `No booking with the id of ${req.params.id}`
            });
        }

        await Booking.deleteOne();
        
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Cannot delete Booking"
        });
    }
}