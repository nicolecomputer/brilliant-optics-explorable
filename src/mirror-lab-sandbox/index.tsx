import "./styles.css";

import { StateProvider } from "@/lib/StateContext";
import MirrorLab from "@/mirror-lab/components/lab";
import ObserverControls from "./components/ObserverControls";
import MirrorControls from "./components/MirrorControls";
import ObservableObjectControls from "./components/ObservableControls";
import Share from "./components/Share";
import SimulatonControls from "./components/SimulationControls";

export default function MirrorLabSandbox() {
    return (
        <StateProvider>
            <div className="mirror-lab-sandbox">
                <header className="mirror-lab-page-header">
                    <h1>Optics Exploration</h1>
                    <div className="control-buttons">
                        <Share />
                    </div>
                </header>
                <main>
                    <div className="mirror-lab-sandbox-preview">
                        <MirrorLab />
                    </div>
                    <div className="mirror-lab-sandbox-controls">
                        <SimulatonControls />
                        <ObserverControls />
                        <MirrorControls />
                        <ObservableObjectControls />
                    </div>
                </main>
            </div>
        </StateProvider>
    )
}
