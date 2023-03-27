const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    number: {
        type: String,
        required: [true, 'A  number cannot be empty']
    },
    report: {
        type: Number,
        default: 0,
    }
})


const Report = mongoose.model('Report', reportSchema)
module.exports = Report;
