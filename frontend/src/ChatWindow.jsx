import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState,useEffect } from "react";
import {ScaleLoader} from "react-spinners";
import {useNavigate} from "react-router-dom";

import { BACKEND_URL } from "./config";

function ChatWindow(){

    const {prompt, setPrompt, reply, setReply, CurrThreadId, setCurrThreadId, prevChats, setPrevChats, setNewChat, user, setUser}= useContext(MyContext);
    
    const [isLoading, setIsLoading]= useState(false);
    
    const [isOpen, setIsOpen]= useState(false);
    const [theme, setTheme]= useState(() => localStorage.getItem("theme") || "dark");

    const navigate= useNavigate();

    const getReply= async ()=>{
        setIsLoading(true);
        setNewChat(false);
        // console.log(prompt);
        // console.log(CurrThreadId);

        const options= {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                message: prompt,
                threadId: CurrThreadId,
            })
        }
        
        try{
            const response= await fetch(`${BACKEND_URL}/api/chat`, options);
            const reply= await response.json();
            // console.log(reply);
            // open router api response format
            console.log(user);
            setReply(reply.reply);
        }catch(err){
            console.log(err);
        }
        setIsLoading(false);
        
    }
    // append new chat to prev chat
    useEffect(()=>{
        if(prompt && reply){
            setPrevChats(prevChats =>[
                ...prevChats, 
                {
                    role: "user",
                    content: prompt,
                },
                {
                    role: "assistant",
                    content: reply,
                }
            ])
        }
        setPrompt("");
    }, [reply])

    const handleKeyDown= (e)=>{
        if(e.key=== "Enter"){
            getReply();
            // setPrompt("");
        }
    }

    const handleClick= (e)=>{
        getReply();
        // setPrompt("");
    }

    const handleProfileClick= ()=>{
        setIsOpen(!isOpen);
    }

    const handleLogOut= async()=>{
        const response= await fetch(`${BACKEND_URL}/auth/logout`,{
            method:"GET",
            credentials: "include",
        })

        const rep= await response.json();
        // console.log(rep);

        setUser(null);
        
    }

    useEffect(() => {
        const isLight = theme === "light";
        document.body.classList.toggle("light-theme", isLight);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeToggle = () => {
        setTheme((current) => current === "dark" ? "light" : "dark");
    }

    return (
        <>
            <div className="chatWindow">
                
                <div className="navbar">
                    <span>GPT<i className="fa-solid fa-chevron-down"></i></span>
                    <div className="userIconDiv" onClick={handleProfileClick}>
                        <span className="userIcon">
                            <img
                                src={user?.profileIcon || "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"}
                                alt="Profile"
                                onError={(e) => {
                                    e.target.src = "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png";
                                }}
                            />
                        </span>
                    </div>
                </div>
                {
                    isOpen && 
                        <div className="dropDown">
                            <div className="dropDownItem" onClick={handleThemeToggle}>
                            <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>&nbsp;
                            {theme === "dark" ? "Light Mode" : "Dark Mode"}
                        </div>

                        <div className="dropDownItem" onClick={()=>navigate("/delete-account")}><i className="fa-solid fa-trash-can"></i>&nbsp;Delete Account</div>
                        
                        <div className="dropDownItem" onClick={handleLogOut}><i className="fa-solid fa-right-from-bracket"></i>&nbsp;Log Out</div>
                    </div>
                }

                <div className="chatArea">
                    <Chat></Chat>
                </div>

                <ScaleLoader className="loader" color={theme === "light" ? "#000" : "#fff"} loading={isLoading}></ScaleLoader>

                <div className="chatInput">
                    <div className="inputBox">
                        <input placeholder="Ask anything"
                         value={prompt} onChange={(e)=>setPrompt(e.target.value)} onKeyDown={handleKeyDown}>

                        </input>
                        <div id="submit" onClick={handleClick}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </div>
                    </div>
                    <p className="info">
                        GPT can make mistakes. Please verify the information provided by GPT with reliable sources.
                    </p>
                </div>

            </div>
        </>
    )
}

export default ChatWindow;