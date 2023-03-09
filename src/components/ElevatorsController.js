import './elevators-controller.css'

const ElevatorsController = ({numOfFloors, onFloorChosen, btnsClassNames}) => {

    return(
        <div className="elevators-controller">
          {[...Array(numOfFloors).keys()].reverse().map(floorChosen =>
            <button
              key={floorChosen}
              className={`btn ${btnsClassNames[floorChosen]}`}
              onClick={() => onFloorChosen(floorChosen)}>
            </button>
          )}
        </div>
    )
}

export default ElevatorsController