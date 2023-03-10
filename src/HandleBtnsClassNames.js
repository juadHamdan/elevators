import { useState } from "react";
import { ElevatorStatuses, ElevatorBtnClassNames, initialNumOfFloors, ARRIVAL_TIMEOUT } from './constants'

/** Represents buttons class names
 * btnsClassNames = [class name of first button, ...]
 * */
const initialBtnsClassNames = [...Array(initialNumOfFloors).fill(ElevatorBtnClassNames.Default)]

const HandleBtnsClassNames = () => {
    const [btnsClassNames, setBtnsClassNames] = useState(initialBtnsClassNames)

    function setBtnClassName(btnIndex, ElevatorStatus) {
        let className = ""

        switch (ElevatorStatus) {
            case ElevatorStatuses.Arrived:
                className = ElevatorBtnClassNames.Arrived
                break
            case ElevatorStatuses.Traveling:
                className = ElevatorBtnClassNames.Traveling
                break
            default:
                className = ElevatorBtnClassNames.Default
        }

        //const newBtnsClassNames = [...btnsClassNames]
        //newBtnsClassNames[btnIndex] = className
        //setBtnsClassNames(newBtnsClassNames)

        setBtnsClassNames(btnsClassNames => btnsClassNames.map((btnClassName, index) => {
            return index === btnIndex ? className : btnClassName 
        }))
    }

    return { btnsClassNames, setBtnClassName }
}

export default HandleBtnsClassNames