import express from "express";
import "dotenv/config"; 
import cors from "cors";
import mongoose from "mongoose";

import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/authRoutes.js";

import passport from "passport";
import session from "express-session";
import MongoStore from 'connect-mongo'

import User from "./models/userSchema.js"

import "./config/passport.js";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(cors({
  origin: process.env.FRONT_END_URL,
  credentials: true
}));
app.use(express.urlencoded({extended:true}));

const store= MongoStore.create({
  mongoUrl: process.env.MONGO_DB_URI,
  secret: process.env.SESSION_SECRET,
  touchAfter: 24 * 3600
})

const sessionOptions= {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // prod
  proxy: true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    
    //prod
    secure: true,
    sameSite: "none",
  }
}

// prod
app.set("trust proxy", 1);

app.use(session(sessionOptions));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () => {
  console.log("Server established in GPT project");
  connectDB(); 
});

app.get("/",(req,res)=>{
  res.send("Hi there");
})

const connectDB= async()=>{
  try{
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connection successfull");
  }catch(err){
    console.log("Failed to connect to DB");
    console.log(err);
  }
}


app.use("/api", chatRoutes);

app.use("/auth", authRoutes);

// app.post("/test", async (req, res) => {

//   const options = {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//     },

//     body: JSON.stringify({
//       model: "gpt-4o-mini",

//       messages: [
//         {
//           role: "user",
//           content: req.body.message
//         }
//       ]
//     })
//   };

//   try {

//     const response = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       options
//     );

//     const data = await response.json();

//     res.send(data.choices[0].message.content);

//   } catch (err) {

//     console.log(err);

//     res.status(500).json({
//       error: err.message
//     });
//   }
// });

// const client = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });

// const response = await client.responses.create({
//   // model: "deepseek/deepseek-chat",
//   model: 'gpt-4o-mini',
//   input: 'Generate some joke related to Computer Science',
// });
// console.log(response);


// app.get("/fakeuser", async(req,res)=>{
//   let fakeUser= new User({
//     name: "Fake User",
//     email: "fake@gmail.com",
//     username: "fakeuser1"
//   })

//   let newUser= await User.register(fakeUser, "fakepassword");
//   console.log(newUser);
//   res.json(newUser);
// }) 
