import { useState } from "react";
import { ElevatorStatuses, ElevatorBtnClassNames } from './constants'

/** Represents buttons class names
 * btnsClassNames = [class name of first button, ...]
 * */
const initialBtnsClassNames = [...Array(10).fill(ElevatorBtnClassNames.Default)]

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
                break
        }

        const newBtnsClassNames = [...btnsClassNames]
        newBtnsClassNames[btnIndex] = className
        setBtnsClassNames(newBtnsClassNames)
    }

    return { btnsClassNames, setBtnClassName }
}

export default HandleBtnsClassNames