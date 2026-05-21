import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose";

import Thread from "./Thread.js";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,

    },
    
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId:{
        type: String,
        sparse: true,
        unique: true,
        required: function(){
            return this.authProvider === "google"
        }
    },

    profileIcon:{
        type:String,
        default: "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png",
    },

})

userSchema.plugin(passportLocalMongoose.default);

userSchema.post("findOneAndDelete", async(user)=>{
    if(user){
        await Thread.deleteMany({author: user._id});
    }
})

const User= mongoose.model("User", userSchema);

export default User;