import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from './Url';
const Register = ({lgn}) => {
  const [signin, setsignin] = useState(false);      
  const [signinobj, setsigninobj] = useState({
      userId :  "",
      name: "",
      surname : "",
      email :  "",
      password: "",
      phone_number : ""
  })
  const navigate=useNavigate();
    const signinData = (s) => {
      const {name,value}=s.target
      setsigninobj(i =>{
        return {
                     userId: name === "userId"? value:i.userId,
                     name: name === "name"? value:i.name,
                      surname: name === "surname"? value:i.surname,
                      email: name === "email"? value:i.email,
                     password: name === "password"? value:i.password,
                     phone_number: name === "phone_number"? value:i.phone_number
      }
      })
     
    } 
   const  click =(e)=>{
   axios.post(`${baseUrl}/register`, signinobj)
      alert("Submission received! We’ll be in touch soon");
      setsignin(true);
   }
     
  const [login, setLogin] = useState(false);
  const[login1, setLogin1] = useState(false);
  // const[loginobj, setLoginobj] = useState({
  const[loginobj, setLoginobj] = useState({});
 const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
console.log(login1);

  const change1=(e)=>{
    setEmail(e.target.value);
 
  }
  const change2=(e)=>{
    setPassword(e.target.value);
  }
  const click1=(e)=>{
     //  e.preventDefault();
    axios.get(`${baseUrl}/login?email=${email}&password=${password}`).then(res=>{
       setLoginobj(res.data);
       console.log(baseUrl);

       console.log("click one excuted");
       
        localStorage.setItem("loginobj", JSON.stringify(res.data));
        localStorage.setItem("status",true);
        localStorage.setItem("login",true)
        navigate("/home")
          //  window.location.reload();
          
    })
   
      }   
  return (

   <>
             {
            lgn ? 
             <div className='register-container'>

            <div className="loginform">
              <div className="login-page-tag">
              <h2>Login Page</h2>
              </div>
              <form action="" className='login'>
                <div className="login-email">
                <label htmlFor="">Email</label>
                <input type="email" name='email' value={email} onChange={change1} required />
                </div>
                <div className="login-password">
                <label htmlFor="">Password</label>
                <input type="password" name='password' value={password} onChange={change2} required />
                </div> 
                <button type='submit' className='login-btn-2' onClick={click1}>Login & Continue</button>
              </form>   </div> 
            </div> : ""  
      //        <div >
              
      //         <h2 className='registration-tag'>Registration Page</h2>
      // <form className='register-form' onSubmit={click}> 
        
      //   <label> Name </label>
      //   <input type="text" name='name' value={signinobj.name} onChange={signinData} required />
      //   <label> Surname</label>
      //   <input type="text" name='surname' value= {signinobj.surname}onChange={signinData} required />
      //   <label> Email </label>
      //   <input type="email" name='email' value= {signinobj.email} onChange={signinData} required />
      //   <label> Phone Number </label>
      //   <PhoneInput className='phone-input' country={'in'} name='phone_number' value={signinobj.phone_number}  onChange={on => {setsigninobj(o => ( {...o,phone_number:on}))} } required />
      //   <label> Password</label>
        
      //   <input type='password' name='password' value={signinobj.password}  onChange={signinData}/> 
      //  <button type='submit'  className='register-btn' onClick={click}>Register</button>
      // <button onClick={()=>setLogin1(true)} className='login-btn'>Login</button>
      // </form></div>
      
          }   
   </>
  )
}

export default Register
