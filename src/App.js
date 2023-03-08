import './App.css';
import {useState, useEffect} from 'react'
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

function App() {
  const [desiredFloor, setDesiredFloor] = useState(0)
  const [elevatorChosen, setElevatorChosen] = useState(null)
  const [btnClasnName, setBtnClassName] = useState(ElevatorBtnClassNames.Default)
  const [callsQueue, setCallsQueue] = useState([])
  const [elevatorsLocations, setElevatorsLocations] = useState(initialElevatorsLocations)

  function getElevatorLabel(elevatorNum){
    switch(elevatorNum){
      case 0: 
        return "Ground Floor"
      case 1: 
        return "1st"
      default: 
        return `${elevatorNum}th`
    }
  }

  function updateElevatorLocation(elevatorNum, floorNum){
    const nextElevatorsLocations = elevatorsLocations
    nextElevatorsLocations.set(elevatorNum, floorNum)
    setElevatorsLocations(elevatorsLocations)
  }

  function onElevatorReady(elevatorNum, floorNum){
    setBtnClassName(ElevatorBtnClassNames.Default)
    updateElevatorLocation(elevatorNum, floorNum)
  }

  //elevatorNum => elevatorIndex
  function onElevatorArrival(elevatorNum, floorNum){
    setBtnClassName(ElevatorBtnClassNames.Arrived)
    setTimeout(() => {
      onElevatorReady(elevatorNum, floorNum)
    }, ARRIVAL_TIMEOUT)
  }

  function identifyClosestElevator(floorNum){
    const sortedByClosestLocations = new Map([...elevatorsLocations.entries()].map(a => [a[0], Math.abs(a[1] - floorNum)]).sort((a, b) => a[1] - b[1]))
    const closestElevatorNum = sortedByClosestLocations.entries().next().value[0]
    return closestElevatorNum
  }
  


  function onCall(floorNum){
    // Add call to qeoue
    console.log("Queoe:", [...callsQueue, floorNum])
    setCallsQueue([...callsQueue, floorNum])

    const elevatorNum = identifyClosestElevator(floorNum)
    console.log("Elevator:", elevatorNum, "Floor:", floorNum)
    updateElevatorLocation(elevatorNum, floorNum)
    //startElevatorTravel(elevatorNum, floorNum)

    // Remove call to qeoue
    setCallsQueue(callsQueue.slice(1))
  }

  return (
    <div className="App">
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
          onTraveling={() => setBtnClassName(ElevatorBtnClassNames.Traveling)}
          timeoutOnArrival={ARRIVAL_TIMEOUT}
        />
      )}

      <div className="elevators-controller">
        {[...Array(NUM_OF_FLOORS).keys()].reverse().map(floorNum => 
          <button 
            key={floorNum}
            className={`btn ${desiredFloor === floorNum ? btnClasnName : ElevatorBtnClassNames.Default}`}
            onClick={() => onCall(floorNum)}>
              {callsQueue}
          </button>
        )}

      </div>

    </div>
  );
}

export default App;