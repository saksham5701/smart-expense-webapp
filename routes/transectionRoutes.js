const express=require('express')
const { addTransection } = require('../controllers/transectionCtrl');



//router object
const router=express.Router();


//routes
//add transection POST method

router.post('/add-transection',addTransection);

//get transections
router.post('/get-transections',getAllTransections);


module.exports=router;