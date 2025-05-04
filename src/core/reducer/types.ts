import { World, Observer, VerticalMirror, ObservableObject, Identifier, Point, SimulationOptions, MovableState } from "../types"

// State
export type State = {
    world: World,
    observer: Observer,
    mirrors: VerticalMirror[],
    observableObjects: ObservableObject[],
    simulationOptions: SimulationOptions
}

// Actions
export type VerticalMirrorAdd = {
    type: "VERTICAL-MIRROR-ADD",
}

export type VerticalMirrorRemove = {
    type: "VERTICAL-MIRROR-REMOVE",
    mirrorId: Identifier
}

export type VerticalMirrorMove = {
    type: "VERTICAL-MIRROR-MOVE",
    mirrorId: Identifier,
    position: Point
}

export type VerticalMirrorChangeLength = {
    type: "VERTICAL-MIRROR-CHANGE-LENGTH",
    mirrorId: Identifier,
    length: number
}

export type ObserverMove = {
    type: "OBSERVER-MOVE",
    position: Point
}

export type ObserverSetMovable = {
    type: "OBSERVER-SET-MOVABLE",
    isMovable: MovableState
}

export type ObservableObjectAdd = {
    type: "OBSERVABLE-OBJECT-ADD",
}

export type ObservableObjectRemove = {
    type: "OBSERVABLE-OBJECT-REMOVE",
    observableObjectId: Identifier
}

export type ObservableObjectSetMovable = {
    type: "OBSERVABLE-OBJECT-SET-MOVABLE",
    observableObjectId: Identifier,
    isMovable: MovableState
}

export type ObservableObjectMove = {
    type: "OBSERVABLE-OBJECT-MOVE",
    observableObjectId: Identifier,
    position: Point
}

export type SimulationOptionSetLightPath = {
    type: "SIMULATION-OPTION-SET-LIGHT-PATH",
    value: boolean
}

export type SimulationOptionSetVisiblePath = {
    type: "SIMULATION-OPTION-SET-VISIBLE-PATH",
    value: boolean
}

export type Action = VerticalMirrorAdd | VerticalMirrorRemove | VerticalMirrorMove | VerticalMirrorChangeLength |
    ObserverMove | ObserverSetMovable |
    ObservableObjectAdd | ObservableObjectRemove | ObservableObjectMove | ObservableObjectSetMovable |
    SimulationOptionSetLightPath | SimulationOptionSetVisiblePath;
