import { Point, World } from "@/core/types"
import "./point-editor.css"

type PointEditorProps = {
    position: Point,
    world: World
    onChange: (newPoint: Point) => void
}

export default function PointEditor({ position, world, onChange }: PointEditorProps) {
    return (
        <div className="mirror-lab-point-editor">
            <h3>Position</h3>
            <div className="point-editor-controls">
                <div className="coord-editor">
                    <p>x: </p>
                    <input
                        type="number"
                        min={0}
                        max={world.width}
                        value={position.x}
                        onChange={(e) => {
                            onChange({
                                x: e.target.valueAsNumber,
                                y: position.y
                            })
                        }} />
                </div>
                <div className="coord-editor">
                    <p>y: </p>
                    <input
                        type="number"
                        min={0}
                        max={world.height}
                        value={position.y}
                        onChange={(e) => {
                            onChange({
                                x: position.x,
                                y: e.target.valueAsNumber
                            })
                        }} />
                </div>
            </div>
        </div>
    )
}
