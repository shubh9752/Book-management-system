const express=require("express");
const {users}=require("../data/users.json");

const router = express.Router();

router.get("/users",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users,
    });
});
router.get("/users/:id",(req,res)=>{
    const {id}=req.params
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
    }
    return res.status(200).json({
        success:true,
        data:user,
    })
});
router.put("/users/:id",(req,res)=>{
    const{id}=req.params;
    const{data}=req.body;

    const user=users.find((each)=>each.id===id);

    if(!user){
        return res.status(404).json({success:false,
        message:"user not exist",
       });
    }
    const updatingUser=users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data,
            }
        }
        return each;
    })
    return res.status(200).json({
        success:true,
        data:updatingUser,
    })
});
router.post("/users",(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate}=req.body;
    const user=users.find((each)=>each.id===id);

    if(user){
        return res.status(404).json({
            success:false,
            message:"user allready exist",
        });

    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });
    return res.status(202).json({
        success:true,
        data:users,
    })
})

//deleting a user by id 
router.delete("/users/:id",(req,res)=>{
    const {id}=req.params;
    const user = users.find((eachUser)=>eachUser.id===id);

    if(!user){
        return res.status(404).json({
            success:false,
            message:"The id of the user dont exist",
        })
    }
    const index=users.indexOf(user);
    users.splice(index, 1);
    return res.status(202).json({
        success:true,
        data:users,
    });
})

module.exports=router;