import { useState } from "react";
import { ElevatorStatuses, initialNumOfFloors } from './constants'

const initialBtnsClassNames = [...Array(initialNumOfFloors).fill(ElevatorStatuses.Default)]

const HandleBtnsClassNames = () => {
    const [btnsClassNames, setBtnsClassNames] = useState(initialBtnsClassNames)

    function changeNumOfBtnsClassNames(newNumOfFloors){
        setBtnsClassNames([...Array(newNumOfFloors).fill(ElevatorStatuses.Default)])
    }

    function updateBtnClassName(btnIndex, ElevatorStatus) {
        setBtnsClassNames(btnsClassNames => btnsClassNames.map((btnClassName, index) => {
            return index === btnIndex ? ElevatorStatus : btnClassName 
        }))
    }

    return { btnsClassNames, updateBtnClassName, changeNumOfBtnsClassNames }
}

export default HandleBtnsClassNames