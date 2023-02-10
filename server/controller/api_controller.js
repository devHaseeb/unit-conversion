exports.apiSuccess=(res,result,message="Success")=>{
    res.status(200).json({
        error:false,
        message:message,
        result:result,
        error:[]
    });
}

exports.apiError=(res,message="Unable to process request",err,errorCode=400)=>{
    res.status(errorCode).json({
            error:true,
            message:message,
            result:{},
            errors:[err]

    });
}
