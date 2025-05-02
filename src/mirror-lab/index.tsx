import Observer from "./optics-components/Observer"
import "./style.css"

export default function MirrorLab() {
    return (
        <div className="mirror-lab">
            <Observer position={{ x: 250, y: 250 }} isMovable={true} />
        </div>
    )
}
