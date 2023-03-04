import React, { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import axios from 'axios'
import {RiDeleteBin2Line} from 'react-icons/ri'
export default function Main() {
  const [idDelete,setIddelete]=useState<string>("")
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
  const [PrevTasks,setPrevTasks]=useState<data[]>([{
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
        console.log(err);
      }
    }
    hanldePreviousTasks()
  },[])
  useEffect(()=>{
    const hnaldePrevArray=()=>{
      tasks.map(item=>{
        return(
          <>
          {item._id!==idDelete&&
            setPrevTasks([...PrevTasks,item])
          }
          </>
        )
      })
    }
    const pusher = new Pusher('c09fb326cffcc4b496bb', {
      cluster: 'eu'
    });
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data:data) {
      console.log(data)
      if(data._id===""){
        hnaldePrevArray()
        setTasks(PrevTasks)
        console.log(tasks)
      }
      else{
        setTasks([...tasks,data])
        console.log(tasks)

      }

    });
    return ()=>{
      channel.unbind_all()
      channel.unsubscribe();
    }
  },[tasks,idDelete,PrevTasks])
  const hanldeDelete=async(_id:string)=>{
    try{
      setIddelete(_id)
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
