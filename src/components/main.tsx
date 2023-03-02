import React, { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import axios from 'axios'
export default function Main() {
  type data={
    _id:string,
    value:string,
    __v:string
  }
  const [tasks,setTasks]=useState<data[]>([{
    _id:"",
    value:"",
    __v:""

  }])
  useEffect(()=>{
    const hanldePreviousTasks=async()=>{
      try{
        const res=await axios.get("http://localhost:9000")
        setTasks(res.data);
      }catch(err){
        console.log(err)
      }
    }
    hanldePreviousTasks()
  },[])
  useEffect(()=>{
    const pusher = new Pusher('c09fb326cffcc4b496bb', {
      cluster: 'eu'
    });
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data:data) {
      setTasks([...tasks,data])
      console.log(tasks)

    });
    return ()=>{
      channel.unbind_all()
      channel.unsubscribe();
    }
  },[tasks])
  return (
    <div>

    </div>
  )
}
