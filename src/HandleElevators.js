import { useState, useEffect } from "react";
import { initialNumOfElevators, initialElevatorsFloor } from "./constants";

class ElevatorData {
    constructor(elevatorNum, floorNum) {
        this.elevatorNum = elevatorNum
        this.floorNum = floorNum
        this.isOccupied = false
    }
}

const initialElevators = []
for (let i = 0; i < initialNumOfElevators; i++) {
    initialElevators.push(new ElevatorData(i, initialElevatorsFloor))
}

const HandleElevators = () => {
    const [elevators, setElevators] = useState(initialElevators)

    function resetElevators(){
        setElevators(elevators => elevators.map(elevatorData => {
            return { ...elevatorData, floorNum: initialElevatorsFloor, isOccupied: false }
        }))
    }

    function changeNumOfElevators(newNumOfElevators){
        const newElevators = []
        for (let i = 0; i < newNumOfElevators; i++) {
            newElevators.push(new ElevatorData(i, initialElevatorsFloor))
        }
        console.log(newElevators)
        setElevators(newElevators)
    }

    function isSomeElevatorInFloor(floorNum){
        let isInFloor = false
        
        elevators.forEach(elevator => {
            if(elevator.floorNum === floorNum){
                isInFloor = true
            }
        })
    
        return isInFloor
    }

    function updateElevatorOccupation(elevatorIndex, isOccupied){
        const newElevators = [...elevators]
        newElevators[elevatorIndex].isOccupied = isOccupied
        setElevators(newElevators)
    }

    function getFloorNumOfElevator(elevatorIndex){
        return elevators[elevatorIndex]?.floorNum || initialElevatorsFloor
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

    return { resetElevators, changeNumOfElevators, getFloorNumOfElevator, updateElevatorOccupation, updateFloorNumOFElevator, identifyClosestFreeElevator, isSomeElevatorInFloor }
}

export default HandleElevators