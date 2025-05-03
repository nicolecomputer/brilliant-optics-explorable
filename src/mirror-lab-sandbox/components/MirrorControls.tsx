"use client"

import "./mirror-controls.css"
import "./shared-styles.css"

import Header from "@/component-library/components/Header";
import IconCard from "@/component-library/components/IconCard";
import { State } from "@/core/reducer/types";
import { useState } from "@/lib/StateContext";

export default function MirrorControls() {
    const state: State = useState();

    return (
        <section className="optics-lab-control-section">
            <Header title="🪞 Mirrors">
            </Header>

            <div className="control-card-list">
                {state.mirrors.map(mirror => (
                    <IconCard
                        key={`mirror-control-panel-${mirror.id}`}
                        icon={(
                            <MirrorIcon />
                        )}>
                        <ol>
                            <li>Position: [{mirror.position.x}, {mirror.position.y}]</li>
                            <li>Length:  {mirror.length}</li>
                        </ol>
                    </IconCard>

                ))}
            </div>
        </section>
    )
}

function MirrorIcon() {
    return (
        <div className="optics-lab-control-mirror-icon">
            <h3>A</h3>
        </div>
    )
}
