const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const {createAccountController,listAccountController} = require("../controllers/accounts");


router.post("/account",[
    body("name").trim().not().isEmpty().withMessage("name field cannot be empty").isAlpha(),
    body("accountType").trim().not().isEmpty().withMessage("accountType field cannot be empty").isAlpha(),
    body("number").isLength({ min: 10, max:13 }).withMessage("acount number must not be below 10 and above 13 digits ").isNumeric()
],createAccountController);
router.get("/accounts", listAccountController);

module.exports = router;