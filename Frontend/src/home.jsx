import React, { useEffect, useState } from 'react'
import './App.css'

function Home() {
    const [text ,settext] = useState('')
    const [data,setdata] = useState([])
    const [edit,setedit] = useState('')
    const [eid, seteid ] = useState(null)


    useEffect(()=>{
        get()
    },[])

  async function get() {
  const res=  await fetch('https://to-do-backende.vercel.app/test',
      {
        method: 'GET',
          headers: { "Content-Type": "application/json" },
      }
    )
    const data = await res.json();
console.log(data);
setdata(data)
  }



async function postdata() {
     if(text == "") return
    const res = await fetch('https://to-do-backende.vercel.app/post',{
        method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            todos:text
         })
    })
      const data = await res.json();
  console.log(data);
  settext('')
  get()
}


async function update() {
    const res = await fetch(`https://to-do-backende.vercel.app/update/${eid}`,{
        method:'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({todos: edit})
    })
    const result = await res.json();
console.log(result)
setedit('')
seteid('')

get()
}

async function delet(id) {
    const res = await fetch(`https://to-do-backende.vercel.app/delete/${id}`,{
        method: 'DELETE',
     
    })
      const msg = await res.json();
  console.log(msg);

  get()
}

async function delteall() {
    const res = await fetch('https://to-do-backende.vercel.app/delete-all',{
        method:'DELETE'
    })
    const mes = res.json()
    console.log(mes)

    get()
}

  return (
    <div>

      <header>My Todo App</header>

<div className="main">

  <div className="input-row">
    <input value={edit ? edit : text} onChange={(e)=> edit ? setedit(e.target.value): settext(e.target.value)} type="text" placeholder="Add new task..."/>
      {edit ? (
    <button className="btn" onClick={update}>Update</button>
  ) : (
    <button className="btn" onClick={postdata}>Add</button>
  )}
  <button className='btn' onClick={ delteall}>Clear All</button>
  </div>

  <div className="todo-section">
    <h3>Your Tasks</h3>

{data.length > 0  ? (
    data.map((item)=>(
        <div className="item" key={item._id}>
      <span className="text">{item.todos}</span>
      <div className="btnn">
<button onClick={()=>{
    setedit(item.todos);
     seteid(item._id);
      settext(""); 
}} >Edit</button>
<button  onClick={()=> delet(item._id)} style={{background:"red"}}>Delete</button>

      </div>
    </div>
))
):(
        <div className="item" >
<div className='paradiv'>     <p className='para' >No Task Found</p></div>
    </div>
)}

 
   
  </div>

</div>
    </div>
  )
}

export default Home;
