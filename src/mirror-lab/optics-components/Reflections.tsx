import { State } from "@/core/reducer/types";
import ObserverReflection from "./reflection/Observer";
import { useState } from "@/lib/StateContext";
import { simpleCalculateReflections } from "@/core/optics";
import { Reflection } from "@/core/types";

export default function Reflections() {
    const state: State = useState()

    const reflections = simpleCalculateReflections(state.observer, state.mirrors)

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
                    }
                })
            }
        </>
    )
}
