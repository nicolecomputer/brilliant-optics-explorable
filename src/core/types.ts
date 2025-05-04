export type Identifier = string

export type MovableState = "all" | "x-only" | "y-only" | "none";

export type Point = {
    x: number,
    y: number
}

export type World = {
    width: number,
    height: number

}
export type VerticalMirror = {
    id: Identifier
    type: "vertical-mirror",
    position: Point,
    length: number
}

export type Observer = {
    position: Point
    isMovable: MovableState
}

export type ObservableObject = {
    id: Identifier
    position: Point
    isMovable: MovableState
    color: string
}

export type VirtualObject = {
    reflectedObject: Identifier,
    type: "observer" | "object" | "mirror",
    position: Point,
    length?: number,
    color?: string
}

export type SimulationOptions = {
    showLightPath: boolean,
    showVisiblePath: boolean
}

export type LightPath = {
    reflectedObject: Identifier,
    points: Point[]
}
