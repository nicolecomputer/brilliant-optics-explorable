import "./styles.css";

import Card from "@/component-library/components/Card";
import Header from "@/component-library/components/Header";
import MirrorLab from "@/mirror-lab";

export default function MirrorLabSandbox() {
    return (
        <div className="mirror-lab-sandbox">
            <header>
                <h1>Optics Exploration</h1>
                <div className="presets">
                    <p>presets</p>
                </div>
            </header>
            <main>
                <div className="mirror-lab-sandbox-controls">
                    <section>
                        <Header title="🔮 Simulation"></Header>
                    </section>
                    <section>
                        <Header title="👀 Observer"></Header>
                    </section>
                    <section>
                        <Header title="🪞 Mirrors">
                        </Header>
                        <Card><p>Controls</p></Card>
                    </section>
                    <section>
                        <Header title="🔺 Observables"></Header>
                    </section>
                </div>
                <div className="mirror-lab-sandbox-preview">
                    <MirrorLab />
                </div>
            </main>
        </div>
    )
}
