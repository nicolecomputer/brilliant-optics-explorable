import "./styles.css";

import { StateProvider } from "@/lib/StateContext";
import MirrorLab from "@/mirror-lab/components/lab";
import Share from "./components/Share";
import SandboxControls from "./components/editor/SandboxControls";

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
                    <SandboxControls />
                </main>
            </div>
        </StateProvider>
    )
}
