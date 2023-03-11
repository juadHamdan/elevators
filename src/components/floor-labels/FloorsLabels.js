import './floors-labels.css'
import {gapBetweenfloorLabelsPx} from '../../constants'

const FloorsLabels = ({ numOfFloors }) => {

  function getElevatorLabel(floorNum) {
    switch (floorNum) {
      case 0:
        return "Ground Floor"
      case 1:
        return "1st"
      default:
        return `${floorNum}th`
    }
  }

  return (
    <div className="floors-labels" style={{gap: `${gapBetweenfloorLabelsPx}px`}}>
      {[...Array(numOfFloors).keys()].reverse().map(floorNum =>
        <h3 key={floorNum} className="floor-label">{getElevatorLabel(floorNum)}</h3>
      )}
    </div>
  )
}

export default FloorsLabels