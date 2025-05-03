"use client";

import "./observer-controls.css"

import Card from "@/component-library/components/Card";
import Header from "@/component-library/components/Header";
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
            <Card>
                <div className="observer-card-inner">
                    <div className="icon">
                        <ObserverIcon />
                    </div>
                    <ol>
                        <li>Position: [{observer.position.x}, {observer.position.y}]</li>
                        <li>Movable:  {observer.isMovable}</li>
                    </ol>
                </div>
            </Card>
        </section>
    )
}

export default function WiredObserverControls() {
    const state: State = useState()!;
    // const dispatch = useDispatch();

    return (
        <ObserverControls observer={state.observer} />
    )
}
