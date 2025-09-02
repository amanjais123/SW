const jwt = require("jsonwebtoken") ;
require("dotenv").config() ;
const User = require("../models/User") ;




//Auth
//Auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || 
      req.body?.token || 
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
console.log("Cookies:", req.cookies);
console.log("Auth Header:", req.headers.authorization);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

  } catch (err) {
    console.error("Error in auth middleware:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during authentication",
    });
  }
};



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
