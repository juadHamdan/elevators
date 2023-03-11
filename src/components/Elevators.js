import './elevators.css';
import HandleElevators from '../HandleElevators';
import HandleBtnsClassNames from '../HandleBtnsClassNames';
import Elevator from './elevator/Elevator';

import { ARRIVAL_TIMEOUT, ElevatorStatuses } from '../constants'
//import { initialNumOfFloors, initialNumOfElevators } from './constants'

const Elevators = ({ numOfFloors, numOfElevators, onElevatorFree }) => {
    const { getFloorNumOfElevator, updateElevatorOccupation, updateFloorNumOFElevator, identifyClosestFreeElevator, isSomeElevatorInFloor } = HandleElevators()
    const { updateBtnClassName } = HandleBtnsClassNames()

    function onElevatorReady(elevatorNum, floorNum) {
        updateFloorNumOFElevator(elevatorNum, floorNum)
        updateElevatorOccupation(elevatorNum, false)
        updateBtnClassName(floorNum, ElevatorStatuses.Default)
        //setNumOfOccupiedElevators(callsCounter => callsCounter - 1)
        onElevatorFree()
    }

    function onElevatorArrival(elevatorNum, floorNum) {
        updateBtnClassName(floorNum, ElevatorStatuses.Arrived)
        setTimeout(() => {
            onElevatorReady(elevatorNum, floorNum)
        }, ARRIVAL_TIMEOUT)
    }

    return (
        <div style={{ display: "flex" }}>
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
        </div>
    )
}

export default Elevators