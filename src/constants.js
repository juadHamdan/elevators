export const initialNumOfFloors = 10
export const initialNumOfElevators = 1
export const ARRIVAL_TIMEOUT = 2000
export const elevatorTravelSpeedPerFloorInSec = 4
export const initialElevatorsFloor = 0
export const floorHeightInPx = 75

export const ElevatorStatuses = {
    Arrived: "arrived",
    Traveling: "traveling",
    Default: "default"
}

export const ElevatorBtnClassNames = {
    Arrived: "btn-active",
    Traveling: "btn-disabled",
    Default: "btn-default"
}

export const ElevatorStatusColors = {
    Arrived: "#66bb6a",
    Traveling: "#f44336",
    Default: "#404040"
}