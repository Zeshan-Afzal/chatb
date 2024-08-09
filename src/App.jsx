import React, { useEffect, useMemo, useState } from 'react'
import {io} from 'socket.io-client'


const socket = io("https://7548-223-123-5-139.ngrok-free.app", {
  extraHeaders: {
      "ngrok-skip-browser-warning": "any-value"
  }
});

function App() {

  const [sendMessage, setSendMessage]=useState("")
  const [messages , setMessage]=useState([])
  const [user, setUser]=useState(null)

  const [name, setName]=useState()





   useEffect(()=>{
    const userName=prompt("enter your name")
    setName(userName)
    socket.emit("connected",name)
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
  
      socket.emit("send",{message:sendMessage, name} )
    }
  setSendMessage("")


  
  }


  return (
    <form onSubmit={handleSubmit}  className=' w-full md:w-[100%] m-auto h-[80vh] flex-col   flex relative '>
    <div className=' w-full  overflow-auto h-full'>
     {messages && messages.length>0 &&  messages.map((msg, i)=>(
      <div className={`message ${msg.id===user ? 'right' : 'left'} `}>
      <span  className=' relative border border-r-red-400'> <p className=' font-semibold text-gray-400 text-[10px] text-left inline absolute top-[40px] left-2  '>{`${msg.name===name?"You":`${msg.name}` }`}</p> {msg.message} </span>

      </div>
     ))}

    </div>


      <div className=' w-full h-[15%]   items-center justify-center self-end flex  '>
      <textarea value={sendMessage} onChange={(e)=>setSendMessage(e.target.value)} name=""  cols={10} rows={2} className=' border  border-gray-200 shadow-lg rounded-l-md  rounded-bl-lg   w-3/4 focus:border-gray-200 focus:outline-none self-end ' id=""></textarea>
       <button type='submit' className=' p-3  rounded-md   self-end w-1/4  text-white font-semibold bg-blue-500'>
        Send
       </button>
      </div>

    </form>
  )
}

export default App
