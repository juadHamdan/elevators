import { useState } from "react";

const ElevatorBtnClassNames = {
    Arrived: "btn-active",
    Traveling: "btn-disabled",
    Default: "btn-default"
  }

/** Represents buttons class names
 * btnsClassNames = [class name of first button, ...]
 * */
const initialBtnsClassNames = [...Array(10).fill(ElevatorBtnClassNames.Default)]
  
const HandleBtnsClassNames = () => {
    const [btnsClassNames, setBtnsClassNames] = useState(initialBtnsClassNames)

    function setBtnClassName(btnIndex, className) {
        const newBtnsClassNames = [...btnsClassNames]
        newBtnsClassNames[btnIndex] = className
        setBtnsClassNames(newBtnsClassNames)
      }

    return { btnsClassNames, setBtnClassName }
}

export default HandleBtnsClassNames