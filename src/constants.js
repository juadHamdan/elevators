export const initialNumOfFloors = 10
export const initialNumOfElevators = 5
export const ARRIVAL_TIMEOUT = 2000
export const TRY_CALLING_MISSED_CALLS_INTERVAL = 1000
export const elevatorTravelSpeedPerFloorSec = 4
export const initialElevatorsFloor = 0
export const floorHeightPx = 75 // recommended >= 35 (height of labels, controllers)
export const gapBetweenfloorLabelsPx = 40
export const gapBetweenControllersPx = gapBetweenfloorLabelsPx

export const ElevatorStatuses = {
    Arrived: "arrived",
    Traveling: "traveling",
    Default: "default"
}

export const ElevatorStatusColors = {
    Arrived: "#66bb6a",
    Traveling: "#f44336",
    Default: "#404040"
}