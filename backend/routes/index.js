const express = require("express")

const router = express.Router()






const userSignUpController = require('../controller/userSignUp');
const userSignInController = require("../controller/userSignin");
const userDetailssController = require("../controller/userDetailss");
const authToken = require("../middleware/authToken");

router.post('/signup',  userSignUpController)
router.post("/signin", userSignInController )
router.get('/user-detailss',authToken,userDetailssController)

module.exports = router