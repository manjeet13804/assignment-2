const  mongoose  = require("mongoose");

const userSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
email_id: {type:String,required:true,unique:true},
password: {type:String,required:true}
    })
UserModel=mongoose.model("users",userSchema)
module.exports=UserModel
