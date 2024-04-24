const UserModel = require("../models/userModel")
const bcrypt = require('bcryptjs');


async function userSignUpController(req, res){
    try{
        const { email, password, name } = req.body

        const user = await UserModel.findOne({email})
        console.log("user", user)
        if(user){
            throw new Error("User Already Exist")
        }


            if(!email){
                throw new Error("Boss put your email now fine human")
            }

            if(!password){
                throw new Error("Boss put Better password that only you can remember")
            }

            if(!name){
                throw new Error("Boss put your name now fine human")
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hashSync(password, salt);
            

            if(!hashPassword){
                throw new Error("Boss check very well something no dey okay")
            }


            const payload ={
                ...req.body,
                role: "GENERAL",
                    password : hashPassword
            
            }
            const userData = new UserModel(payload)
            const saveUser = await userData.save()

            res.status(201).json({
                data : saveUser,
                error : false,
                success : true,
                message: "User Created Successfully",

            })

    }catch(err){
      
        res.json({
            message: err.message || err ,
            error : true,
            success : false,
        })
    }
}


module.exports = userSignUpController