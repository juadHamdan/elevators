import { useState } from "react";

const HandleQueue = () => {
    const [callsQueue, setCallsQueue] = useState([])

    function pushToQueue(floorNum){
        console.log("Queue:", [...callsQueue, floorNum])
        setCallsQueue(callsQueue => [...callsQueue, floorNum])
      }
    
      function shiftFromQueue(){
        console.log("Queue:", callsQueue)
        //setCallsQueue(newQueue)
        setCallsQueue(callsQueue => callsQueue.splice(0, 1))
        return callsQueue[0]
      }

    return { callsQueue, pushToQueue, shiftFromQueue }
} 

export default HandleQueue