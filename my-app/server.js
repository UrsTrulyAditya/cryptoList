const express=require("express");
const app=express();
const mongoose=require("mongoose");
const SavedData=require("./model");

app.use(express.json());

mongoose.connect('mongodb+srv://adityaDb:adityaDb@cluster0.cxw58eg.mongodb.net/?retryWrites=true&w=majority').then(()=>
    console.log("DB connected")).catch(error=>console.log(error))
 
app.post('/savedata',async(req,res)=>{
    const {name,symbol,market_cap,current_price}=req.body;
    try {
        const newData= new SavedData({
            name:name,
            symbol:symbol,
            market_cap:market_cap,
            current_price:current_price
            
        });
        await newData.save();
        return res.json(await SavedData.find());
        
    } catch (error) {
        console.log(error);
    }
}) 

app.delete('/savedata/:id',async (req,res)=>{
    try {
        await SavedData.findByIdAndDelete(req.params.id);
        const Data=await SavedData.find();
        return res.json(Data);
    } catch (error) {
        console.log(error);
    }
})
 
app.get('/data',async (req,res)=>{
    try {
        const allData= await SavedData.find();
        // console.log(allData);
        return res.json(allData);
    } catch (error) {
        console.log(error);
    }
})


app.get('/',async (req,res)=>{
    res.send("hello world")
})
app.listen(5000,(req,res)=>{
    
    console.log("Server running... ")})