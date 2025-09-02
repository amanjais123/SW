const jwt = require("jsonwebtoken") ;
require("dotenv").config() ;
const User = require("../models/User") ;




//Auth
//Auth
exports.auth = async (req , res  ,next) => {
  try {
    console.log("💬 Cookies:", req.cookies);
    console.log("💬 Headers:", req.headers);
    console.log("💬 Body:", req.body);

    const token = req.cookies.token
                || req.body.token
                || req.header("Authorization")?.replace("Bearer ", "") ;

    console.log("Auth middleware triggered");
    console.log("Authorization Header:", req.headers.authorization);
    console.log("🪪 Extracted Token:", token);

    if(!token){
      return res.status(401).json({
        success : false ,
        message : "Token is missing" ,
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
req.user = decode;    
  console.log("JWT verified successfully");
    } catch(err) {
      return res.status(401).json({   // ✅ ADD RETURN
        success : false ,
        message : "Invalid token !!" ,
      });
    }

    next(); // ✅ Only called if verification succeeds
  }
  catch(error){
    return res.status(401).json({   // ✅ ADD RETURN
      success : false ,
      message : "Something went wrong while verifying token",
    });
  }
}



// IsStudent 
exports.isLeader = async (req , res , next) =>{
    console.log("IsStudent me aa gye bhai")
    try{
        if(req.user.accountType !== "Leader") {
            return res.status(401).json({
                success : false ,
                message : "this is protected route for Leader only !!" ,
            }) ;
        }
        console.log(" verified chalo aage")
        next() ;

    }
    catch(error){
        return res.status(401).json({
            success : false ,
            message : "User Role can not be verfied" ,
        }) ;
   }
}




//isInstructor 

exports.isCampus_Ambasdor = async (req , res , next) =>{
    try{
        if(req.user.accountType !== "Campus_Ambasdor") {
            return res.status(401).json({
                success : false ,
                message : "this is protected route for Ambasdor only !!" ,
            }) ;
        }

        next() ;

    }
    catch(error){
        return res.status(401).json({
            success : false ,
            message : "User Role can not be verfied" ,
        }) ;
   }
}




//isAdmin 


exports.isAdmin = async (req , res , next) =>{
    try{
        if(req.user.accountType !== "Admin") {
            return res.status(401).json({
                success : false ,
                message : "this is protected route for Admin  only !!" ,
            }) ;
        }

        next() ;

    }
    catch(error){
        return res.status(401).json({
            success : false ,
            message : "User Role can not be verfied" ,
        }) ;
   }
}



exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains id, email, accountType
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
