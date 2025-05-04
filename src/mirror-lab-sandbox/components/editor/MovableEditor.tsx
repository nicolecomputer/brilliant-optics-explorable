import { MovableState } from "@/core/types"
import "./editor.css"
import "./length-editor.css"

type MovableEditorProps = {
    movable: MovableState
    onChange: (newMovable: MovableState) => void
}

const labels: { [key in MovableState]: string } = {
    "all": "All Directions",
    "none": "No Movement",
    "x-only": "X-Axis Only",
    "y-only": "Y-Axis Only"
}

export default function MovableEditor({ movable, onChange }: MovableEditorProps) {
    return (
        <div className="mirror-lab-length-editor editor-row">
            <h3>Movable</h3>
            <select
                value={movable}
                onChange={(e) => {
                    onChange(e.target.value as MovableState)
                }}>
                {Object.entries(labels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>
        </div>
    )
}
