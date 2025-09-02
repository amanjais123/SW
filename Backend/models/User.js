const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name : {
        type : String ,
        required : true  ,
        trim : true , 
    },

    email: {
         type : String ,
        required : true  ,
        trim : true ,

    },
    password: {
         type : String ,
        required : true  ,
    },
    accountType : {
        type : String ,
        enum : ["Leader" ,"Campus_Ambasdor"] ,
        required : true ,   
    },
    Team : [
        {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Team" ,    
    }
],


rollNo : {
    type:String 
} ,


    token:{
        type: String ,
    },
    resetPasswordExpires : {
        type : Date ,
    } ,

    // Idimage:{
    //     type : String  ,
    //     required : true ,
    // },
  
}) ;

module.exports = mongoose.model("User" , userSchema) ;