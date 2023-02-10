const express=require('express');
const router=express.Router();

// import project module
const convRoutes=require('./conversion_routes');


router.get('/health-check', (req, res) =>{
    res.send('OK');
});


router.use('/conversion',convRoutes);


module.exports=router;