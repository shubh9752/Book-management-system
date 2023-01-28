const express=require("express");
const app=express();
const PORT=8081;
//importing json data from data folder
const {books}=require("./data/books.json");
const {users}=require("./data/users.json");
//importing routes
const userRouter=require("./router/userRoutes");
const bookRouter=require("./router/bookRoutes");


app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"congrats! server is running successfuly"
    })
});

app.use("/users",userRouter);
app.use("/books",bookRouter)


app.get("*",(req,res)=>{
    res.status(404).json({
        message:"this rout is not exist"
    })
});


app.listen(PORT,()=>{
    console.log(`server running at port:${PORT}`)
})