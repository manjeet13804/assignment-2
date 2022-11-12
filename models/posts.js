const  mongoose  = require("mongoose");

const postsSchema=new mongoose.Schema(
    {
       title:String,
       body:String,
       image:String,
       user:String
        }         
)
PostsModel=mongoose.model("posts",postsSchema)
module.exports=PostsModel
