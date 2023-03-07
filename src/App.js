import './App.css';
import {useState} from 'react'
import Elevator from './components/Elevator';

function App() {
  const [call, setCall] = useState(false)
  
  return (

    <div className="App">
      <Elevator 
        call={call}
        numOfFloors={10} 
        desiredFloor={2}
      />
      <button onClick={() => setCall(true)}>Call Second Floor</button>
    </div>
  );
}

export default App;
