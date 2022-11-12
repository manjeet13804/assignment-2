const express=require("express");
const bodyParser=require("body-parser")
const User = require("../models/login")
const Posts = require("../models/posts")
const jwt = require("jsonwebtoken")
const router=express.Router()
router.use(bodyParser())
router.get("/",async(req,res)=>{
    try{
        const token = req.headers.authorization.split("secret ")[1]
        if (token) {
            jwt.verify(token, "secret", async function (err, decoded) {
                if (err) {
                    return res.json({
                        status: "Failed",
                        message: err.message
                    })
                }
                // const userName=decoded.data
                const postData=await Posts.find()
console.log(postData)
                res.json({
                    status:"success",
                user:postData
                })
            })
        }else{
            return res.status(400).json({
              status:"Failed",
              message:"Invalid user"
            })
        }
    
    }catch(err){
        res.json({
            status:"Falied",
            message: err.message
        })
    }
})
router.post("/",async(req,res)=>{
    try {
        //  console.log(req.body)
        const postsData =await Posts.create(req.body);
        res.json({
        status: "success",
        postsData
    })
    res.end()
  }  catch (e) {
        res.json({
        status:"Falied",
        message: e.message
    })
}
});

router.put("/:id", async (req, res) => {
    try {
        await Posts.updateOne({ _id: req.params.id }, req.body)
        res.json({
            status:"success",
            message:"id updated seccessfully"
        })
        res.redirect("/")
    } catch (e) {
        console.log(e.message)
    }

})

router.delete("/:id", async (req, res) => {
    try {
        await Posts.deleteOne({ _id: req.params.id })
     res.json({
         status:"success",
         message:"id deleted seccessfully"
     })
    } catch (e) {
        console.log(e.message)
    }
    res.redirect("/")
})
module.exports=router