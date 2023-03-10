import { useState } from "react";

const HandleQueue = () => {
    const [callsQueue, setCallsQueue] = useState([])

    function pushToQueue(floorNum){
        console.log("Queue:", [...callsQueue, floorNum])
        setCallsQueue([...callsQueue, floorNum])
      }
    
      function shiftFromQueue(){
        const newQueue = [...callsQueue]
        const firstItem = newQueue.shift()
        console.log("Queue:", newQueue)
        setCallsQueue(newQueue)
        return firstItem
      }

    return { callsQueue, pushToQueue, shiftFromQueue }
} 

export default HandleQueue