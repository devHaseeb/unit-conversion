const express=require('express');
const convCtrl=require('../controller/conversion_controller');
const router=express.Router();

router.post('/input-check',convCtrl.Convert);

module.exports=router;

