import ObserverReflection from "./reflection/Observer";
import ObservableReflection from "./reflection/Observable"
import { VirtualObject } from "@/core/types";
import VerticalMirrorReflection from "./reflection/VerticalMirror";

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
                                key={crypto.randomUUID()}
                                position={reflection.position} />
                        )
                    } else if (reflection.type === "object") {
                        return (
                            <ObservableReflection
                                key={crypto.randomUUID()}
                                position={reflection.position}
                                color={reflection.color!} />
                        )
                    } else if (reflection.type === "mirror") {
                        return (
                            <VerticalMirrorReflection
                                key={crypto.randomUUID()}
                                position={reflection.position}
                                length={reflection.length!} />
                        )
                    }
                })
            }
        </>
    )
}
