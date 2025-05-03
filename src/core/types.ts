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
export type Mirror = {
    id: Identifier
    start: Point,
    end: Point
}

export type Observer = {
    position: Point
    isMovable: MovableState
}

export type ObservableObject = {
    id: Identifier
    location: Point
    isMovable: MovableState
}

export type Reflection = {
    reflectedObject: Identifier,
    location: Point
}
