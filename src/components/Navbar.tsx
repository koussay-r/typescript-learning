import axios from 'axios';
import React,{useState} from 'react'
import {BsPenFill} from "react-icons/bs"
export default function Navbar() {
  type task={
    value:string;
  }
    const [value,setValue]=useState<string>("")
  const [tasks,setTasks]=useState<task>({
    value:value
  })
    const hanlecreateList=():void=>{
        if(value.length!==0){
           axios.post("http://localhost:9000",tasks)
        }
        else{
            alert("enter something than add it to the list")
        }
    }
    const handleValue=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(e.target.value)
    }
  return (
    <div className='flex pt-3 px-5 border border-transparent border-b-gray-500 shadow pb-3 justify-between'>
        <img src={require("./../assets/logo.png")} alt="" className='w-[50px]'/>
        <input value={value} onChange={handleValue} type={"text"} placeholder="Write a task" className=" bg-slate-100 pl-3 border border-blue-500 rounded-md w-[50%]" />
        <BsPenFill size={35} onClick={hanlecreateList} className=" mt-1 cursor-pointer text-blue-600"/>
    </div>
  )
}
