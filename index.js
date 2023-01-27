const express=require("express");
const app=express();
const PORT=8081;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"congrats! server is running successfuly"
    })
});
app.get("*",(req,res)=>{
    res.status(404).json({
        message:"this rout is not exist"
    })
});


app.listen(PORT,()=>{
    console.log(`server running at port:${PORT}`)
})