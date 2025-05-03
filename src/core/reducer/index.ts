import { VerticalMirror, Observer, ObservableObject } from "../types"
import { State, Action } from "./types"

export const defaultState: State = {
    world: {
        width: 500,
        height: 500
    },
    observer: {
        isMovable: "all",
        position: {
            x: 250,
            y: 250
        }
    },
    mirrors: [{
        type: "vertical-mirror",
        id: "abc-123",
        position: {
            x: 200,
            y: 140
        },
        length: 140
    }],
    observableObjects: [
        {
            id: "abc-999",
            isMovable: "all",
            position: {
                x: 400,
                y: 400
            }
        }
    ],

}

export function reducer(state: State, action: Action): State {
    return {
        ...state,
        mirrors: mirrorReducer(state.mirrors, action),
        observer: observerReducer(state.observer, action),
        observableObjects: observableObjectReducer(state.observableObjects, action),
    }
}

// Child Reducers

export function mirrorReducer(mirrors: VerticalMirror[], action: Action): VerticalMirror[] {
    if (!action.type.startsWith("MIRROR")) {
        return mirrors
    }

    return mirrors
}

export function observerReducer(observer: Observer, action: Action): Observer {
    if (!action.type.startsWith("OBSERVER")) {
        return observer
    }

    if (action.type === "OBSERVER-MOVE") {
        return {
            ...observer,
            position: action.position
        }
    }

    return observer
}

export function observableObjectReducer(observableObjects: ObservableObject[], action: Action): ObservableObject[] {
    if (!action.type.startsWith("OBSERVABLE-OBJECT")) {
        return observableObjects
    }

    if (action.type === "OBSERVABLE-OBJECT-MOVE") {
        return observableObjects.map(observable => {
            if (observable.id === action.observableObjectId) {
                return {
                    ...observable,
                    position: action.position
                }
            }
            return observable
        })
    }

    return observableObjects
}
