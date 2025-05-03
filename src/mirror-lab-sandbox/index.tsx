import "./styles.css";

import Card from "@/component-library/components/Card";
import Header from "@/component-library/components/Header";
import { StateProvider } from "@/lib/StateContext";
import MirrorLab from "@/mirror-lab/components/lab";
import ObserverControls from "./components/ObserverControls";

export default function MirrorLabSandbox() {
    return (
        <StateProvider>
            <div className="mirror-lab-sandbox">
                <header>
                    <h1>Optics Exploration</h1>
                    <div className="presets">
                        <p>presets</p>
                    </div>
                </header>
                <main>
                    <div className="mirror-lab-sandbox-controls">
                        <ObserverControls />
                        <section className="optics-lab-control-section">
                            <Header title="🪞 Mirrors">
                            </Header>
                            <Card><p>Controls</p></Card>
                        </section>
                        <section className="optics-lab-control-section">
                            <Header title="🔺 Observables"></Header>
                        </section>
                    </div>
                    <div className="mirror-lab-sandbox-preview">
                        <MirrorLab />
                    </div>
                </main>
            </div>
        </StateProvider>
    )
}
