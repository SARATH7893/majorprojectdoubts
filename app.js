const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err);
});

async function main(){
await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
res.send("server is ");
});

app.get("/testListing",async (req,res)=>{
let sampleListing=new Listing({
    title:"My Home",
    description:"By The Beach",
    price:1200,
    location:"Calangute, Goa",
    country:"India"
})
await sampleListing.save();
console.log("sample was saved");
res.send("successful");
});

app.listen(8080,()=>{
    console.log("server is listening");
})