import {useState} from 'react'
import { initialNumOfFloors, initialNumOfElevators } from '../constants'

const ElevatorsForm = ({onChangeNumOfFloors, onChangeNumOfElevators}) => {
    const [numOfFloorsInput, setNumOfFloorsInput] = useState(initialNumOfFloors)
    const [numOfElevatorsInput, setNumOfElevatorsInput] = useState(initialNumOfElevators)

    function handleNumOfFloorsSubmit(e){
        e.preventDefault()
        console.log(e)
        console.log(e.target[0].value)
        onChangeNumOfFloors(parseInt(e.target[0].value))
        //check input > 1 , input < 20
    }

    return(
        <div className="elevators-form-container">
        <form onSubmit={e => handleNumOfFloorsSubmit(e)}>
            <label>Enter Number Of Floors:</label>
            <input type="number" value={numOfFloorsInput} onChange={e => setNumOfFloorsInput(e.target.value)}/>
            <button type="submit">Change</button>
        </form>

        <input type="number" placeholder="Enter Number Of Elevators:"/>
    </div>
    )
}

export default ElevatorsForm