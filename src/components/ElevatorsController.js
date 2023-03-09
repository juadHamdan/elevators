import './elevators-controller.css'
import {ElevatorBtnClassNames} from '../constants'

const ElevatorsController = ({ numOfFloors, onFloorChosen, btnsClassNames }) => {

  function isElevatorStatusDefault(floorNum){
    return btnsClassNames[floorNum] === ElevatorBtnClassNames.Default
  }

  function handleFloorChosen(floorChosen){
    if(isElevatorStatusDefault(floorChosen)){
      console.log("Status: default")
      onFloorChosen(floorChosen)
    }
  }

  return (
    <div className="elevators-controller">
      {[...Array(numOfFloors).keys()].reverse().map(floorChosen =>
        <button
          key={floorChosen}
          className={`btn ${btnsClassNames[floorChosen]}`}
          onClick={() => handleFloorChosen(floorChosen)}>
        </button>
      )}
    </div>
  )
}

export default ElevatorsController