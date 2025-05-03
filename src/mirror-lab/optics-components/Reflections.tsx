import { State } from "@/core/reducer/types";
import ObserverReflection from "./reflection/Observer";
import ObservableReflection from "./reflection/Observable"
import { useState } from "@/lib/StateContext";
import { simpleCalculateReflections } from "@/core/optics";
import { Reflection } from "@/core/types";

export default function Reflections() {
    const state: State = useState()

    const reflections = simpleCalculateReflections(state.observer, state.mirrors, state.observableObjects)

    return (
        <>
            {
                reflections.map((reflection: Reflection) => {
                    if (reflection.type === "observer") {
                        return (
                            <ObserverReflection
                                key={`reflection-${reflection}`}
                                position={reflection.position} />
                        )
                    } else if (reflection.type === "object") {
                        return (
                            <ObservableReflection
                                key={`reflection-object-${reflection.reflectedObject}`}
                                position={reflection.position}
                                color={reflection.color!} />
                        )
                    }
                })
            }
        </>
    )
}
