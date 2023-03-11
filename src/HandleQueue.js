import { useState } from "react";

const HandleQueue = () => {
    const [queue, setQueue] = useState([])

    function pushToQueue(floorNum){
        setQueue(queue => [...queue, floorNum])
      }
    
      function shiftFromQueue(){
        let firstCall = queue[0]
        setQueue(queue => queue.slice(1))
        return firstCall
      }

    return { missedCallsQueue: queue, pushToQueue, shiftFromQueue }
} 

export default HandleQueue