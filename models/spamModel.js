const mongoose = require('mongoose');

const spamSchema = new mongoose.Schema({
    number: {
        type: String,
        required: [true, "A number cannot be empty"]
    },
    report: {
        type: Number,
        default: 3
    }
})

const Spam = mongoose.model('Spam', spamSchema);
module.exports = Spam;