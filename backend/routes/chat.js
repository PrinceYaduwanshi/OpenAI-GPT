import express from "express";
import Thread from "../models/Thread.js"
import getOpenAIAPIResponse from "../utils/openai.js"

import isAuthenticated from "../middlewares/isAuthenticated.js";
const router= express.Router();

router.get("/", (req,res)=>{
    res.send("Chat Route");
})
// GET all thread
router.get("/thread", isAuthenticated, async(req,res)=>{
    try{
        const threads= await Thread.find({author: req.user._id}).sort({updatedAt: -1});
        res.json(threads);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Something went wrong"});
    }
})

// GET info of a specific thread
router.get("/thread/:threadId", isAuthenticated, async(req,res)=>{
    const {threadId}= req.params;
    try{
        const thread= await Thread.findOne({threadId, author:req.user._id});

        if(!thread){
            return res.status(404).json({error: "Thread not found"});
        }

        res.json(thread);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Something went wrong"});
    }
})

// DELETE a thread
router.delete("/thread/:threadId", isAuthenticated, async(req,res)=>{
    let {threadId}= req.params;

    try{
        const deletedThread= await Thread.findOneAndDelete({threadId, author:req.user._id});
        
        if(!deletedThread){
            return res.status(404).json({error: "Thread not found"});
        }

        res.status(200).json({sucess: "Thread deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Something went wrong"});
    }
})

// POST chat route
// 1. validate thread id 
// 2. should have msg for which the reply has to be send
// two cases: thread id may not exisi(new chat), existing chat
// if new chat then create a new thread with same threadId
// 3. save the messages in thread[usermsg, asssistant reply, usermsg,... and so on]

router.post("/chat", isAuthenticated, async(req,res)=>{
    const {threadId, message}= req.body;

    if(!threadId || !message){
        return res.status(400).json({error: "Missing Parameters"});
    }

    try{
        let thread= await Thread.findOne({threadId});

        if(!thread){

            thread= new Thread({
                threadId,
                title: message,
                messages: [],
                author: req.user._id,
            });

        }

        thread.messages.push({
            role: "user",
            content: message
        });

        const messagesForAI= thread.messages.map(msg=>({
            role: msg.role,
            content: msg.content
        })).slice(-10);

        const assistantReply= await getOpenAIAPIResponse(messagesForAI);

        thread.messages.push({role: "assistant", content:assistantReply});

        await thread.save();
        res.json({reply: assistantReply});

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Something went wrong"});
    }
})

// router.post("/test", isAuthenticated, async(req,res)=>{
//     console.log("Req.user", req.user);
//     try{
//         const thread= new Thread({
//             threadId: "xyz",
//             title: "Test Route",
//             author: req.user._id,
//         })

//         thread.messages.push({
//             role: "user",
//             content: "what is 2+2",
//         });

//         const response= await thread.save();
//         console.log(response);
//         res.send(response);
        
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: "Failed to add the sample"});
//     }
// })

export default router;