const mongoose = require('mongoose');

const CoWorkingSpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    tel: {
        type: String
    },
    open_time: {
        type: Date,
        required: [true, 'Please add an open time']
    },
    close_time: {
        type: Date,
        required: [true, 'Please add a close time']
    }
}, {
    toJSON : {virtuals: true},
    toObject: {virtuals: true}
});

//Cascade delete appointments when a hospital is deleted
CoWorkingSpaceSchema.pre('deleteOne', {document: true, query: false}, async function (next) {
    console.log(`Appointments being removed from coworkingspace ${this_id}`);
    await this.model('Appointment').deleteMany({coworkingspace: this._id});
    next();
});

//Reverse popultae with virtuals
CoWorkingSpaceSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'coworkingspace',
    justOne: false
});

module.exports = mongoose.model('CoWorkingSpace', CoWorkingSpaceSchema);