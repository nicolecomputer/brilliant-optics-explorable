import clsx from "clsx"
import "./style.css"
import { observerDimensions } from "../Observer"
import { Point } from "@/core/types"

type ObserverReflectionProps = {
    position: Point
}
export default function ObserverReflection({ position }: ObserverReflectionProps) {
    return (
        <div className={clsx(
            "optics-reflection",
            "optics-reflection-observer",
        )}
            style={{
                position: "absolute",
                width: observerDimensions.width,
                height: observerDimensions.height,
                top: position.y - observerDimensions.height / 2,
                left: position.x - observerDimensions.width / 2,

            }}
        >
        </div>
    )
}
