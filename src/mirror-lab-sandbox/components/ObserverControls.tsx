"use client";

import "./observer-controls.css"

import Header from "@/component-library/components/Header";
import IconCard from "@/component-library/components/IconCard";
import { State } from "@/core/reducer/types";
import { Observer } from "@/core/types";
import { useState } from "@/lib/StateContext";
import { ObserverIcon } from "@/mirror-lab/optics-components/Observer";

type ObserverControlProps = {
    observer: Observer
}
export function ObserverControls({ observer }: ObserverControlProps) {
    return (
        <section className="optics-lab-control-section">
            <Header title="👀 Observer"></Header>
            <IconCard
                icon={(
                    <ObserverIcon />
                )}>
                <ol>
                    <li>Position: [{observer.position.x}, {observer.position.y}]</li>
                    <li>Movable:  {observer.isMovable}</li>
                </ol>
            </IconCard>
        </section>
    )
}

export default function WiredObserverControls() {
    const state: State = useState();

    return (
        <ObserverControls observer={state.observer} />
    )
}
