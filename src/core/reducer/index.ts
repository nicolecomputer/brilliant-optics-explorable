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
            y: 140
        }
    },
    mirrors: [{
        type: "vertical-mirror",
        id: crypto.randomUUID(),
        position: {
            x: 200,
            y: 140
        },
        length: 140
    }],
    observableObjects: [
        {
            id: crypto.randomUUID(),
            isMovable: "all",
            position: {
                x: 250,
                y: 270
            },
            color: observableObjectColors.cherry
        }
    ],
    simulationOptions: {
        showLightPath: true,
        showVisiblePath: true,
        useExperimentalOptics: false
    },
    editorOptions: {
        panelWidth: 320
    }
}

export function reducer(state: State, action: Action): State {
    return {
        ...state,
        mirrors: mirrorReducer(state.mirrors, state.world, action),
        observer: observerReducer(state.observer, action),
        observableObjects: observableObjectReducer(state.observableObjects, state.world, action),
        simulationOptions: simulationOptionsReducer(state.simulationOptions, action)
    }
}

// Child Reducers

export function mirrorReducer(mirrors: VerticalMirror[], world: World, action: Action): VerticalMirror[] {
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
    else if (action.type === "VERTICAL-MIRROR-CHANGE-LENGTH") {
        return mirrors.map(mirror => {
            if (mirror.id === action.mirrorId) {
                return {
                    ...mirror,
                    length: action.length
                };
            }
            return mirror;
        });
    } else if (action.type === "VERTICAL-MIRROR-ADD") {
        return [
            ...mirrors,
            {
                id: crypto.randomUUID().toString(),
                type: "vertical-mirror",
                position: {
                    x: getRandomInt(50, world.width - 50),
                    y: getRandomInt(50, world.height - 50)
                },
                length: 140
            }
        ]
    } else if (action.type === "VERTICAL-MIRROR-REMOVE") {
        return mirrors.filter(mirror => mirror.id !== action.mirrorId);
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
    } else if (action.type === "OBSERVER-SET-MOVABLE") {
        return {
            ...observer,
            isMovable: action.isMovable
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

    if (action.type === "OBSERVABLE-OBJECT-SET-MOVABLE") {
        return observableObjects.map(observable => {
            if (observable.id === action.observableObjectId) {
                return {
                    ...observable,
                    isMovable: action.isMovable
                }
            }
            return observable
        })
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

    if (action.type === "SIMULATION-OPTION-SET-USE-EXPERIMENTAL-OPTICS") {
        return {
            ...simulationOptions,
            useExperimentalOptics: action.value
        }
    }

    return simulationOptions
}
