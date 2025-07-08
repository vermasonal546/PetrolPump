import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import baseUrl from './Url';

const Edit = () => {
  const location=useLocation();
    const id= location.state?.partyid;
    console.log(id);
    const navigate=useNavigate();
    const[recivedData,setRecivedData]=useState({});
    const[submit,setSubmit]=useState(false);  
    
    const change = (e) => {
  const { name, value } = e.target;
  setRecivedData(prev => ({
    ...prev,
    [name]: value
  }));
};
    useEffect(()=>{
      
        if(id)
        {
          axios.get(`${baseUrl}/fetch/${id}`).then(res=> setRecivedData(res.data)

        )
        }
        console.log(recivedData);
        
    },[])
    useEffect(()=>
    {
    
      if(submit)
    {
      axios.post(`${baseUrl}/update`,recivedData)
      
    }
    },[submit]
)
  return (
    <div className='Addform'>
       
       <form className='form-child'>
       
        <div className='form-group'>
          <label  >Party Name <span id="asterisk"> *</span ></label>
          <input type="text" name='partyName'value={recivedData.partyName} onChange={change} required />
        </div>
        <div className='form-group'>
          <label >Address 1 <span id="asterisk"> *</span ></label>
          <input type="text"name='address1' value={recivedData.address1} onChange={change} required />
        </div>
        <div className='form-group'>
          <label >Address 2 <span  id="asterisk"> *</span ></label>
          <input type="text" name='address2' value={recivedData.address2} onChange={change} required />
        </div>
        <div className='form-group'>
          <label >City <span id="asterisk"> *</span ></label>
          <input type="text" name="city" value={recivedData.city} onChange={change} required />
        </div>

        <div className='form-group'>
          <label >State <span id="asterisk"> *</span ></label>
          <input type="text" name="state" value={recivedData.state} onChange={change} required />
        </div>
        <div className='form-group'>
          <label>Mobile No for SMS <span id="asterisk"> *</span></label>
          <input type="tel" name="mobileNo" value={recivedData.mobileNo} onChange={change} required />
        </div>
        <div className='form-group'>
          <label >Email ID <span id="asterisk"> *</span ></label>
          <input type="email"  name='emailId' value={recivedData.emailId} onChange={change} required />
        </div>
        <div className='form-group'>
          <label >GST No <span id="asterisk"> *</span  ></label>
          <input type="text" name='gstNo' value={recivedData.gstNo} onChange={change} required />
        </div>

        <div className='form-group'>
          <label>Account No</label>
          <input type="text"  name='accountNo' value={recivedData.accountNo} onChange={change} />
        </div>
        <div className='form-group'>
          <label>Bank Name</label>
          <input type="text" name='bankName' value={recivedData.bankName} onChange={change} />
        </div>
        <div className='form-group'>
          <label>IFSC</label>
          <input type="text" name='ifsc' value={recivedData.ifsc} onChange={change} />
        </div>
        <div className='form-group'>
          <label>Branch</label>
          <input type="text"  name='branch' value={recivedData.branch} onChange={change}/>
        </div>

        <div className='form-group'>
          <label>Contact Person</label>
          <input type="text" name='contactPerson' value={recivedData.contactPerson} onChange={change} />
        </div>
        <div className='form-group'>
          <label>Mobile/Landline No</label>
          <input type="tel"  name='contactMobile' value={recivedData.contactMobile} onChange={change}/>
        </div>
        <div className='form-group'>
          <label>Email ID</label>
          <input type="email"  name='contactEmail' value={recivedData.contactEmail} onChange={change}/>
        </div>

        <div className="full-width">
          <button type="submit" className='button' onClick={(e)=> {
            e.preventDefault();
            setSubmit(true)
            console.log("Form submitted", recivedData);
            navigate("/party-List");
            
          }}>Edit</button>
        </div>
      </form>
    </div>
  )
}

export default Edit
