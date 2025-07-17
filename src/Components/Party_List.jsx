import React, {useEffect, useState} from "react"
import axios from "axios"
import './Party_List.css'
import { useNavigate } from "react-router-dom"
import baseUrl from "./Url"
import ShowPages from './ShowPages'
  const Party_List = () => {

     const [data, setdata] = useState([])
     const [select,setselect] = useState(10)
     const [currentpage,setcurrentpage] = useState(1)
     const [searchTerm, setSearchTerm] = useState("");
     const[active,setActive]=useState(false);
     const[set,setSet] = useState(false);
     const [show, setShow] = useState(false);
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
 const print = (id) => {
    const party = data.find(x => x.id === id);
    const printhtml = `
    <html>
    <head>
        <title>Party Details</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
            }
            form {
                max-width: 600px;
                margin: auto;
                display: grid;
                grid-template-columns: 150px 1fr;
                row-gap: 10px;
                column-gap: 20px;
            }
            label {
                font-weight: bold;
                align-self: center;
            }
            input {
                border: 1px solid #ccc;
                padding: 5px 10px;
                font-size: 14px;
                background-color: #f9f9f9;
                width: 100%;
            }
        </style>
    </head>
    <body>
        <h2 style="text-align:center;">Party Information</h2>
        <form>
           <label>Party Name</label>
            <input value="${party.partyName}" readonly/>
            
            <label>Address1</label>
            <input value="${party.address1}" readonly/>
            
            <label>Address2</label>
            <input value="${party.address2}" readonly/>
            
            <label>City</label>
            <input value="${party.city}" readonly/>
            
            <label>Bank Name</label>
            <input value="${party.bankName}" readonly/>
            
            <label>Branch</label>
            <input value="${party.branch}" readonly/>
            
            <label>Contact Email</label>
            <input value="${party.contactEmail}" readonly/>
            
            <label>Contact Mobile</label>
            <input value="${party.contactMobile}" readonly/>
            
            <label>Contact Person</label>
            <input value="${party.contactPerson}" readonly/>
            
            <label>Email Id</label>
            <input value="${party.emailId}" readonly/>
            
            <label>GST No</label>
            <input value="${party.gstNo}" readonly/>
            
            <label>Party ID</label>
            <input value="${party.id}" readonly/>
            
            <label>IFSC</label>
            <input value="${party.ifsc}" readonly/>
            
            <label>Mobile No</label>
            <input value="${party.mobileNo}" readonly/>
                
            <label>State</label>
            <input value="${party.state}" readonly/>
        </form>
    </body>
    </html>`;

    const windowss = window.open('', '', 'width=700,height=800');
    windowss.document.write(printhtml);
    windowss.document.close();
    windowss.focus();
    windowss.print();
    windowss.close();
}
const propsend=(id)=>{
  const datas=data;
  navigate("/ShowPages",{ state:{id,datas}})
 
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
       String(x.partyName).toLowerCase().includes(term) ||
       String(x.mobileNo).includes(term) ||
       String(x.gstNo).toLowerCase().includes(term) ||
       String(x.contactPerson).toLowerCase().includes(term)
     
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
            <button onClick={() => print(x.id)}>🖨️</button>
            <button onClick={()=>propsend(x.id)}>👁️</button>
            
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
