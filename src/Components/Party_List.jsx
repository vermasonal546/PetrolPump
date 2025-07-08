import React, {useEffect, useState} from "react"
import axios from "axios"
import './Party_List.css'
import { useNavigate } from "react-router-dom"
import baseUrl from "./Url"

  const Party_List = () => {

     const [data, setdata] = useState([])
     const [select,setselect] = useState(10)
     const [currentpage,setcurrentpage] = useState(1)
     const [searchTerm, setSearchTerm] = useState("");
     const[active,setActive]=useState(false);
     const[set,setSet] = useState(false);
     const value=localStorage.getItem("login")
     useEffect(()=>{
    if(value)
    {
      setSet(true)
    }
     },[value])
     const itemperpage = select
     const lastitem = currentpage*itemperpage
     const firstitem = lastitem - itemperpage
     const currentitem = data.slice(firstitem,lastitem)
     const totalitem = Math.ceil(data.length/itemperpage)
     let navigate= useNavigate();
      useEffect(()=>{
      
       if(value)
       {
        
         axios.get(`https://petrol-pump-store-production.up.railway.app/fetchAll`).then(res =>{
          // const finaldata= res.data.map((item, index) => ({...item, id: index + 1, isActive: true }));
          setdata(res.data)

        })
       }
       
        
     })
      
     const pagenumber =(p)=>{
           setselect(p.target.value)
     }
     const previous = ()=>{
        if (currentpage>=1 )
        {
            setcurrentpage(a=>a+1)
        }
     }
     const next = ()=>
     {
       if(currentpage<=totalitem)
       {
         setcurrentpage(a=>a-1)
       }
     }
    const activests = (id) => {
  const updated = data.map(item => {
    if (item.id === id) {
      const updatedItem = {
        ...item,
        active: item.active === 0 ? 1 : 0,  
      };
 
      axios.post(`${baseUrl}/update`, updatedItem)
        .then(() => {
          console.log("Updated status in DB");
        })
        .catch((err) => {
          console.error("Failed to update status in DB", err);
        });

      return updatedItem;
    }
    return item;
  });

  setdata(updated);
};

const remove=(id)=>{
      if( confirm("Are you sure you want to delete this party?") )
      {
         axios.delete(`${baseUrl}/delete/${id}`)
        //  alert("Party deleted successfully");
      }
      //  else{
      //   alert("Party not deleted");
      //  }
}
  return (
    <>
  {
    set ?  <div className="Main-container">
        <h4 className="party-heading">Party List</h4>
        <div className="table-top"> 
             <div> Show <select name="" id="" onChange={pagenumber}> 
            
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
        </select> Entries
        </div>
         <div className="search-container">
      <label htmlFor="search">Search:</label>
      <input 
              type="text" 
              id="search"
              placeholder="Type something..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
        </div>
        <div className="table-out">
 <table className="table-tab">    
           <thead>  
                  <tr>
                    <td>S.No</td>
                    <td>Party Name</td>
                    <td>Contact No</td>
                    <td>GST No</td>
                    <td>Status</td>
                    <td>Action</td>
                </tr>
           </thead>
           <tbody>
  {
    data.filter(x => {
    const term = searchTerm.toLowerCase();
    return (
      String(x.id).includes(term) ||
      String(x.partyName).toLowerCase().includes(term) ||
      String(x.address1).toLowerCase().includes(term) ||
      String(x.address2).toLowerCase().includes(term) ||
      String(x.city).toLowerCase().includes(term) ||
      String(x.state).toLowerCase().includes(term) ||
      String(x.mobileNo).includes(term) ||
      String(x.emailId).toLowerCase().includes(term) ||
      String(x.gstNo).toLowerCase().includes(term) ||
      String(x.accountNo).toLowerCase().includes(term) ||
      String(x.bankName).toLowerCase().includes(term) ||
      String(x.ifsc).toLowerCase().includes(term) ||
      String(x.branch).toLowerCase().includes(term) ||
      String(x.contactPerson).toLowerCase().includes(term) ||
      String(x.contactMobile).includes(term) ||
      String(x.contactEmail).toLowerCase().includes(term)
    );
  })

      .slice(firstitem, lastitem)
      .map((x) => (
        <tr id="table-color" key={x.id}>
          <td>{x.id}</td>
          <td>{x.partyName}</td>
          <td>{x.mobileNo}</td>
          <td>{x.gstNo}</td>
          <td style={{ color: x.active === 1 ? "green" : "red" }}>
            {x.active === 1 ? "Active" : "InActive"}
          </td>
          <td>
            <button onClick={() => navigate("/editparty", { state: { partyid: x.id } })}>✏️</button>
            <button onClick={(e) => {
              e.preventDefault();
              activests(x.id);
              setActive(!active);
              setSet(true);
            }}>🚫</button>
            <button onClick={() => remove(x.id)}>❌</button>
          </td>
        </tr>
      ))
  }
</tbody>

        </table>
        </div>
        <div className="table-footer">
               <div className="show-pages">
                      showing pages{firstitem + 1} out of {totalitem} 
               </div>
              <div className="page-numbers">
  <button onClick={() => setcurrentpage(prev => Math.max(prev - 1, 1))}>
    Previous
  </button>

  {[1, 2, 3, 4, 5, 11].map((num) => (
    <p
      key={num}
      onClick={() => setcurrentpage(num)}
      style={{
        cursor: "pointer",
        fontWeight: currentpage === num ? "bold" : "normal",
        textDecoration: currentpage === num ? "underline" : "none",
       
      }}
    >
      {num}
    </p>
  ))}

  <p style={{ margin: "0 6px" }}>...</p>

  <button onClick={() => setcurrentpage(prev => Math.min(prev + 1, totalitem))}>
    Next
  </button>
</div>

        </div>
    </div> :"ś"
  }
  </>
  )
}
export default Party_List
