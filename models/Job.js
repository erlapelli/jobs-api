const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        require:[true,'please provide company name'],
        maxlength:50,

    },
    position:{
        type:String,
        require:[true,'please provide position'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['interview','decline','pending'],
        default:'pending',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require:[true,'please provide user']
    }

},{timetamps:true})

module.exports = mongoose.model('Job',JobSchema)