const express = require("express");
const router = express.Router();
const { body} = require("express-validator");
const UserModal = require("../modals/user");
const {signUpController, signInController} = require("../controllers/user");



router.put("/signup",[
    body("name").trim().not().isEmpty().withMessage("pls enter name"),
    body("email").isEmail().withMessage("provide a valid email")
    .custom((value, {req}) => {
        return UserModal.findOne({email: value}).then(
            userDoc => {
                if(userDoc)
                return Promise.reject("email already taken");
            }
        )
    }),
    body("password").trim().isLength({min: 6, max: 12})
], signUpController);

 router.post("/signin", [
    body("email").isEmail().withMessage("email is invalid"),
    body("password").trim().isLength({min: 6, max: 18})
 ], signInController);


module.exports = router;