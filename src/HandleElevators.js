import { useState } from "react";
import { initialNumOfElevators } from "./constants";

class ElevatorData {
    constructor(elevatorNum, floorNum) {
        this.elevatorNum = elevatorNum
        this.floorNum = floorNum
        this.isOccupied = false
    }
}

const initialElevators = []
for (let i = 0; i < initialNumOfElevators; i++) {
    initialElevators.push(new ElevatorData(i, 0))
}

const HandleElevators = () => {
    const [elevators, setElevators] = useState(initialElevators)

    function updateElevatorOccupation(elevatorIndex, isOccupied){
        const newElevators = [...elevators]
        newElevators[elevatorIndex].isOccupied = isOccupied
        setElevators(newElevators)
    }

    function getFloorNumOfElevator(elevatorIndex){
        return elevators[elevatorIndex].floorNum
    }

    function updateFloorNumOFElevator(elevatorIndex, floorNum) {
        const newElevators = [...elevators]
        newElevators[elevatorIndex].floorNum = floorNum
        setElevators(newElevators)
    }

    function identifyClosestFreeElevator(floorNum) {
        const freeElevators = elevators.filter(elevatorData => elevatorData.isOccupied === false)
        if (!freeElevators) {
            return null
        }
        const sortedElevatorsLocationsClosestToFloor = freeElevators.map(elevatorData => {
            return { ...elevatorData, floorNum: Math.abs(elevatorData.floorNum - floorNum) }
        }).sort((a, b) => a.floorNum - b.floorNum)

        if (sortedElevatorsLocationsClosestToFloor.length === 0) {
            return null
        }
        const closestElevatorNum = sortedElevatorsLocationsClosestToFloor[0].elevatorNum
        return closestElevatorNum
    }

    return { elevators, getFloorNumOfElevator, updateElevatorOccupation, updateFloorNumOFElevator, identifyClosestFreeElevator }
}

export default HandleElevators