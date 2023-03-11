import './elevators-form.css'
import { useState } from 'react'
import { initialNumOfFloors, initialNumOfElevators } from '../../constants'

const ElevatorsForm = ({ onFormSubmit }) => {
    const [numOfFloorsInput, setNumOfFloorsInput] = useState(initialNumOfFloors)
    const [numOfElevatorsInput, setNumOfElevatorsInput] = useState(initialNumOfElevators)

    function handleFormSubmit(e) {
        e.preventDefault()
        onFormSubmit(parseInt(numOfElevatorsInput), parseInt(numOfFloorsInput))
    }

    return (
        <div id="elevators-form-container">
            <form onSubmit={e => handleFormSubmit(e)}>
                <div className="input-container">
                    <div>
                        <label>Enter Number Of Floors:</label>
                        <input type="number" min="1" max="20" value={numOfFloorsInput} onChange={e => setNumOfFloorsInput(e.target.value)} />
                    </div>

                    <div>
                        <label>Enter Number Of Elevators:</label>
                        <input type="number" min="1" max="10" value={numOfElevatorsInput} onChange={e => setNumOfElevatorsInput(e.target.value)} />
                    </div>
                </div>

                <button type="submit">Change</button>
            </form>
        </div>
    )
}

export default ElevatorsForm