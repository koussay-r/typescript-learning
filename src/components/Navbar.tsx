import React,{useState} from 'react'
import {BsPenFill} from "react-icons/bs"
export default function Navbar() {
    const [tasks,setTasks]=useState<string[]>([])
    const [value,setValue]=useState<string>("")
    const hanlecreateList=():void=>{
        if(value.length!==0){
            setTasks([...tasks,value])
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
        <input value={tasks} onChange={handleValue}type={"text"} placeholder="Write a task" className=" bg-slate-100 pl-3 border border-blue-500 rounded-md w-[50%]" />
        <BsPenFill size={35} onClick={hanlecreateList} className=" mt-1 cursor-pointer text-blue-600"/>
    </div>
  )
}
