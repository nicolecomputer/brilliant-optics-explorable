import ObserverReflection from "./reflection/Observer";
import ObservableReflection from "./reflection/Observable"
import { VirtualObject } from "@/core/types";

type ReflectionsProps = {
    virtualObjects: VirtualObject[]
}

export default function Reflections({ virtualObjects }: ReflectionsProps) {
    return (
        <>
            {
                virtualObjects.map((reflection: VirtualObject) => {
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
