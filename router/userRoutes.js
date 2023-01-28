const express=require("express");
const {users}=require("../data/users.json");

const router = express.Router();

router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users,
    });
});
router.get("/:id",(req,res)=>{
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
router.put("/:id",(req,res)=>{
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
router.post("",(req,res)=>{
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
router.get("/subscription/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
  
    if (!user) 
      return res.status(404).json({
        success: false,
        message: "user not found or exist please check again ",
      });
    
  
    const getDateInDays = (data = "") => {
      let date;
      if (data === "") {
        date = new Date();
      } else {
        date = new Date(data);
      }
      let days = Math.floor(date / (1000 * 60 * 60 * 24));
      return days;
    };
    const subscriptionType = (date) => {
      if (user.subscriptionType === "Basic") {
        date = date + 90;
      } else if (user.subscriptionType === "Standard") {
        date = date + 180;
      } else if (user.subscriptionType === "premium") {
        date = date + 365;
      }
      return date;
    };
  
    //subscription expiry part
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpireDate = subscriptionType(subscriptionDate);
  
    const data = {
      ...user,
      subscriptionExpired: subscriptionExpireDate < currentDate,
      daysLeftForExpiration:
        subscriptionExpireDate <= currentDate
          ? 0
          : subscriptionExpireDate - currentDate,
      fine:
        returnDate < currentDate
          ? subscriptionExpireDate <= currentDate
            ? 200
            : 100
          : 0,
    };
    return res.status(200).json({
      success: true,
      data,
    });
  });

//deleting a user by id 
router.delete("/:id",(req,res)=>{
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
