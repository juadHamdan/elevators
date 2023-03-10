import './elevator.css'
import { useState, useEffect } from 'react'
import useSound from 'use-sound';
import { ReactComponent as ElevatorIcon } from './sources/elevator-icon.svg'
import ElevatorPingSound from './sources/elevator-ping.mp3'

import {initialElevatorsFloor, floorHeightInPx, elevatorTravelSpeedPerFloorInSec} from '../../constants'

const ElevatorStatusColor = {
    Arrived: "#66bb6a",
    Traveling: "#f44336",
    Default: "#404040"
}

const Elevator = ({
    numOfFloors,
    desiredFloor,
    onTraveling,
    onArrival,
    timeoutOnArrival
}) => {
    const [currentFloor, setCurrentFloor] = useState(initialElevatorsFloor)
    const [elevetorIconColor, setElevetorIconColor] = useState(ElevatorStatusColor.Default)
    const [travelHeight, setTravelHeight] = useState('0px')
    const [timingContainerHeight, setTimingContainerHeight] = useState('0px')
    const [travelDuration, setTravelDuration] = useState(0)
    const [travelTimeCounterStr, setTravelTimeCounterStr] = useState("")
    const [playElevatorSound] = useSound(ElevatorPingSound)

    const floorStyle = {
        width: `${(floorHeightInPx * 2 - 5) - 2}px`,
        height: `${floorHeightInPx - 2}px`,
        border: "1px solid #f5f5f5"
    }

    function getTravelHeight(floorsToTravel) {
        return `${-(floorsToTravel * floorHeightInPx)}px`
    }

    function getTimingContainerHeight(desiredFloor) {
        return `${Math.abs((desiredFloor + 1) * floorHeightInPx) + 10}px`
    }

    function getTransitionDurationInSec(floorsToTravel) {
        return Math.abs(floorsToTravel * elevatorTravelSpeedPerFloorInSec)
    }

    const timingContainerStyle = {
        height: `${timingContainerHeight}`
    }

    const elevatorIconAnimationStyle = {
        transform: `translateY(${travelHeight})`,
        transitionDuration: `${travelDuration}s`
    }

    function getTimeStrFromSec(seconds){
        let minutes = Math.floor(seconds / 60);
        return minutes === 0 ? `${seconds % 100} sec.` : `${minutes} min, ${seconds % 100} sec.`
    }

    function handleElevatorCall(floorsToTravel){
        setTimingContainerHeight(getTimingContainerHeight(desiredFloor))
        setTravelHeight(getTravelHeight(floorsToTravel))
        setTravelDuration(getTransitionDurationInSec(floorsToTravel))
        setElevetorIconColor(ElevatorStatusColor.Traveling)
        onTraveling(desiredFloor)
    }

    function handleElevatorArrival(desiredFloor){
        setTravelHeight('0px')
        setTravelDuration(0)
        setElevetorIconColor(ElevatorStatusColor.Arrived)
        setCurrentFloor(desiredFloor)
        onArrival(desiredFloor)
        playElevatorSound()
    }

    useEffect(() => {
        const hasElevatorCalled = desiredFloor !== currentFloor
        if (hasElevatorCalled) {
            const floorsToTravel = desiredFloor - currentFloor

            let secondTicksCounter = 0
            setTravelTimeCounterStr("0 sec.")
            const travevlTimeCounterInterval = setInterval(() => {
                secondTicksCounter += 1
                setTravelTimeCounterStr(getTimeStrFromSec(secondTicksCounter))
            }, 1000)
            var startTime = new Date().getTime();
            handleElevatorCall(floorsToTravel)

            setTimeout(() => {
                handleElevatorArrival(desiredFloor)
                clearInterval(travevlTimeCounterInterval)
                setTimeout(() => {
                    setElevetorIconColor(ElevatorStatusColor.Default)
                }, timeoutOnArrival)
            }, Math.abs(floorsToTravel) * (elevatorTravelSpeedPerFloorInSec * 1000))
        }
    }, [desiredFloor])


    return (
        <div className="elevator-container">
            <div className="timing-container" style={timingContainerStyle}>
                {travelTimeCounterStr}
            </div>

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

/*style={{height: `${travelHeightInPx}px`, backgroundColor: "yellow"}}*/