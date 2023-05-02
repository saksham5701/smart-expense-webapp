const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({

    name:{
        type: 'string',
        required: [true,'name is required']
    },
    email:{
        type: 'string',
        required: [true,'email is required'],
        unique: true
    },
    password:{
        type: 'string',
        required: [true,'password is required'],
    },
  
},
//to capture date of the record
{timestamps:true}
);

const userModel=mongoose.model('users',userSchema);
module.exports=userModel;