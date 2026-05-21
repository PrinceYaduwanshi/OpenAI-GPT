import "./Sidebar.css";
import {useContext, useEffect} from "react";
import { MyContext } from "./MyContext.jsx"
import { v1 as uuidv1 } from 'uuid';

import {BACKEND_URL} from "./config.js"

import logo from "./assets/logo.png"

function Sidebar(){

    const {CurrThreadId, allThread, setAllThread, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats, user}= useContext(MyContext);

    const getAllThreads= async()=>{
        try{
            const response= await fetch(`${BACKEND_URL}/api/thread`,{
                method: "GET",
                credentials:"include",
            });
            const res= await response.json();
            // store threadId and title
            const filterData= res.map(thread =>({threadId: thread.threadId, title: thread.title}));
            // console.log(filterData);
            setAllThread(filterData);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getAllThreads();   
    },[CurrThreadId])

    const createNewChat= ()=>{
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread= async(newthreadId)=>{
        setCurrThreadId(newthreadId);

        try{
            const response= await fetch(`${BACKEND_URL}/api/thread/${newthreadId}`,{
                method:"GET",
                credentials:"include",
            });
            const res= await response.json();

            // console.log(res.messages)
            setPrevChats(res.messages);
            setNewChat(false);
            setReply(null);  
        }catch(err){
            console.log(err);
        }
    }

    const handleDelete= (event, threadId)=>{
        event.stopPropagation();
        deleteThread(threadId); 
    }

    const deleteThread= async(threadId)=>{
        try{
            const response= await fetch(`${BACKEND_URL}/api/thread/${threadId}`, {method: "DELETE", credentials:"include"});
            const res= await response.json();
            // console.log(res);

            setAllThread(prev => prev.filter(thread => thread.threadId != threadId));

            if(threadId === CurrThreadId){
                createNewChat();
            }

        }catch(err){
            console.log(err);
        }
    }

    return (
        <section className="sidebar">
            {/* New Chat Button */}
            <button onClick={createNewChat}>
                <img className="logo" src={logo} alt= "gpt-logo"></img>
                <span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            </button>
            
            {/* History of chat */}
            <ul className="history">
                {
                    allThread?.map((thread, idx)=>(
                        <li key={idx} onClick={() => changeThread(thread.threadId)} className={thread.threadId == CurrThreadId ?"highlighted":""}>
                            {thread.title}
                             <i className="fa-solid fa-trash deleteIcon" onClick={(event)=>handleDelete(event, thread.threadId)}></i>
                        </li>
                    ))
                }
            </ul>

            {/* sign of who the app belongs to */}
            <div className="sign">
                <p>Hello,&nbsp;{user.name}&nbsp;<i className="fa-solid fa-heart"></i></p>
            </div>

        </section>
    )
}

export default Sidebar;