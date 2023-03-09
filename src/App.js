import './App.css';
import { useState, useEffect } from 'react'
import HandleQueue from './HandleQueue'
import HandleElevatorsLocations from './HandleElevatorsLocations';

import Elevator from './components/Elevator';
import FloorsLabels from './components/FloorsLabels';
import ElevatorsController from './components/ElevatorsController';
import HandleBtnsClassNames from './HandleBtnsClassNames';

import { ARRIVAL_TIMEOUT } from './constants'

const NUM_OF_FLOORS = 10
const NUM_OF_ELEVATORS = 5
const ElevatorBtnClassNames = {
  Arrived: "btn-active",
  Traveling: "btn-disabled",
  Default: "btn-default"
}

function App() {
  const { addToQueue, removeFromQueue } = HandleQueue()
  const { elevatorsLocations, updateElevatorLocation, identifyClosestElevator } = HandleElevatorsLocations()
  const { btnsClassNames, setBtnClassName }  = HandleBtnsClassNames()


  function onElevatorReady(elevatorNum, floorNum) {
    setBtnClassName(floorNum, ElevatorBtnClassNames.Default)
    updateElevatorLocation(elevatorNum, floorNum)
    removeFromQueue()
  }

  //elevatorNum => elevatorIndex
  function onElevatorArrival(elevatorNum, floorNum) {
    setBtnClassName(floorNum, ElevatorBtnClassNames.Arrived)

    setTimeout(() => {
      onElevatorReady(elevatorNum, floorNum)
    }, ARRIVAL_TIMEOUT)
  }



  function onCall(floorNum) {
    addToQueue(floorNum)
    updateElevatorLocation(identifyClosestElevator(floorNum), floorNum)
  }

  return (
    <div>
      <h1 className="elevators-header">
        Elevator Excercise
      </h1>

      <div className="elevators-container">
        <FloorsLabels numOfFloors={NUM_OF_FLOORS} />

        {[...Array(NUM_OF_ELEVATORS).keys()].map(elevatorNum =>
          <Elevator
            key={elevatorNum}
            numOfFloors={NUM_OF_FLOORS}
            desiredFloor={elevatorsLocations.get(elevatorNum)}
            onArrival={(floorNum) => onElevatorArrival(elevatorNum, floorNum)}
            onTraveling={(floorNum) => setBtnClassName(floorNum, ElevatorBtnClassNames.Traveling)}
            timeoutOnArrival={ARRIVAL_TIMEOUT}
          />
        )}

        <ElevatorsController
          numOfFloors={NUM_OF_FLOORS}
          onFloorChosen={(floorChosen) => onCall(floorChosen)}
          btnsClassNames={btnsClassNames}
        />

      </div>
    </div>
  );
}

export default App;