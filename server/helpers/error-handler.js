const errorHandler=(err,req,res,next)=>{
    if(err.name==='UnauthorizedError'){
        console.log("UnauthorizedError");
      return  res.status(401).send({
            message:err.message
        })
    }
    if(err.name==='ValidationError'){
        console.log("ValidationError");
        return res.status(401).send({
            message:err
        })
    }
    console.log("Internal server error");
    return res.status(500).json(err);
}

module.exports=errorHandler;