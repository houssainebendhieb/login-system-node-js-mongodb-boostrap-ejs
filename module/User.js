const mongoose=require('mongoose');

const User=mongoose.model('users',{

    name:{type:String,require:true},
    username:{type:String ,require:true},
    email:{type:String ,require:true},
    password:{type:String, require:true}


})

module.exports=User;