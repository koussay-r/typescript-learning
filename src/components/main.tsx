import React, { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
export default function main() {
  type task=({
    value:string
  })
  const [tasks,setTasks]=useState<task>({
    value:""
  })
  const pusher = new Pusher('c09fb326cffcc4b496bb', {
    cluster: 'eu'
  });
  useEffect(()=>{
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data:any) {
      console.log(data)
    });
    return ()=>{
      channel.unbind_all()
      channel.unsubscribe();
    }
  },[])
  return (
    <div>

    </div>
  )
}
