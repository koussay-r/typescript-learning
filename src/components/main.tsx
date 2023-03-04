import React, { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import axios from 'axios'
import {RiDeleteBin2Line} from 'react-icons/ri'
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
        console.log(tasks)
      }catch(err){
        console.log(err);
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
      console.log(data)
      setTasks([...tasks,data])

    });
    return ()=>{
      channel.unbind_all()
      channel.unsubscribe();
    }
  },[tasks])
  const hanldeDelete=async(_id:string)=>{
    try{
      await axios.delete(`http://localhost:9000/${_id}`)
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      {
        tasks.map(item=>{
          return (
            <div  key={item._id}>

              {
                item._id.length!==0&&        
              <div className="w-[50%] mx-auto pt-[30px]  flex justify-center bg-white border h-[100px] shadow mt-2 mb-2 rounded-md" >
                <p className='text-center pr-3 '>{item.value}</p><RiDeleteBin2Line onClick={()=>hanldeDelete(item._id)} className='mt-[6px] cursor-pointer'/>
              </div>
            }
            </div>
          )
        })
      }
    </div>
  )
}
