const mongoose = require('mongoose') 
const bcrypt = require('bcryptjs')
const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type:'string',
        require:[true,'please provide a name'],
        minlength:3,
        maxlength:50,
    },
    email:{
        type:'string',
        require:[true,'please provide a email'],
        match:[
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please provide valid email'

        ],
        unique:true,

    },
    password:{
        type:'string',
        require:[true,'please provide a password'],
        minlength:6,
        
    },

})

UserSchema.pre('save',async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id,name:this.name},k3dn4gZc4Dw3zrzSHjyi3ij0zI/fOTgCxgGQ7IqacLfoaOT2JpU4GQ2c91xCq3yW,{
        expiresIn:30,
    })

}

UserSchema.methods.comparePassword = async function(canditatePassword) {

    const isMatch = await bcrypt.compare(canditatePassword,this.password)
    return isMatch
}



module.exports = mongoose.model('User',UserSchema)