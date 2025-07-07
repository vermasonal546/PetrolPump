import React,{useState,useEffect} from 'react'
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import Register from '../Register';
import ChangePassword from '../ChangePassword'
import Party_List from '../Party_List';

const AppContext = ({login,setLogin}) => {
    let[update, setUpdate] = useState(false);
    let[update2,setUpdate2]=useState(false);
  //  let [login, setLogin] = useState(false)
    let[cross,setCross] = useState(false)
    let[logout,setLogout] = useState(true)
    let obj=JSON.parse(localStorage.getItem("loginobj"));
    let name= obj?.name;
    let status=localStorage.getItem("status");
    
    
    console.log(cross);
  return (
    <div>
      <Navbar  update={update} update2={update2}  name={name} status={status} setLogin={setLogin}  setCross={setCross} setLogout={setLogout}/>
      <Sidebar update={update} setUpdate={setUpdate} setUpdate2={setUpdate2} name={name}/>
      <Register lgn={login} setLogin={setLogin}/>
      <ChangePassword cross={cross}  setCross={setCross}/>
    

      
    </div>
  )
}

export default AppContext
