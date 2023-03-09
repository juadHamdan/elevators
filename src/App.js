import './App.css';
import {useState} from 'react'
import HandleQueue from './HandleQueue'
import HandleElevators from './HandleElevators';
import HandleBtnsClassNames from './HandleBtnsClassNames';

import Elevator from './components/Elevator';
import FloorsLabels from './components/FloorsLabels';
import ElevatorsController from './components/ElevatorsController';
import ElevatorsForm from './components/ElevatorsForm';

import { ARRIVAL_TIMEOUT, ElevatorStatuses } from './constants'
import {initialNumOfFloors, initialNumOfElevators} from './constants'

function App() {
  const [numOfFloors, setNumOfFloors] = useState(initialNumOfFloors)
  const [numOfElevators, setNumOfElevators] = useState(initialNumOfElevators)
  const { addToQueue, removeFromQueue } = HandleQueue()
  const { getFloorNumOfElevator, updateElevatorOccupation, updateFloorNumOFElevator, identifyClosestFreeElevator } = HandleElevators()
  const { btnsClassNames, setBtnClassName }  = HandleBtnsClassNames()


  function onElevatorReady(elevatorNum, floorNum) {
    setBtnClassName(floorNum, ElevatorStatuses.Default)
    updateFloorNumOFElevator(elevatorNum, floorNum)
    updateElevatorOccupation(elevatorNum, false)
    removeFromQueue()
  }

  function onElevatorArrival(elevatorNum, floorNum) {
    setBtnClassName(floorNum, ElevatorStatuses.Arrived)

    setTimeout(() => {
      onElevatorReady(elevatorNum, floorNum)
    }, ARRIVAL_TIMEOUT)
  }

  function onCall(floorNum) {
    addToQueue(floorNum)

    const elevatorNum = identifyClosestFreeElevator(floorNum)
    if(elevatorNum == null){
      //addToQueue
      return
    }
    updateFloorNumOFElevator(elevatorNum, floorNum)
    updateElevatorOccupation(elevatorNum, true)
  }

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
      onChangeNumOfElevators={() => {}}/>
    </div>
  );
}

export default App;