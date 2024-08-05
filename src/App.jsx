import React, { useEffect, useMemo, useState } from 'react'
import {io} from 'socket.io-client'


const socket= io("https://chats-tau.vercel.app")
function App() {

  const [sendMessage, setSendMessage]=useState("")
  const [messages , setMessage]=useState([])
  const [user, setUser]=useState(null)

  const [name, setName]=useState()





   useEffect(()=>{
    
    
   socket.on("hello", (id)=>{
    setUser(id)

   })

 
    socket.on("recieve", (msg)=>{
        setMessage((prevMessages)=>([...prevMessages,  msg]))
      
   })

    return ( ()=>{socket.off("send")
          socket.off("recieve")})

   },[ ])


   const handleSubmit=(e)=>{
    e.preventDefault()
     
    if(sendMessage){
  
      socket.emit("send",sendMessage )
    }
  setSendMessage("")

  
    console.log(messages)
  
  }


  return (
    <form onSubmit={handleSubmit}  className=' w-full md:w-[70%] m-auto h-[80vh] flex-col   flex relative border border-red-500'>
    <div className=' w-full  overflow-auto h-full'>
     {messages && messages.length>0 &&  messages.map((msg, i)=>(
      <div className={`message ${msg.id===user ? 'right' : 'left'}`}>
      <span >{msg.message} {msg.id}</span>

      </div>
     ))}

    </div>


      <div className=' w-full h-[25%]   self-end flex  md:gap-2'>
      <textarea value={sendMessage} onChange={(e)=>setSendMessage(e.target.value)} name=""  cols={10} rows={2} className=' border  border-gray-200 shadow-lg rounded-lg  w-3/4  self-end ' id=""></textarea>
       <button type='submit' className=' p-3  rounded-md   self-end  text-white font-semibold bg-blue-500 w-18 md:w-36 '>
        Send
       </button>
      </div>

    </form>
  )
}

export default App