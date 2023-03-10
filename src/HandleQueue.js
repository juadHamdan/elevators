import { useState } from "react";

const HandleQueue = () => {
    const [callsQueue, setCallsQueue] = useState([])

    function pushToQueue(floorNum){
        //console.log("Queue:", [...callsQueue, floorNum])
        setCallsQueue(callsQueue => [...callsQueue, floorNum])
      }
    
      function shiftFromQueue(){
        let firstCall = callsQueue[0]
        console.log("Removed:", firstCall, "Queue:", callsQueue.slice(1))
        setCallsQueue(callsQueue => callsQueue.slice(1))
        return firstCall
      }

    return { callsQueue, pushToQueue, shiftFromQueue }
} 

export default HandleQueue