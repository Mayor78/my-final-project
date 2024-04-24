async function userDetailssController(req,res){
    try{
        console.log("userId",req.userId)
        const user = await UserModel.findById(req.userId)
        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message: "User Detailss",
        })

    }catch(err){
        res.status(400).json({
            message: err.message || err ,
            error : true,
            success : false,
        })
           
        
    }
}

module.exports = userDetailssController