import { World, Observer, Mirror, ObservableObject, Reflection, Identifier, Point } from "../types"

// Extra types

export type SimulationOptions = {
    allowObserverToMoveX: boolean,
    allowObserverToMoveY: boolean
}

// State
export type State = {
    world: World,
    observer: Observer,
    mirrors: Mirror[],
    observableObjects: ObservableObject[],
    simulationOptions: SimulationOptions
    reflections: Reflection[]
}

// Actions
export type MirrorAdd = {
    type: "MIRROR-ADD",
}

export type MirrorRemove = {
    type: "MIRROR-REMOVE",
    mirrorId: Identifier
}

export type MirrorMove = {
    type: "MIRROR-MOVE-CENTERPOINT",
    mirrorId: Identifier,
    centerPoint: Point
}

export type MirrorChangeLength = {
    type: "MIRROR-CHANGE-LENGTH",
    mirrorId: Identifier,
    length: number
}

export type ObserverMove = {
    type: "OBSERVER-MOVE",
    location: Point
}

export type ObserverSetMovable = {
    type: "OBSERVER-SET-MOVABLE",
    isMovable: boolean
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
    isMovable: boolean
}

export type ObservableObjectMove = {
    type: "OBSERVABLE-OBJECT-MOVE-CENTERPOINT",
    observableObjectId: Identifier,
    centerPoint: Point
}

export type SimulationSetOption = {
    type: "SIMLATION-SET-OPTION",
    optionKey: string,
    option: boolean
}

export type Action = MirrorAdd | MirrorRemove | MirrorMove | MirrorChangeLength |
    ObserverMove | ObserverSetMovable |
    ObservableObjectAdd | ObservableObjectRemove | ObservableObjectMove | ObservableObjectSetMovable |
    SimulationSetOption

