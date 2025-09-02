const User = require("../models/User") ;
const OTP = require("../models/OTP") ;
const otpGenerator = require("otp-generator") ;
const Team = require("../models/Team");
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
require("dotenv").config() ; 
const mailSender = require("../utils/mailsender")
const otpTemplate = require("../mail/templates/mailverifaiction") ;

//  otp send 
exports.sendOTP = async (req , res)  => {
    try{
     const {email} = req.body ;

    const checkUserPresent = await User.findOne({email}) ;
    if(checkUserPresent){
        return res.status(401).json({
            success : false ,
            message : 'User already registered' ,
        })
        }

         var otp = otpGenerator.generate(6,{
            upperCaseAlphabets : false ,
            lowerCaseAlphabets : false , 
            specialChars : false ,
         });
         console.log("generated otp " , otp) ;
         const result = await OTP.findOne({otp: otp}) ;
         while(result){
            otp= otpGenerator(6,{
            upperCaseAlphabets : false ,
            lowerCaseAlphabets : false , 
            specialChars : false ,
         });
          result = await OTP.findOne({otp: otp}) ;
         }


         const otpPayload = {email , otp } ;
         const otpBody  =await OTP.create(otpPayload) ;
         console.log(otpBody) ;

         await mailSender(
                  email,
  "EduNova - Email Verification" ,
                otpTemplate(otp) 
);




         res.status(200).json({
            success: true ,
            message : "OTP sent Successfully",
            otp ,
         })

        
        }
        catch(error){

            console.log(error) ;
            return res.status(500).json({
                success : false ,
                message : "can not send otp",
            })
              
        }
};  


// signup
exports.signUp = async(req , res) => {
    try{
    const { 
        Name ,
        email,
        password , 
        confirmPassword , 
        accountType , 
        otp,
        rollNo 
    } = req.body ;

console.log("1st")

    if(!Name || !email || !password || !confirmPassword || !otp || !rollNo)
        {
        return res.status(403).json({
            success : false ,
            message : "All fields are required" ,
        })
    }

    if(password != confirmPassword) {
        return res.status(400).json({
            success: false ,
            message : "password & confirmPassword didnt matched" ,
        });
    }

    const existingUser = await User.findOne({email}) ;
    if(existingUser) {
        return res.status(400).json({
            succes: false, 
            message : 'User is already Registered' ,
        })  ;
    }

console.log("2nd")
    const recentOtp = await OTP.find({email}) ;
    console.log(recentOtp) ;

     if(recentOtp.length==0){
        return res.status(400).json({
            success:false ,
            message : 'OTP not found ' ,
        }) ;
     }


     console.log("3rd")
     
      const latestOtp = recentOtp[recentOtp.length - 1]; // Get the most recent OTP

if (latestOtp.otp !== otp) {
    return res.status(400).json({
        success : false ,
        message : 'Invalid OTP' ,
    }) ;
}

console.log("4th")


     const hashedpassword = await bcrypt.hash(password , 10) ;




     const user  = await User.create({
        Name , 
        email,
        password : hashedpassword ,
        accountType ,
        rollNo ,
        Team : Team._id 

     })
console.log("5th")
     return res.status(200).json({
        success : true ,
        message :'User is Registered ',
        user ,

     }) ;
     console.log("6th")
    }
    catch(error){
        console.log(error) ; 
        return res.status(500).json({
            success : false ,
            message : "User cannot be registered  !!!  please try again " ,
        }) ;

    }
}







//login 


exports.login = async(req , res) => {
    try{
        const {email , password} = req.body ;
        if(!email || !password){
            return res.status(403).json({
                success : false ,
                message : "All fields are Required" ,
            }) ;
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                 success: false ,
                 message : "NO Account found . Please Create a New Account " ,
            }) ;
        }

        if(await bcrypt.compare(password , user.password)) {
            const payload  = {
                email : user.email ,
                id : user.id ,
                accountType : user.accountType ,
                
            }

            const token = jwt.sign(payload , process.env.JWT_SECRET , {
                expiresIn : "2h" ,
            }) ;

            user.token = token ;
            user.password = undefined ;


            const options = {
  expires: new Date(Date.now() + 3*24*60*60*1000),
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',  // set true only in production HTTPS
  sameSite: 'none',  // essential for cross-origin cookies
};



            res.cookie("token" , token  , options).status(200).json({
                success : true ,
                token , 
                user ,
                message : "Logged In Successfully !!" ,
            }) ;
        }
        else{
            return res.status(401).json({
                success : false ,
                message : "Password not Matched" ,
            }) ;

        }


    }
    catch(error){
        console.log(error) ;
        return res.status(500).json({
            success : true ,
            message : "Login Failure ...try Again !!"
        }); 

    }
}



//change password
exports.changePassword  = async (req , res) => {
    try{
        //get data form req body
        const userDetails = await User.findById(req.user.id);
        //get old password,new password,confirmNewPassword
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        //validate old password
        const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
        if(!isPasswordMatch){
            //if password is not matched return a unauthorized error 401
            return res.status(401).json({
                success:false,
                message: "The password is incorrect",
            });
        }
        // Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}
        //update password in DB
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);
        //send mail
        try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}
       //return response
       return res.status(200).json({
        success:true,
        message: "Password updated successfully",
       });
    }
    catch(error){
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }

}


// Get current logged-in user
exports.me = async (req, res) => {
  try {
    // Make sure your auth middleware sets req.user = { id, email, ... }
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};






// Logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
