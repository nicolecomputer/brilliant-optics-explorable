import clsx from 'clsx';

import { Point } from "@/core/types"
import "./observer.css"
import { Eye } from "lucide-react"

type ObserverProps = {
    position: Point,
    isMovable: boolean
}
export default function Observer({ position, isMovable }: ObserverProps) {
    const markerDimensions = {
        width: 60,
        height: 50
    }
    return (
        <div
            className={clsx(
                "optics-observer",
                isMovable && "movable"
            )}
            style={{
                position: "absolute",
                width: markerDimensions.width,
                height: markerDimensions.height,
                bottom: position.y - markerDimensions.height / 2,
                right: position.x - markerDimensions.width / 2
            }}>
            <Eye size={32} />
        </div>
    )
}
