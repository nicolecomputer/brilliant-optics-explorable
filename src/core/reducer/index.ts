import { calculateReflections } from "../optics"
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
    observableObjects: [],
    reflections: []

}

export function reducer(state: State, action: Action): State {
    // First apply the action to the state to get the next state
    let nextState: State = {
        ...state,
        mirrors: mirrorReducer(state.mirrors, action),
        observer: observerReducer(state.observer, action),
        observableObjects: observableObjectReducer(state.observableObjects, action),
    }

    // Then using the next state calculate all of the reflections that exist
    // NOTE(NEW)/TODO(NEW): This might make sense as a calculated property that happens in a component
    // and feeds into the simulation (maybe move out the reducer). Ditto for rays
    nextState = {
        ...nextState,
        reflections: calculateReflections(nextState.observer, nextState.observableObjects, nextState.mirrors)
    }

    return nextState
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

    return observableObjects
}
