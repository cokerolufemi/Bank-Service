const { validationResult } = require("express-validator");
const accountModal = require("../modals/account");
const bankModal = require("../modals/bank");


const createBankController = (req,res)=>{
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        return res.json({message: errors.array()[0].msg});
    }
    const {_id,name,location,branch,phone,address,accountNumber} = req.body;
    const bank = new bankModal({_id,name,location,branch,phone,address,accountNumber});
    bank.save().then(result => {

        res.json({message: "create successful", data: result});
    }).catch(err => console.log(err));

    }
    const bankListController = (req,res)=>{
    const {id} = req.params;
    if(id){
    bankModal.find({_id: id}).then(banks => {
        res.json({data: banks});
    }).catch(err=>console.log(err));
}else{
    bankModal.find().then(banks => {
        res.json({data: banks});
    }).catch(err=>console.log(err));
}
    }
    const updateBankController = (req, res)=>{
        const {id:bankID}= req.params
        bankModal.findByIdAndUpdate({_id:bankID},req.body,{
            new:true,
            runValidators:true
        }).then(bank=>{

            if(bank){
                res.status(200).json({bank})
            }
        })
    }
    const deleteBankController = (req,res)=>{
    const {id} = req.params;
    bankModal.findByIdAndRemove(id).then(deletedBank => {
        if(deletedBank){

            accountModal.deleteMany({bankId: deletedBank._id}).then(result => {
                res.json({message: "bank deleted", data: deletedBank});

            }).catch(err => console.log(err));
            return;
        }
        res.json({message: "bank not found"});
    }).catch(err => console.log(err));

    }

    module.exports = {
        createBankController, 
        bankListController,
        updateBankController,
        deleteBankController
    }