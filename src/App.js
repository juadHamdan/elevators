import './App.css';
import { useState, useEffect } from 'react'
import Elevator from './components/Elevator';

const NUM_OF_FLOORS = 10
const NUM_OF_ELEVATORS = 5
const ElevatorBtnClassNames = {
  Arrived: "btn-active",
  Traveling: "btn-disabled",
  Default: "btn-default"
}
const ARRIVAL_TIMEOUT = 2000
const initialElevatorsLocations = new Map([...Array(5).keys()].map(key => [key, 0]))
const initialBtnsClassNames = [...Array(10).fill(ElevatorBtnClassNames.Default)]

function App() {
  const [callsQueue, setCallsQueue] = useState([])
  const [elevatorsLocations, setElevatorsLocations] = useState(initialElevatorsLocations)
  const [btnsClassNames, setBtnsClassNames] = useState(initialBtnsClassNames)

  function getElevatorLabel(elevatorNum) {
    switch (elevatorNum) {
      case 0:
        return "Ground Floor"
      case 1:
        return "1st"
      default:
        return `${elevatorNum}th`
    }
  }

  function updateElevatorLocation(elevatorNum, floorNum) {
    const nextElevatorsLocations = elevatorsLocations
    nextElevatorsLocations.set(elevatorNum, floorNum)
    setElevatorsLocations(elevatorsLocations)
  }

  function setBtnClassName(btnIndex, className) {
    const newBtnsClassNames = [...btnsClassNames]
    newBtnsClassNames[btnIndex] = className
    setBtnsClassNames(newBtnsClassNames)
  }

  function onElevatorReady(elevatorNum, floorNum) {
    setBtnClassName(floorNum, ElevatorBtnClassNames.Default)
    updateElevatorLocation(elevatorNum, floorNum)
  }

  //elevatorNum => elevatorIndex
  function onElevatorArrival(elevatorNum, floorNum) {
    setBtnClassName(floorNum, ElevatorBtnClassNames.Arrived)

    setTimeout(() => {
      onElevatorReady(elevatorNum, floorNum)
    }, ARRIVAL_TIMEOUT)
  }

  function identifyClosestElevator(floorNum) {
    const sortedByClosestLocations = new Map([...elevatorsLocations.entries()].map(a => [a[0], Math.abs(a[1] - floorNum)]).sort((a, b) => a[1] - b[1]))
    const closestElevatorNum = sortedByClosestLocations.entries().next().value[0]
    return closestElevatorNum
  }



  function onCall(floorNum) {
    // Add call to qeoue
    console.log("Queoe:", [...callsQueue, floorNum])
    setCallsQueue([...callsQueue, floorNum])

    const elevatorNum = identifyClosestElevator(floorNum)
    updateElevatorLocation(elevatorNum, floorNum)

    // Remove call to qeoue
    console.log(callsQueue.slice(1))
    setCallsQueue(callsQueue.slice(1))
  }

  return (
    <div>
      <h1 className="elevators-header">
        Elevator Excercise
      </h1>

      {callsQueue.map(call => <p>{call}</p>)}

      <div className="elevators-container">
        <div className="elevators-labels">
          {[...Array(NUM_OF_FLOORS).keys()].reverse().map(floorNum =>
            <h3 key={floorNum} className="elevator-label">{getElevatorLabel(floorNum)}</h3>
          )}
        </div>

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

        <div className="elevators-controller">
          {[...Array(NUM_OF_FLOORS).keys()].reverse().map(floorChosen =>
            <button
              key={floorChosen}
              className={`btn ${btnsClassNames[floorChosen]}`}
              onClick={() => onCall(floorChosen)}>
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default App;