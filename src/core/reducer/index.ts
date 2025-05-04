import { observableObjectColors } from "@/component-library/color"
import { VerticalMirror, Observer, ObservableObject, World, SimulationOptions } from "../types"
import { State, Action } from "./types"
import { getNextAvailableColor, getRandomInt } from "./util"

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
            },
            color: observableObjectColors.cherry
        }
    ],
    simulationOptions: {
        showLightPath: true,
        showVisiblePath: true
    }
}

export function reducer(state: State, action: Action): State {
    return {
        ...state,
        mirrors: mirrorReducer(state.mirrors, action),
        observer: observerReducer(state.observer, action),
        observableObjects: observableObjectReducer(state.observableObjects, state.world, action),
        simulationOptions: simulationOptionsReducer(state.simulationOptions, action)
    }
}

// Child Reducers

export function mirrorReducer(mirrors: VerticalMirror[], action: Action): VerticalMirror[] {
    if (!action.type.startsWith("VERTICAL-MIRROR")) {
        return mirrors;
    }

    if (action.type === "VERTICAL-MIRROR-MOVE") {
        return mirrors.map(mirror => {
            if (mirror.id === action.mirrorId) {
                return {
                    ...mirror,
                    position: action.position
                };
            }
            return mirror;
        });
    }

    return mirrors;
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

export function observableObjectReducer(observableObjects: ObservableObject[], world: World, action: Action): ObservableObject[] {
    if (!action.type.startsWith("OBSERVABLE-OBJECT")) {
        return observableObjects
    }

    if (action.type === "OBSERVABLE-OBJECT-ADD") {
        const insetForNewPosition = 50;
        return [
            ...observableObjects,
            {
                id: crypto.randomUUID().toString(),
                color: getNextAvailableColor(observableObjects),
                position: {
                    x: getRandomInt(insetForNewPosition, world.width - insetForNewPosition),
                    y: getRandomInt(insetForNewPosition, world.height - insetForNewPosition)
                },
                isMovable: "all"
            }
        ]
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

    if (action.type === "OBSERVABLE-OBJECT-REMOVE") {
        return observableObjects.filter(observable =>
            observable.id !== action.observableObjectId
        )
    }

    return observableObjects
}

export function simulationOptionsReducer(simulationOptions: SimulationOptions, action: Action): SimulationOptions {
    if (!action.type.startsWith("SIMULATION-OPTION")) {
        return simulationOptions
    }

    if (action.type === "SIMULATION-OPTION-SET-LIGHT-PATH") {
        return {
            ...simulationOptions,
            showLightPath: action.value
        }
    }

    if (action.type === "SIMULATION-OPTION-SET-VISIBLE-PATH") {
        return {
            ...simulationOptions,
            showVisiblePath: action.value
        }
    }

    return simulationOptions
}
