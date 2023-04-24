
const mongoose = require("mongoose");



const Schema = mongoose.Schema;
const  BankSchema = new  Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    accounts: [
        {accountId: {
            required: true, 
            type: Schema.Types.ObjectId, 
            ref: "Account"
        }}
    ]
});


const BankModal = mongoose.model("Bank", BankSchema);
module.exports = BankModal;
