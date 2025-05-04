import clsx from "clsx"
import "./style.css"
import { Point } from "@/core/types"
import { mirrorWidth } from "../VerticalMirror"

type VerticalMirrorflectionProps = {
    position: Point,
    length: number,
}

export default function VerticalMirrorReflection({ position, length }: VerticalMirrorflectionProps) {
    return (
        <div className={clsx(
            "optics-reflection",
            "optics-reflection-mirror",
        )}>
            <div className="optics-vertical-mirror" style={{
                position: "absolute",
                top: position.y,
                left: position.x,
                height: length,
                width: mirrorWidth,
            }}>
            </div>
        </div>
    )
}
