import './App.css';
import { useState, useEffect } from 'react'
import HandleBtnsClassNames from './HandleBtnsClassNames';
import HandleElevators from './HandleElevators'
import HandleQueue from './HandleQueue'
import Elevator from './components/elevator/Elevator';
import FloorsLabels from './components/floor-labels/FloorsLabels';
import ElevatorsController from './components/elevators-controller/ElevatorsController';
import ElevatorsForm from './components/elevators-form/ElevatorsForm';
import { initialNumOfFloors, initialNumOfElevators } from './constants'
import { ARRIVAL_TIMEOUT, TRY_CALLING_MISSED_CALLS_INTERVAL, ElevatorStatuses } from './constants'

function App() {
  const [numOfFloors, setNumOfFloors] = useState(initialNumOfFloors)
  const [numOfElevators, setNumOfElevators] = useState(initialNumOfElevators)
  const [numOfOccupiedElevators, setNumOfOccupiedElevators] = useState(0)
  const { missedCallsQueue, pushToQueue, shiftFromQueue } = HandleQueue()
  const { getFloorNumOfElevator, changeNumOfElevators, updateElevatorOccupation, updateFloorNumOFElevator, identifyClosestFreeElevator, isSomeElevatorInFloor } = HandleElevators()
  const { btnsClassNames, updateBtnClassName, changeNumOfBtnsClassNames } = HandleBtnsClassNames()

  function onElevatorFormSubmit(newNumOfElevators, newNumOfFloors) {
    if (newNumOfElevators !== numOfElevators) {
      console.log(newNumOfElevators, typeof (newNumOfElevators))
      changeNumOfElevators(newNumOfElevators)
      setNumOfElevators(newNumOfElevators)
    }
    if (newNumOfFloors !== numOfFloors) {
      console.log(newNumOfFloors, typeof (newNumOfFloors))
      setNumOfFloors(newNumOfFloors)
      changeNumOfBtnsClassNames(newNumOfFloors)
    }
  }

  function onCall(floorNum) {
    if (isSomeElevatorInFloor(floorNum)) {
      updateBtnClassName(floorNum, ElevatorStatuses.Arrived)
      setTimeout(() => {
        updateBtnClassName(floorNum, ElevatorStatuses.Default)
      }, ARRIVAL_TIMEOUT)
      return
    }

    let elevatorNum = identifyClosestFreeElevator(floorNum)
    if (elevatorNum == null) {
      pushToQueue(floorNum)
      updateBtnClassName(floorNum, ElevatorStatuses.Traveling)
      return
    }

    setNumOfOccupiedElevators(numOfOccupiedElevators => numOfOccupiedElevators + 1)
    updateFloorNumOFElevator(elevatorNum, floorNum)
    updateElevatorOccupation(elevatorNum, true)
  }

  function onElevatorReady(elevatorNum, floorNum) {
    updateFloorNumOFElevator(elevatorNum, floorNum)
    updateElevatorOccupation(elevatorNum, false)
    updateBtnClassName(floorNum, ElevatorStatuses.Default)
    setNumOfOccupiedElevators(callsCounter => callsCounter - 1)
  }

  function onElevatorArrival(elevatorNum, floorNum) {
    updateBtnClassName(floorNum, ElevatorStatuses.Arrived)
    setTimeout(() => {
      onElevatorReady(elevatorNum, floorNum)
    }, ARRIVAL_TIMEOUT)
  }


  var queueInterval
  const tryToCallAvailableElevator = () => {
    queueInterval = setInterval(() => {
      if (missedCallsQueue.length > 0 && numOfOccupiedElevators < numOfElevators) onCall(shiftFromQueue())
      if (missedCallsQueue.length === 0) clearInterval(queueInterval)
    }, TRY_CALLING_MISSED_CALLS_INTERVAL)
  }

  useEffect(() => {
    if (missedCallsQueue.length > 0) tryToCallAvailableElevator()
    else clearInterval(queueInterval)
    return () => clearInterval(queueInterval)
  }, [missedCallsQueue, numOfOccupiedElevators])


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
            onTraveling={(floorNum) => updateBtnClassName(floorNum, ElevatorStatuses.Traveling)}
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
        onFormSubmit={onElevatorFormSubmit}
      />
    </div>
  );
}

export default App;