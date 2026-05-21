import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";

import User from "../models/userSchema.js";

passport.use(new LocalStrategy(User.authenticate()));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async(accessToken, refreshToken, profile, done)=>{
        // console.log(profile, "---", accessToken, "---", refreshToken);
        try{
            let user= await User.findOne({googleId: profile.id});
            
            if(user){
                return done(null, user);
            }

            user= await User.create({
                name: profile.displayName,
                username: profile.emails[0].value.split("@")[0],
                email: profile.emails[0].value,
                authProvider: "google",
                googleId: profile.id,
                profileIcon: profile.photos[0].value,
            })

            console.log(user);

            return done(null, user);
        }catch(err){
            console.log(err);
            return done(err, null);
        }
    }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

