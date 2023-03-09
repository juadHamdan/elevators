export const initialNumOfFloors = 10
export const initialNumOfElevators = 5
export const ARRIVAL_TIMEOUT = 2000
export const elevatorTravelSpeedPerFloorInSec = 1
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