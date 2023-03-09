import { useState } from "react";

/** Represents Elevators Locations (floors) 
 * elevatorsLocations = {elevator: floor, ...} 
 * */
const initialElevatorsLocations = new Map([...Array(5).keys()].map(key => [key, 0]))

const HandleElevatorsLocations = () => {
    const [elevatorsLocations, setElevatorsLocations] = useState(initialElevatorsLocations)

    function updateElevatorLocation(elevatorNum, floorNum) {
        const nextElevatorsLocations = elevatorsLocations
        nextElevatorsLocations.set(elevatorNum, floorNum)
        setElevatorsLocations(elevatorsLocations)
    }

    function identifyClosestElevator(floorNum) {
        const sortedByClosestLocations = new Map([...elevatorsLocations.entries()].map(a => [a[0], Math.abs(a[1] - floorNum)]).sort((a, b) => a[1] - b[1]))
        const closestElevatorNum = sortedByClosestLocations.entries().next().value[0]
        return closestElevatorNum
    }

    return { elevatorsLocations, updateElevatorLocation, identifyClosestElevator }
}

export default HandleElevatorsLocations