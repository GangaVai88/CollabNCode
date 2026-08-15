const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomAdmin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    code : {
        type : String,
        required : true,
        unique : true
    },
    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
})

module.exports = mongoose.model('Room', roomSchema);