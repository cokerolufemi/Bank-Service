const express = require("express");
const {createBankController,bankListController,updateBankController,deleteBankController} = require("../controllers/banks");
const {body} = require("express-validator");
const BankModal = require("../modals/bank");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();



router.post("/bank", isAuth, [
    body("name").trim().not().isEmpty().withMessage("name field cannot be empty").isAlpha(),
    body("location").trim().not().isEmpty().withMessage("location field cannot be empty").isAlpha(),
    body("branch").trim().not().isEmpty().withMessage("branch field cannot be empty").isAlpha(),
    body("phone").isMobilePhone("en-GH").custom((value, {req}) => {
        return BankModal.findOne({"phone": value}).then(
            bankDoc => {
                if(bankDoc)
                return Promise.reject("phone number already in use");
            }
        )
    })
], 
createBankController);
router.get("/bank/:id?", isAuth, bankListController);
router.put("/bank/:id", isAuth, updateBankController);
router.delete("/bank/:id", isAuth, deleteBankController);





module.exports = router;