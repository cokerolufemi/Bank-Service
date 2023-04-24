const accountModal = require("../modals/account");
const { validationResult } = require("express-validator");

const createAccountController = (req, res) => {
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        return res.json({message: errors.array()[0].msg});
    }
    const {name, number, accountType, bankId} = req.body;
    const account = new accountModal({name, number, accountType, bankId});

    account.save().then(result => {
        if(result){
            res.json({message: "Account created", data: result})
        }else{
            res.json({message: "failed to create account"})
        }
    })
}

const listAccountController = (req, res) => {
    accountModal.find().populate("bankId", "name location branch -_id").then(accounts => {
        res.json({data: accounts});
    }).catch(err => console.log(err));
}

module.exports = {
    createAccountController, 
    listAccountController
};