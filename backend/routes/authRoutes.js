import express from "express";
import User from "../models/userSchema.js";

import passport from "passport";

const router= express.Router();

import isAuthenticated from "../middlewares/isAuthenticated.js"

/** USING USERNAME AND PASSWORD ---- LOCAL LOGIN */
router.post("/signup", async(req, res)=>{
    
    try{
        const {name, email, username, password, confirmPassword}= req.body;
        console.log(name, email, username, password, password);
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password do not match"
            });
        }

        const userExist= await User.findOne({$or:[{username}, {email}]});

        if(userExist){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            })
        }

        const newUser= await User.register(
            new User({
                name, email, username,
            }),
            password
        );
        
        //direct login after signup
        req.login(newUser, (err)=>{
            if(err){
                res.status(501).json({
                    success: false,
                    message: "Login Failed after signup",
                })
            }

            return res.status(201).json({
                success: true,
                message: "SignUp Successfull",
                newUser,
            })
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})

router.post("/login", (req,res,next)=>{
    passport.authenticate("local", (err, user)=>{
        if(err){
            return next(err);
        }

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            })
        }

        req.login(user, (err)=>{
            if(err){
                return next(err);
            }

            return res.status(200).json({
                success: true,
                message: "Login Successfully",
                user,
            })
        })
    })(req,res,next);
})
    
/**GOOGLE LOGIN */
router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));

router.get(
    "/google/callback",

    passport.authenticate("google", {

        failureRedirect:
        `${process.env.FRONT_END_URL}/login`
    }),

    (req,res,next)=>{

        req.session.save((err)=>{

            if(err){
                return next(err);
            }

            res.redirect(
                `${process.env.FRONT_END_URL}/app`
            );
        });
});

router.get("/logout", isAuthenticated,(req,res,next)=>{
    // console.log("Response", res);
    req.logout((err)=>{
        if(err){
            return next(err);
        }

        req.session.destroy(()=>{
            res.clearCookie("connect.sid",{path:"/"});

            
            return res.status(200).json({
                success: true,
                message: "Logout Successfully",
            })
        })
    })
})

router.delete("/delete-account", isAuthenticated, async(req,res,next)=>{
    try{
        const {password}= req.body;
        const user= await User.findById(req.user._id);

        console.log(user);
        if(user.authProvider !== "google"){
            const result= await User.authenticate()(user.username, password);
            if(!result.user){
                return res.status(401).json({
                    success: false,
                    message: "Invalid Credentials",
                })
            }
        }

        await User.findByIdAndDelete(req.user._id);

        req.logout((err)=>{
            if(err){
                return next(err);
            }

            req.session.destroy(()=>{
                res.clearCookie("connect.sid");

                return res.status(200).json({
                    success: true,
                    message: "Account Deleted successfully",
                });
            });
        });

    }catch(err){
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})

router.get("/profile", (req,res)=>{
    if(req.isAuthenticated()){
        return res.status(200).json({
            success: true,
            user: req.user
        })
    }

    return res.status(401).json({
        success: false,
        message: "Not logged in",
    })

});


export default router;