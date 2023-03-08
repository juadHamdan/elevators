import './elevator.css'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {ReactComponent as ElevatorIcon} from './sources/elevator-icon.svg'

const initialFloor = 0
const floorWidthInPx = 140
const floorHeightInPx = 75
const floorTravelSpeedInSec = 5

const ElevatorStatusColor = {
    Arrived: "#66bb6a",
    Traveling: "#f44336",
    Default: "#404040"
}

const Elevator = ({
    numOfFloors,
    desiredFloor = 0,
    onTraveling,
    onArrival,
    timeoutOnArrival
}) => {
    const [currentFloor, setCurrentFloor] = useState(initialFloor)
    const [floorsToTravel, setFloorsToTravel] = useState(0)
    const [elevetorIconColor, setElevetorIconColor] = useState(ElevatorStatusColor.Default)
    const [startAnimation, setStartAnimation] = useState(false)

    const floorStyle = {
        width: `${floorWidthInPx - 1}px`,
        height: `${floorHeightInPx - 1}px`,
        border: "1px solid #f5f5f5"
    }

    function getTravelHeightInPx(){
        return `${-(floorsToTravel * floorHeightInPx)}px`
    }

    function getTransitionDurationInSec(){
        return Math.abs(floorsToTravel * floorTravelSpeedInSec)
    }

    function getElevatorIconAnimationStyle(){
        if(startAnimation){
            return {
                transform: `translateY(${getTravelHeightInPx()})`,
                transitionDuration: `${getTransitionDurationInSec()}s`}
        }
        return{
            transform: `translateY(0)`,
            transitionDuration: `0s`
            }
    }

    useEffect(() => {
        const hasElevatorCalled = desiredFloor !== currentFloor
        if(hasElevatorCalled){
            console.log("desiredFloor:", desiredFloor, "currentFloor:", currentFloor)
            setFloorsToTravel(desiredFloor - currentFloor)


            ////
            setStartAnimation(true)



            setElevetorIconColor(ElevatorStatusColor.Traveling)
            onTraveling()
            setTimeout(() => {
                setElevetorIconColor(ElevatorStatusColor.Arrived)


                ///
                setStartAnimation(false)



                setCurrentFloor(desiredFloor)
                onArrival(desiredFloor)
                setTimeout(() => {
                    setElevetorIconColor(ElevatorStatusColor.Default)
                }, timeoutOnArrival)
            }, Math.abs(floorsToTravel) * (floorTravelSpeedInSec * 1000))
        }
    }, [desiredFloor])

    return(
        <div className="elevator-container">
            {[...Array(numOfFloors).keys()].reverse().map(index => 
                <div key={index} className="floor" style={floorStyle}>
                    {index === currentFloor ?
                        <ElevatorIcon 
                            stroke={elevetorIconColor} 
                            className="elevator-icon" 
                            style={getElevatorIconAnimationStyle()}
                        />
                    :  null}
                </div>
            )}
        </div>
    )
}

export default Elevator