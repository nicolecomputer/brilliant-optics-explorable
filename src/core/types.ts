export type Identifier = string

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
    location: Point
    isMovable: boolean
}

export type ObservableObject = {
    id: Identifier
    location: Point
    isMovable: boolean
}

export type Reflection = {
    reflectedObject: Identifier,
    location: Point
}
