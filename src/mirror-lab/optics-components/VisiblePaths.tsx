import { State } from "@/core/reducer/types"
import { Observer, VirtualObject } from "@/core/types"
import { useState } from "@/lib/StateContext"

type VisiblePathsProps = {
    virtualObjects: VirtualObject[],
    observer: Observer
}

export default function VisiblePaths({ virtualObjects, observer }: VisiblePathsProps) {
    const state: State = useState()
    const { width, height } = state.world;

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${width} ${height}`}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }}>
            {virtualObjects.map((virtualObj: VirtualObject) => (
                virtualObj.type == "object" && (
                    <line
                        key={crypto.randomUUID()}
                        x1={observer.position.x}
                        y1={observer.position.y}
                        x2={virtualObj.position.x + 3}
                        y2={virtualObj.position.y}
                        stroke={virtualObj.color || "#ffffff"}
                        strokeWidth={3}
                        strokeDasharray="5,5"
                        strokeLinecap="round"
                    />
                )
            ))}
        </svg>
    );
}
