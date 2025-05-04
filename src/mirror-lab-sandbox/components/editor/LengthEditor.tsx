import "./editor.css"
import "./length-editor.css"

type LengthEditorProps = {
    length: number,
    minValue: number,
    maxValue: number,
    onChange: (newLength: number) => void
}

export default function LengthEditor({ length, onChange, maxValue, minValue }: LengthEditorProps) {
    return (
        <div className="mirror-lab-length-editor editor-row">
            <h3>Length</h3>
            <input
                type="number"
                min={minValue}
                max={maxValue}
                value={length}
                onChange={(e) => {
                    onChange(e.target.valueAsNumber)
                }} />
        </div>
    )
}
