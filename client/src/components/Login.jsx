import React, { useState } from "react";
import { EyeOff, Eye } from 'lucide-react';
import Dashboard from "./Dashboard";
import { Route, Routes, useNavigate } from "react-router-dom";




const LoginPage = () => {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true)

  const handleShowPassword = () =>{
    setShowPassword(!showPassword)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(email, password)
    const res = await fetch("http://localhost:8080/user/login",{
      headers: {
    "Content-Type": "application/json"
  },
      method:"POST",
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    const data = await res.json()
    if(data.success){
      navigate("/dashboard")
    }   

    
    
  };

  return (
    <>
    <Routes>
      {/* <Route path='/' element={ <App />} /> */}
      <Route path="/dashboard" element={
        <Dashboard />
      }/>
    </Routes>
    <div className="bg-white text-black border m-auto w-1/5 pt-3 pb-5 px-5 rounded-md ">
      <h2 className="py-3 text-center font-bold font-serif  ">Login</h2>
      <form method="post" onSubmit={handleSubmit}
      className="">
        <div>
          <label className="">Email:</label>
          <br />
          <input
          className=" border-b  focus:border-b-2  focus:outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <br />
          <input
          className=" border-b  focus:border-b-2  focus:outline-none"
          type={showPassword? "text":"password"}
          value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" className=" absolute " onClick={handleShowPassword}>

          {showPassword? <EyeOff /> : <Eye />}
          </button>

          
        </div>
        <br />
        <button className="border rounded-md py-2 px-5" type="submit">Login</button>
      </form>
    </div>
          </>
  );
};

export default LoginPage;
