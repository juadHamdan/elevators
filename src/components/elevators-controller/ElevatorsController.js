import './elevators-controller.css'
import {ElevatorStatuses, gapBetweenControllersPx} from '../../constants'
import HandleBtnsClassNames from '../../HandleBtnsClassNames'

const ElevatorsController = ({ numOfFloors, onFloorChosen, btnsClassNames }) => {

  function isElevatorStatusDefault(floorNum){
    return btnsClassNames[floorNum] === ElevatorStatuses.Default
  }

  function handleFloorChosen(floorChosen){
    if(isElevatorStatusDefault(floorChosen)){
      onFloorChosen(floorChosen)
    }
  }

  return (
    <div id="elevators-controller" style={{gap: `${gapBetweenControllersPx}px`}}>
      {[...Array(numOfFloors).keys()].reverse().map(floorChosen =>
        <button
          key={floorChosen}
          className={`btn btn-${btnsClassNames[floorChosen]}`}
          onClick={() => handleFloorChosen(floorChosen)}>
        </button>
      )}
    </div>
  )
}

export default ElevatorsController