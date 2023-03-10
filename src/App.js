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
  const [queueIsHandledFlag, setQueueIsHandledFlag] = useState(false)
  const [numOfFloors, setNumOfFloors] = useState(initialNumOfFloors)
  const [numOfElevators, setNumOfElevators] = useState(initialNumOfElevators)
  const { callsQueue, pushToQueue, shiftFromQueue } = HandleQueue()
  const { getFloorNumOfElevator, updateElevatorOccupation, updateFloorNumOFElevator, identifyClosestFreeElevator, isSomeElevatorInFloor } = HandleElevators()
  const { btnsClassNames, setBtnClassName } = HandleBtnsClassNames()
  const [callsCounter, setCallsCounter] = useState(0)

  function onElevatorReady(elevatorNum, floorNum) {
    updateFloorNumOFElevator(elevatorNum, floorNum)
    updateElevatorOccupation(elevatorNum, false)
    setBtnClassName(floorNum, ElevatorStatuses.Default)

    setCallsCounter(callsCounter => callsCounter - 1)
  }

  function onElevatorArrival(elevatorNum, floorNum) {
    setBtnClassName(floorNum, ElevatorStatuses.Arrived)

    setTimeout(() => {
      onElevatorReady(elevatorNum, floorNum)
    }, ARRIVAL_TIMEOUT)
  }

  function onCall(floorNum) {
    if(isSomeElevatorInFloor(floorNum)){
      setBtnClassName(floorNum, ElevatorStatuses.Arrived)
      setTimeout(() => {
        setBtnClassName(floorNum, ElevatorStatuses.Default)
      }, ARRIVAL_TIMEOUT)
      return
    }
    
    let elevatorNum = identifyClosestFreeElevator(floorNum)
    if (elevatorNum == null) {
      if(callsQueue.find(floor => floor === floorNum)){
        console.log("Pushed twice")
        return
      }
      pushToQueue(floorNum)
      setBtnClassName(floorNum, ElevatorStatuses.Traveling)
      return
    }

    setCallsCounter(callsCounter => callsCounter + 1)
    updateFloorNumOFElevator(elevatorNum, floorNum)
    updateElevatorOccupation(elevatorNum, true)
  }

/*
  var queueInterval = null
  useEffect(() => {
    //console.log("Render")
    function tryToCallAvailableElevator() {
      //callCounter 
      console.log("callsCounter:", callsCounter)
      if (callsCounter < numOfElevators) {
        const queueFloor = shiftFromQueue()
        
        if (queueInterval != null && callsQueue.length === 0) {
          console.log("CLEAR INTERVAL")
          //const queueFloor = shiftFromQueue()
          //console.log(queueFloor)
          //onCall(queueFloor)
          clearInterval(queueInterval)
        }
        
        console.log(queueFloor)
        onCall(queueFloor)
      }
    }

    if (!queueIsHandledFlag && callsQueue.length > 0) {
      setQueueIsHandledFlag(true)
      //console.log("Change in callsQueue:", callsQueue.length)
      
      queueInterval = setInterval(() => {
        console.log("INTERVAL")
        tryToCallAvailableElevator()
      }, 5000)
    }
    if(callsQueue.length === 0){
      setQueueIsHandledFlag(false)
      console.log("CLEAR")
      clearInterval(queueInterval)
    }

  }, [callsCounter, callsQueue, queueIsHandledFlag])
*/
  var queueInterval
  const tryToCallAvailableElevator = () => {
    queueInterval = setInterval(() => {
      /*if(callsQueue.length === 1){
        onCall(shiftFromQueue())
      }*/
      if (callsQueue.length > 0 && callsCounter < numOfElevators) onCall(shiftFromQueue())
      if(callsQueue.length === 0) clearInterval(queueInterval)
    }, 1000)
  }

  useEffect(() => {
    if(callsQueue.length > 0) tryToCallAvailableElevator()
    else clearInterval(queueInterval)
    return () => clearInterval(queueInterval)
  }, [callsQueue, callsCounter])

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