import { calculateReflections } from "../optics"
import { Mirror, Observer, ObservableObject } from "../types"
import { State, Action } from "./types"

export const defaultState: State = {
    world: {
        width: 500,
        height: 500
    },
    observer: {
        isMovable: true,
        location: {
            x: 250,
            y: 250
        }
    },
    mirrors: [],
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

    console.log(nextState)

    return nextState
}

// Child Reducers

export function mirrorReducer(mirrors: Mirror[], action: Action): Mirror[] {
    if (!action.type.startsWith("MIRROR")) {
        return mirrors
    }

    return mirrors
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function observerReducer(observer: Observer, action: Action): Observer {
    if (!action.type.startsWith("OBSERVER")) {
        return observer
    }

    if (action.type === "OBSERVER-MOVE") {
        return {
            ...observer,
            location: action.location
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
