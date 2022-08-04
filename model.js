const mongoose=require("mongoose");

const SavedData =  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    symbol: {
        type: String,
        required: true
    },
    market_cap: {
        type: Number,
        required: true
    },
    current_price: {
        type: Number,
        required: true
    },is_saved: {
        type: Boolean,
        default: true
    }
})

module.exports=mongoose.model("savedData",SavedData);