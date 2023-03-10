import './App.css';
import { useState, useEffect } from 'react'
import HandleQueue from './HandleQueue'
import HandleElevators from './HandleElevators';
import HandleBtnsClassNames from './HandleBtnsClassNames';

import Elevator from './components/elevator/Elevator';
import FloorsLabels from './components/FloorsLabels';
import ElevatorsController from './components/ElevatorsController';
import ElevatorsForm from './components/ElevatorsForm';

import { ARRIVAL_TIMEOUT, ElevatorStatuses } from './constants'
import { initialNumOfFloors, initialNumOfElevators } from './constants'

function App() {
  const [numOfFloors, setNumOfFloors] = useState(initialNumOfFloors)
  const [numOfElevators, setNumOfElevators] = useState(initialNumOfElevators)
  const { callsQueue, pushToQueue, shiftFromQueue } = HandleQueue()
  const { getFloorNumOfElevator, updateElevatorOccupation, updateFloorNumOFElevator, identifyClosestFreeElevator } = HandleElevators()
  const { btnsClassNames, setBtnClassName } = HandleBtnsClassNames()
  const [callsCounter, setCallsCounter] = useState(0)


  function onElevatorReady(elevatorNum, floorNum) {
    updateFloorNumOFElevator(elevatorNum, floorNum)
    updateElevatorOccupation(elevatorNum, false)
    setBtnClassName(floorNum, ElevatorStatuses.Default)

    shiftFromQueue()
    setCallsCounter(callsCounter => callsCounter - 1)
  }

  function onElevatorArrival(elevatorNum, floorNum) {
    setBtnClassName(floorNum, ElevatorStatuses.Arrived)

    setTimeout(() => {
      onElevatorReady(elevatorNum, floorNum)
    }, ARRIVAL_TIMEOUT)
  }

  function onCall(floorNum) {
    pushToQueue(floorNum)
    //doesn't update !!!!!!!!!!
    let elevatorNum = identifyClosestFreeElevator(floorNum)
    if (elevatorNum == null) {
      if(callsQueue.find(floor => floor === floorNum)){
        console.log("Push error")
        return
      }
      pushToQueue(floorNum)
      return
    }

    setCallsCounter(callsCounter => callsCounter + 1)
    updateFloorNumOFElevator(elevatorNum, floorNum)
    updateElevatorOccupation(elevatorNum, true)
  }

/*
  useEffect(() => {
    var queueInterval = null
    //var callsQueueLen = callsQueue.length

    function tryToCallAvailableElevator() {
      console.log("callsQueue:", callsQueue)

      if (callsCounter < numOfElevators) {
        //implement calls queue length here

        const queueFloor = shiftFromQueue()
        
        if (callsQueue === 0) {
          console.log("CLEAR INTERVAL")
          clearInterval(queueInterval)
        }
        
        //console.log(callsQueue, callsQueue.length)

        onCall(queueFloor)
      }
    }

    if (callsQueue.length > 0) {
      //implement on all floors choden
      setBtnClassName(callsQueue[0], ElevatorStatuses.Traveling)

      queueInterval = setInterval(() => {
        tryToCallAvailableElevator(callsQueue.length)
      }, 1000)

      //console.log("outside of setInterval")
    }

    /*
    console.log("callsQueue.length:", callsQueue.length)
    if(callsQueue.length === 0){
      console.log("CLEAR INTERVAL")
      clearInterval(queueInterval)
    }
*/

    /*
    if(queueInterval != null && callsQueue.length === 0){
      console.log("!!!!!!!!!!!!!!!!!!!!")
      clearInterval(queueInterval)
    }
    

  }, [callsQueue, callsCounter])
*/

  return (
    <div>
      <h1 className="elevators-header">
        Elevator Excercise
      </h1>

      <div className="elevators-container">
        <FloorsLabels numOfFloors={numOfFloors} />

        {[...Array(numOfElevators).keys()].map(elevatorNum =>
          <Elevator
            key={elevatorNum}
            numOfFloors={numOfFloors}
            desiredFloor={getFloorNumOfElevator(elevatorNum)}
            onArrival={(floorNum) => onElevatorArrival(elevatorNum, floorNum)}
            onTraveling={(floorNum) => setBtnClassName(floorNum, ElevatorStatuses.Traveling)}
            timeoutOnArrival={ARRIVAL_TIMEOUT}
          />
        )}

        <ElevatorsController
          numOfFloors={numOfFloors}
          onFloorChosen={(floorChosen) => onCall(floorChosen)}
          btnsClassNames={btnsClassNames}
        />
      </div>

      <ElevatorsForm
        onChangeNumOfFloors={(newNumOfFloors) => setNumOfFloors(newNumOfFloors)}
        onChangeNumOfElevators={() => { }} />
    </div>
  );
}

export default App;