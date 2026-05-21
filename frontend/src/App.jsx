import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import {MyContext} from "./MyContext.jsx"
import { useState, useEffect} from 'react';
import { v1 as uuidv1 } from 'uuid';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginForm from "./LoginForm.jsx"; 
import Dashboard from "./Dashboard.jsx" ;
import SignupForm from "./SignupForm.jsx";
import DeleteAccount from "./DeleteAccount.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx";
import { BACKEND_URL } from "./config";
function App() {

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [CurrThreadId, setCurrThreadId] = useState(uuidv1());
  // stores all seq of msg and reply
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat]= useState(true);

  // show all thread
  const [allThread, setAllThread]= useState([]);

  // user
  const[user, setUser]= useState(null);
  const[loading, setLoading]= useState(true);

  const providerValue= {
    prompt, setPrompt, 
    reply, setReply,
    CurrThreadId, setCurrThreadId,
    prevChats, setPrevChats,
    newChat, setNewChat,
    allThread, setAllThread,
    user, setUser,
    loading, setLoading,
  };

  useEffect(()=>{
    const profileCheck= async()=>{
      try{
        const response= await fetch(`${BACKEND_URL}/auth/profile`, {credentials:"include"});

        const data= await response.json();

        console.log("PROFILE DATA", data);

        if(data.success){
          setUser(data.user);
        }
      }catch(err){
        setUser(null);
      }finally{
        setLoading(false);
      }
    }
    profileCheck();
  },[])
  
  // console.log("User", user)
  return (
    <>
        <MyContext.Provider value= {providerValue}>

          <BrowserRouter>
            <Routes>
              
              <Route
                path="/login"
                element={
                  loading
                  ? <h1>Loading...</h1>
                  : user
                    ? <Navigate to="/app" />
                    : <LoginForm />
                }
              />

              <Route path="/dashboard" element={<Dashboard/>}></Route>
              
              <Route
                path="/signup"
                element={
                  loading
                  ? <h1>Loading...</h1>
                  : user
                    ? <Navigate to="/app" />
                    : <SignupForm/>
                }
              />

              <Route path="/delete-account" 
                element={
                  <ProtectedRoute>
                    <DeleteAccount/>
                  </ProtectedRoute>
                }>
              </Route>
              
              <Route path="/app" element={

                <ProtectedRoute >
                  <div className="app">
                      <Sidebar/>
                      <ChatWindow/>
                  </div>

                </ProtectedRoute>
              }>
              </Route>

              <Route path="*" element={<Navigate to="/dashboard" />}></Route>
            
            </Routes>
          </BrowserRouter>

        
        </MyContext.Provider>
      
    </>
  )
}

export default App
