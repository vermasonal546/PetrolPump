import React, { useEffect, useState  } from 'react';
import './Add_party.css';
import axios from 'axios';
import baseUrl from './Url';
const Add_party = () => {

  const [submit, setSubmit] = useState(false);
  const [addpartyobj, setAddpartyobj] = useState({
    id: '',
    partyName: '',
    address1: '', 
    address2: '',
    city: '',
    state: '',
    mobileNo: '',
    emailId: '',
    gstNo: '',
    accountNo: '',
    bankName: '',
    ifsc: '',
    branch: '',
    contactPerson: '',
    contactMobile: '',
    contactEmail: ''

  }) 
  const [error,setError]=useState({})
  
  const change = (e)=>{
  // const {name, value} = e.target;
  //   setAddpartyobj( data => {
  //      return {
  //       id: name === "id" ? value : data.id,
  //       partyName: name === "partyName" ? value : data.partyName,
  //       address1: name === "address1" ? value : data.address1,
  //       address2: name === "address2" ? value : data.address2,
  //       city: name === "city" ? value : data.city,
  //       state: name === "state" ? value : data.state,
  //       mobileNo: name === "mobileNo" ? value : data.mobileNo,
  //       emailId: name === "emailId" ? value :data.emailId,
  //       gstNo: name === "gstNo" ? value : data.gstNo,
  //       accountNo: name === "accountNo" ? value : data.accountNo,
  //       bankName: name === "bankName" ? value : data.bankName,
  //       ifsc: name === "ifsc" ? value : data.ifsc,
  //       branch: name === "branch" ? value : data.branch,
  //       contactPerson: name === "contactPerson" ? value : data.contactPerson,
  //       contactMobile: name === "contactMobile" ? value : data.contactMobile,
  //       contactEmail: name === "contactEmail" ? value : data.contactEmail

  //   } } 
  //   );  
     setAddpartyobj({...addpartyobj,[e.target.name]: e.target.value})
     setError({...error,[e.target.name]:""})
  }  
  const handleSubmit = (e) => {
  e.preventDefault();
  axios.post(`${baseUrl}/submit`, addpartyobj)
    .then(x => {
      const res = x.data;
      console.log("Server response:", res);

      if (res.data) {
        // Successful insert
        setAddpartyobj({
          id: '', partyName: '', address1: '', address2: '',
          city: '', state: '', mobileNo: '', emailId: '', gstNo: '',
          accountNo: '', bankName: '', ifsc: '', branch: '',
          contactPerson: '', contactMobile: '', contactEmail: ''
        });
        alert("Data Added Sucessfully")
        window.location.reload()
        setError({});
      } else if (res.error) {
        const errors = {};
        res.error.forEach(err => {
          errors[err.input] = err.error;
        });
        setError(errors);
      }
    })
    .catch(err => {
      console.error("Submission error:", err);
      alert("Something went wrong!");
    });
}

   console.log(error)
  return (

    <div className="Addform">
      <h2 className='tittle'>Add Party</h2>
      <form className='form-child'>
        <div className='form-group'>
          <label  >Party Name <span id="asterisk"> *</span ></label>
          <input type="text" name='partyName'value={addpartyobj.partyName} onChange={change} required />
          {error.partyName && <p style={{color:"red"}}>{error.partyName}</p>}
        </div>
        <div className='form-group'>
          <label >Address 1 <span id="asterisk"> *</span ></label>
          <input type="text"name='address1' value={addpartyobj.address1} onChange={change} required />
        </div>
        <div className='form-group'>
          <label >Address 2 <span  id="asterisk"> *</span ></label>
          <input type="text" name='address2' value={addpartyobj.address2}  onChange={change} required />
        </div>
        <div className='form-group'>
          <label >City <span id="asterisk"> *</span ></label>
          <input type="text" name="city" value={addpartyobj.city}  onChange={change} required />
        </div>

        <div className='form-group'>
          <label >State <span id="asterisk"> *</span ></label>
          <input type="text" name="state" value={addpartyobj.state} onChange={change} required />
        </div>
        <div className='form-group'>
          <label>Mobile No for SMS <span id="asterisk"> *</span></label>
          <input type="tel" name="mobileNo" value={addpartyobj.mobileNo} onChange={change} required />
           {error.mobileNo && <p style={{color:"red"}}>{error.mobileNo}</p>}
        </div>
        <div className='form-group'>
          <label >Email ID <span id="asterisk"> *</span ></label>
          <input type="email"  name='emailId' value={addpartyobj.emailId} onChange={change} required />
           {error.emailId && <p style={{color:"red"}}>{error.emailId}</p>}
        </div>
        <div className='form-group'>
          <label >GST No <span id="asterisk"> *</span  ></label>
          <input type="text" name='gstNo' value={addpartyobj.gstNo} onChange={change} required />
        </div>

        <div className='form-group'>
          <label>Account No</label>
          <input type="text"  name='accountNo' value={addpartyobj.accountNo} onChange={change} />
        </div>
        <div className='form-group'>
          <label>Bank Name</label>
          <input type="text" name='bankName' value={addpartyobj.bankName} onChange={change} />
        </div>
        <div className='form-group'>
          <label>IFSC</label>
          <input type="text" name='ifsc' value={addpartyobj.ifsc} onChange={change} />
        </div>
        <div className='form-group'>
          <label>Branch</label>
          <input type="text"  name='branch' value={addpartyobj.branch} onChange={change}/>
        </div>

        <div className='form-group'>
          <label>Contact Person</label>
          <input type="text" name='contactPerson' value={addpartyobj.contactPerson} onChange={change} />
           {error.contactPerson && <p style={{color:"red"}}>{error.contactPerson}</p>}
        </div>
        <div className='form-group'>
          <label>Mobile/Landline No</label>
          <input type="tel"  name='contactMobile' value={addpartyobj.contactMobile} onChange={change}/>
           {error.contactMobile && <p style={{color:"red"}}>{error.contactMobile}</p>}
        </div>
        <div className='form-group'>
          <label>Email ID</label>
          <input type="email"  name='contactEmail' value={addpartyobj.contactEmail} onChange={change}/>
           {error.contactEmail && <p style={{color:"red"}}>{error.contactEmail}</p>}
        </div>

        <div className="full-width">
         <button type="submit" className='button' onClick={handleSubmit}>Submit</button>

        </div>
      </form>
    </div>
  );
};

export default Add_party;