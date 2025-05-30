import { VerticalMirror } from "@/core/types"
import "./vertical-mirror.css"

type VerticalMirrorProps = {
    mirror: VerticalMirror
}
export const mirrorWidth = 6
export default function VerticalMirrorComponent({ mirror }: VerticalMirrorProps) {
    return (
        <div className="optics-vertical-mirror" style={{
            position: "absolute",
            top: mirror.position.y,
            left: mirror.position.x,
            height: mirror.length,
            width: mirrorWidth,
        }}>
        </div>
    )
}
