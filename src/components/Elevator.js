import './elevator.css'
import { useState, useEffect } from 'react'
import useSound from 'use-sound';
import { ReactComponent as ElevatorIcon } from './sources/elevator-icon.svg'
import ElevatorPingSound from './sources/elevator-ping.mp3'

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
    const [playElevatorSound] = useSound(ElevatorPingSound)

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

    function getTimeStrFromMillSec(timeInMillSec){
        let seconds = Math.floor(timeInMillSec / 1000);
        let minutes = Math.floor(seconds / 60);
        return minutes === 0 ? `${seconds % 100} sec.` : `${minutes} min, ${seconds % 100} sec.`
    }

    useEffect(() => {
        const hasElevatorCalled = desiredFloor !== currentFloor
        if (hasElevatorCalled) {

            const floorsToTravel = desiredFloor - currentFloor

            var startTime = new Date().getTime();
            setTravelHeightInPx(getTravelHeightInPx(floorsToTravel))
            setTravelDuration(getTransitionDurationInSec(floorsToTravel))
            setElevetorIconColor(ElevatorStatusColor.Traveling)
            onTraveling(desiredFloor)
            setTimeout(() => {
                setTravelHeightInPx('0px')
                setTravelDuration(0)
                setElevetorIconColor(ElevatorStatusColor.Arrived)

                setCurrentFloor(desiredFloor)
                onArrival(desiredFloor)
                var endTime = new Date().getTime();
                var timeInMillSec = endTime - startTime;
                //getTimeStrFromMillSec(timeInMillSec)


                playElevatorSound()
                setTimeout(() => {
                    setElevetorIconColor(ElevatorStatusColor.Default)
                }, timeoutOnArrival)
            }, Math.abs(floorsToTravel) * (floorTravelSpeedInSec * 1000))
        }
        else{
            setElevetorIconColor(ElevatorStatusColor.Arrived)
            onArrival(desiredFloor)

            setTimeout(() => {
                setElevetorIconColor(ElevatorStatusColor.Default)
            }, timeoutOnArrival)
        }
    }, [desiredFloor])




    return (
        <div>
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