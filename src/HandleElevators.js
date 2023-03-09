import { useState } from "react";
import { initialNumOfElevators } from "./constants";

class ElevatorData {
    constructor(elevatorNum, floorNum) {
        this.elevatorNum = elevatorNum
        this.floorNum = floorNum
        this.isOccupied = false
    }
}
/*
class Elevators {
    constructor(numOfElevators) {
        this.elevatorsData = []
        for (let i = 0; i < numOfElevators; i++) {
            this.elevatorsData.push(new ElevatorData(i, 0))
        }
    }
    identifyClosestFreeElevatorToFloor(floorNum) {
        const freeElevators = this.elevatorsData.filter(elevatorData => elevatorData.isOccupied === false)
        if (!freeElevators) {
            return null
        }
        return freeElevators.map(elevatorData => {
            return { ...elevatorData, floorNum: Math.abs(elevatorData.floorNum - floorNum) }
        }).sort((a, b) => a.floorNum - b.floorNum)
    }
    updateElevatorLocation(elevatorIndex, floorNum) {
        this.elevatorsData[elevatorIndex].floorNum = floorNum
    }
}
*/

/** Represents Elevators Locations (floors) 
 * elevatorsLocations = {elevator: floor, ...} 
 * */
//const initialElevatorsLocations = new Map([...Array(initialNumOfElevators).keys()].map(key => [key, 0]))

//const initialElevators = new Elevators(initialNumOfElevators)

//const sortedElevatorsLocationsClosestToFloor = elevators.identifyClosestFreeElevatorToFloor(2)

/*
if(sortedElevatorsLocationsClosestToFloor == null){
    const closestElevatorNum = sortedElevatorsLocationsClosestToFloor[0].elevatorNum
    console.log(closestElevatorNum)
}
*/

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

        //const nextElevatorsLocations = elevatorsLocations
        //nextElevatorsLocations.set(elevatorNum, floorNum)
        //setElevatorsLocations(elevatorsLocations)
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
        console.log(closestElevatorNum)
        return closestElevatorNum


        //get free elevators
        //const sortedByClosestLocations = new Map([...elevatorsLocations.entries()].map(a => [a[0], Math.abs(a[1] - floorNum)]).sort((a, b) => a[1] - b[1]))
        //const closestElevatorNum = sortedByClosestLocations.entries().next().value[0]
        //return closestElevatorNum
    }

    return { getFloorNumOfElevator, updateElevatorOccupation, updateFloorNumOFElevator, identifyClosestFreeElevator }
}

export default HandleElevators