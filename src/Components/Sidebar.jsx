
// import React,{use, useState} from 'react'
// import { useNavigate, Link } from 'react-router-dom';
// import './Sidebar.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouseChimney,faGaugeHigh,faList, faChevronLeft, faChevronDown,} from '@fortawesome/free-solid-svg-icons';
// const Sidebar = ({update,setUpdate,setUpdate2, name}) => {
//           let [party, setParty] = useState(false)
         
//           let navigate=useNavigate()
//           let click = (p) => {
//             p.preventDefault();
//                  setParty(!party);
//           }
//           let click2=(a)=>{
//             a.preventDefault()
//             setUpdate(true);
//              navigate ("/Add-party"); 
//           }
//           let click3=(a)=>{
//             a.preventDefault()
//             setUpdate2(true);
//              navigate("/party-List")
//           }  
//   return (
//     <div>
//       <div className="sidebar">
//         <div className="logo">
//           <h2>Petrol Pump</h2>    

//         </div>
//          <div className="bar">
//         <div className="background">
       
// <div className="signin-main">

//         <h2 className='signin-person'>{name}</h2>

//   </div> 
//     </div> 
//     </div>    
//         <ul className="side-links-1">
      
//           <li>  <FontAwesomeIcon icon={faGaugeHigh}/><a href="/Dashbord">Dashboard</a></li>
//           <li><a href="/Master" onClick={click}>Master</a>
//          <span>{party ? <FontAwesomeIcon icon={faChevronDown}/>:<FontAwesomeIcon icon={faChevronLeft}/>}</span></li>
         
//         </ul>
//               { party ?
//         <div className="side-links-2">
//           <h3>Party</h3>
//           <ul className="party-links">
//             <li className="c21" onClick={click2}> Add party</li>
//             <li> <a href="#" className="c22" style={{color:"#fff"}} onClick={click3}>Party List</a></li>
//           </ul>
//         </div>
//         : null }
//       </div>
//     </div>
//   )
// }
// export default Sidebar

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { 
  faHouseChimney, 
  faGaugeHigh, 
  faList, 
  faChevronLeft, 
  faChevronDown 
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ update, setUpdate, setUpdate2, name }) => {
  const [party, setParty] = useState(false);
  const [indent, setIndent] = useState(false);
  const [enquiry, setEnquiry] = useState(false);
  const [offer, setOffer] = useState(false);
  const [po, setPo] = useState(false);

  const navigate = useNavigate();

  const toggleSection = (setter) => (e) => {
    e.preventDefault();
    setter(prev => !prev);
  }

  const goTo = (path, updateSetter) => (e) => {
    e.preventDefault();
    if (updateSetter) updateSetter(true);
    navigate(path);
  }

  return (
    <div>
      <div className="sidebar">
        <div className="logo">
          <h2>Petrol Pump</h2>
        </div>

        <div className="bar">
          <div className="background">
            <div className="signin-main">
              <h2 className='signin-person'>{name}</h2>
            </div>
          </div>
        </div>

        <ul className="side-links-1">
          <li>
            <FontAwesomeIcon icon={faGaugeHigh} />
            <a href="/Dashbord">Dashboard</a>
          </li>
          <li>
               <FontAwesomeIcon icon={faCoins} />
              <a href="/Master" onClick={toggleSection(setParty)}>Master</a>
            <span>{party ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronLeft} />}</span>
          </li>
                  {party && (
          <div className="side-links-2">
            <h3>Party</h3>
            <ul className="party-links">
              <li className="c21" onClick={goTo("/Add-party", setUpdate)}>Add Party</li>
              <li><a href="#" className="c22" style={{ color: "#fff" }} onClick={goTo("/party-List", setUpdate2)}>Party List</a></li>
            </ul>
          </div>
        )}

          <li>
            <a href="/Indent" onClick={toggleSection(setIndent)}>Indent</a>
            <span>{indent ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronLeft} />}</span>
          </li>
            {indent && (
          <div className="side-links-2">
         
            <h3>Indent</h3>
            <ul className="party-links">
              <li onClick={goTo("/add-indent")}>Add Indent</li>
              <li onClick={goTo("/indent-list")}>Indent Add</li>
              <li onClick={goTo("/indent-list")}>Indent List</li>
            </ul>
          </div>
        )}

          <li>
            <a href="/Enquiry" onClick={toggleSection(setEnquiry)}>Enquiry</a>
            <span>{enquiry ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronLeft} />}</span>
          </li>
               
        {enquiry && (
          <div className="side-links-2">
            
            <h3>Enquiry</h3>
            <ul className="party-links">
              <li onClick={goTo("/add-enquiry")}>Add Enquiry</li>
              <li onClick={goTo("/enquiry-list")}>Enquiry List</li>
            </ul>
          </div>
        )}


          <li>
            <a href="/Offer" onClick={toggleSection(setOffer)}>Offer</a>
            <span>{offer ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronLeft} />}</span>
          </li>

           {offer && (
          <div className="side-links-2">
            <h3>Offer</h3>
            <ul className="party-links">
              <li onClick={goTo("/add-offer")}>Add Offer</li>
              <li onClick={goTo("/offer-list")}>Offer List</li>
            </ul>
          </div>
        )}

          <li>
            <a href="/PO" onClick={toggleSection(setPo)}>Purchase Order</a>
            <span>{po ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronLeft} />}</span>
          </li>
        </ul>

         {po && (
          <div className="side-links-2">
            <h3>Purchase Order</h3>
            <ul className="party-links">
              <li onClick={goTo("/add-po")}>Add PO</li>
              <li onClick={goTo("/po-list")}>PO List</li>
            </ul>
          </div>
        )}
            

      </div>
    </div>
  );
};

export default Sidebar;
