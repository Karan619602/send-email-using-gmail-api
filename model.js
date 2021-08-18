const mongoose= require('mongoose')

const schema= new mongoose.Schema({
    email:{
        type:String,
        require:true
    }

})

const Email=mongoose.model('Email',schema)
module.exports=Email
