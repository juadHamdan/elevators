import './elevator.css'
import { useState, useEffect } from 'react'
import {ReactComponent as ElevatorIcon} from './sources/elevator-icon.svg'

const initialFloor = 0
const floorWidthInPx = 120
const floorHeightInPx = 60
const floorTravelSpeedInSec = 1

const Elevator = ({
    call,
    numOfFloors,
    desiredFloor,
}) => {
    const [currentFloor, setCurrentFloor] = useState(initialFloor)
    const [floorsToTravel, setFloorsToTravel] = useState(Math.abs(desiredFloor - currentFloor))
    const [isTraveling, setIsTraveling] = useState(false)
    const [hasArrived, setHasArrived] = useState(false)
    //const [isTravelingUp]

    const floorSizeStyle = {
        width: `${floorWidthInPx}px`,
        height: `${floorHeightInPx}px`
    }

    function getTravelHeightPx(){
        return `${-(floorsToTravel * floorHeightInPx)}px`
    }
    function getElevetorCurrentCSSColor(){
        if(hasArrived){
            return '#66bb6a'
        }
        if(isTraveling){
            return '#f44336'
        }
        return 'black'
    }
    const elevatorIconAnimationStyle = {
        transform: `translateY(${call ? getTravelHeightPx() : ''})`,
        transitionDuration: `${floorsToTravel}s`
    }

    useEffect(() => {
        if(call){
            setIsTraveling(true)
            setTimeout(() => {
                setIsTraveling(false)
                setHasArrived(true)
            }, floorsToTravel * (floorTravelSpeedInSec * 1000))
        }
    })

    return(
        <div className="elevator-container">
            {[...Array(numOfFloors).keys()].reverse().map(index => 
                <div key={index} className="floor" style={floorSizeStyle}>
                    {index === currentFloor ?
                        <ElevatorIcon stroke={getElevetorCurrentCSSColor()} className="elevator-icon" style={elevatorIconAnimationStyle}/>
                    :  null}
                </div>
            )}
        </div>
    )
}

export default Elevator