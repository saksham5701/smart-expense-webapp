const express=require('express')
const { addTransection, getAllTransection } = require('../controllers/transectionCtrl');



//router object
const router=express.Router();


//routes
//add transection POST method

router.post('/add-transection',addTransection);

//get transections
router.post('/get-transections',getAllTransection);


module.exports=router;