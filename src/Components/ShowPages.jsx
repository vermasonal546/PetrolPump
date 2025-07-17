import React from 'react'
import { useLocation } from 'react-router-dom';

const ShowPages = () => {
const location=useLocation();
const {id,datas}=location.state||{}
    const party = datas.find(x => x.id === id);
    
   



  return (
    <>
         <form>
           <label>Party Name</label>
            <input value={party.partyName} readonly/>
            
            <label>Address1</label>
            <input value={party.address1} readonly/>
            
            <label>Address2</label>
            <input value={party.address2} readonly/>
            
            <label>City</label>
            <input value={party.city} readonly/>
            
            <label>Bank Name</label>
            <input value={party.bankName} readonly/>
            
            <label>Branch</label>
            <input value={party.branch}readonly/>
            
            <label>Contact Email</label>
            <input value={party.contactEmail}readonly/>
            
            <label>Contact Mobile</label>
            <input value={party.contactMobile} readonly/>
            
            <label>Contact Person</label>
            <input value={party.contactPerson} readonly/>
            
            <label>Email Id</label>
            <input value={party.emailId} readonly/>
            
            <label>GST No</label>
            <input value={party.gstNo} readonly/>
            
            <label>Party ID</label>
            <input value={party.id} readonly/>
            
            <label>IFSC</label>
            <input value={party.ifsc} readonly/>
            
            <label>Mobile No</label>
            <input value={party.mobileNo} readonly/>
                
            <label>State</label>
            <input value="${party.state}" readonly/>
        </form>   
    </>
  )
}

export default ShowPages
