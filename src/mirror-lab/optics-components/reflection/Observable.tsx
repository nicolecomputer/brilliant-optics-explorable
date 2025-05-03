import clsx from "clsx"
import "./style.css"
import { observerDimensions } from "../Observer"
import { Point } from "@/core/types"
import { mirrorWidth } from "../VerticalMirror"
import { observableDimensions, ObservableTriangle } from "../Observable"

type ObserverableReflectionProps = {
    position: Point,
    color: string
}

export default function ObservableReflection({ position, color }: ObserverableReflectionProps) {
    return (
        <div className={clsx(
            "optics-reflection",
            "optics-reflection-observable",
        )}
            style={{
                position: "absolute",
                width: observerDimensions.width,
                height: observerDimensions.height,
                top: position.y - observerDimensions.height / 2,
                left: position.x - observerDimensions.width / 2 + mirrorWidth,
            }}
        >
            <ObservableTriangle
                width={observableDimensions.width}
                height={observableDimensions.height}
                isMovable={false}
                isDragging={false}
                color={color}
            />
        </div>
    )
}
