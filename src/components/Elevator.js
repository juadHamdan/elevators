import './elevator.css'
import { useState, useEffect } from 'react'
import { ReactComponent as ElevatorIcon } from './sources/elevator-icon.svg'

const initialFloor = 0
const floorWidthInPx = 140
const floorHeightInPx = 75
const floorTravelSpeedInSec = 1

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
    const [elevetorIconColor, setElevetorIconColor] = useState(ElevatorStatusColor.Default)

    const [travelHeightInPx, setTravelHeightInPx] = useState('0px')
    const [travelDuration, setTravelDuration] = useState(0)

    const floorStyle = {
        width: `${floorWidthInPx - 2}px`,
        height: `${floorHeightInPx - 2}px`,
        border: "1px solid #f5f5f5"
    }

    function getTravelHeightInPx(floorsToTravel) {
        return `${-(floorsToTravel * floorHeightInPx)}px`
    }

    function getTransitionDurationInSec(floorsToTravel) {
        return Math.abs(floorsToTravel * floorTravelSpeedInSec)
    }

    const elevatorIconAnimationStyle = {
        transform: `translateY(${travelHeightInPx})`,
        transitionDuration: `${travelDuration}s`
    }

    useEffect(() => {
        const hasElevatorCalled = desiredFloor !== currentFloor
        if (hasElevatorCalled) {
            console.log("desiredFloor:", desiredFloor, "currentFloor:", currentFloor)
            const floorsToTravel = desiredFloor - currentFloor
            setTravelHeightInPx(getTravelHeightInPx(floorsToTravel))
            setTravelDuration(getTransitionDurationInSec(floorsToTravel))
            setElevetorIconColor(ElevatorStatusColor.Traveling)
            onTraveling()
            setTimeout(() => {
                setTravelHeightInPx('0px')
                setTravelDuration(0)
                setElevetorIconColor(ElevatorStatusColor.Arrived)

                setCurrentFloor(desiredFloor)
                onArrival(desiredFloor)
                setTimeout(() => {
                    setElevetorIconColor(ElevatorStatusColor.Default)
                }, timeoutOnArrival)
            }, Math.abs(floorsToTravel) * (floorTravelSpeedInSec * 1000))
        }
    }, [desiredFloor])

    return (
        <div className="elevator-container">
            {[...Array(numOfFloors).keys()].reverse().map(index =>
                <div key={index} className="floor" style={floorStyle}>
                    {index === currentFloor ?
                        <ElevatorIcon
                            stroke={elevetorIconColor}
                            className="elevator-icon"
                            style={elevatorIconAnimationStyle}
                        />
                        : null}
                </div>
            )}
        </div>
    )
}

export default Elevator