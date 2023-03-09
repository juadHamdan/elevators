import { useState } from "react";

const HandleQueue = () => {
    const [callsQueue, setCallsQueue] = useState([])

    function addToQueue(floorNum){
        console.log("Queoe:", [...callsQueue, floorNum])
        setCallsQueue([...callsQueue, floorNum])
      }
    
      function removeFromQueue(){
        console.log(callsQueue.slice(1))
        setCallsQueue(callsQueue.slice(1))
      }

    return { addToQueue, removeFromQueue }
} 

export default HandleQueue