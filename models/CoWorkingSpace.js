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
    district: {
        type: String,
        required: [true, 'Please add a district']
    },
    province: {
        type: String,
        required: [true, 'Please add a province']
    },
    postalcode: {
        type: String,
        required: [true, 'Please add a postalcode'],
        maxlength: [5, 'Postal code can not be more than 5 digits']
    },
    tel: {
        type: String
    },
    region: {
        type: String,
        required: [true, 'Please add a region']
    }
}, {
    toJSON : {virtuals: true},
    toObject: {virtuals: true}
});

//Cascade delete appointments when a hospital is deleted
CoWorkingSpaceSchema.pre('deleteOne', {document: true, query: false}, async function(next) {
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