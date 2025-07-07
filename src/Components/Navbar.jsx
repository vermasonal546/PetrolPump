import React,{useEffect, useRef, useState} from 'react'
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney,faGaugeHigh,faList} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';import { faGauge } from '@fortawesome/free-solid-svg-icons';
import js from '@eslint/js';
import Register from './Register';
const Navbar = ({update, update2, name, status,setCross, setLogin, setLogout }) => { 
 
  let navigate = useNavigate()
  const location = useLocation();
   let [show,setShow] = useState(false);
   let[down,setDown]=useState(false)
   
   const clickscreen=useRef(null)
   
   const click = (e) => {
    e.preventDefault();
    navigate("/Add-party")
   }
   const lgt=()=>{

    localStorage.removeItem("loginobj");
    localStorage.removeItem("status");
    localStorage.removeItem("login")
    // navigate("/register");
    setLogout(false);
    setShow(false);
     window.location.reload();
   }
   useEffect(()=>{
    const  outClick=(e)=>{
      if(clickscreen.current && !clickscreen.current.contains(e.target))
      {
        setShow(false)
      }
    }
    document.addEventListener('mousedown',outClick);
    return()=>document.removeEventListener('mousedown',outClick)
   },[])
  return (
   
      <div className='parant-navbar'>
           
                    <div className='child-navbar1'> 

             <div className="navbar-1">
              <span className='list-icon'> <FontAwesomeIcon icon={faList}/> </span>
             </div>
                 <div className="navbar-2" ref={clickscreen}>
                      <ul>
                             <li>{status ? <Link onClick={()=>{setShow(!show)}}>{name}</Link> : <Link onClick={()=> {setLogin(true)}}>SignIn</Link>}</li>

                             <li><Link to="/home"><span style={{ paddingRight:"5px"}}><FontAwesomeIcon icon={faHouseChimney}/></span></Link></li>
                      </ul>

                       {
                        // login-page for 

             show ?  <div className="signin-subpage" >
              <button onClick={()=>{navigate("/ChangePassword"),setCross(true)}}>Change Password</button>
              <button onClick={lgt}>SignOut</button>
            </div> : ""
          }  
            </div>
        </div>   
          <div className='child-navbar2'> 

             <div className="navbar-3">
                <h2>{update ? "Add Party": update2 ? "Party List" : ""}</h2>
             </div>
                 <div className="navbar-4">
                 
                      <ul>  
                             <li className='dashdb'> <FontAwesomeIcon icon={faGaugeHigh}/> </li>
                             <li><a href="#">Home</a></li>
                             <li><a href="#">Master</a></li>
                             <li><a href="/party"onClick={click}> Party</a></li>
                             <li><a href="/party-List">Party List</a></li>
                      </ul>
                
            </div>
        </div>

     </div>
  )
}

export default Navbar;
