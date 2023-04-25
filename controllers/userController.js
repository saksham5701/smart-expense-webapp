//Using this we can perform any crud operation very easily
const userModel=require('../models/userModel');


//login callback
const loginController=async ()=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email,password});
        if(!user)
        {   //error code
            return res.status(404).send("User not Found");
        }
        //ok status
        res.status(200).json({
            success:true,
            user,
        });
    } catch (error) {

        res.status(400).json({
            success:false,
            error,
        });
    }

};

//register callback
const registerController= async ()=>{
    try {
        const newUser=new userModel(req.body);
        await newUser.save();

        //to indicate that something has been created
        res.status(201).json({
            success:true,
            newUser,
        });
        
    } catch (error) {
        res.status(400).json({
            success:false,
            error,
        });
    }
  };

module.exports={loginController,registerController};