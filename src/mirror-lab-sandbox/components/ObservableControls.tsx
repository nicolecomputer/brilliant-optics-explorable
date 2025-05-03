"use client"

import "./observable-controls.css"

import Header from "@/component-library/components/Header";
import IconCard from "@/component-library/components/IconCard";
import { State } from "@/core/reducer/types";
import { useState } from "@/lib/StateContext";
import { observableDimensions, ObservableTriangle } from "@/mirror-lab/optics-components/Observable";

export default function ObservableObjectControls() {
    const state: State = useState();

    return (
        <section className="optics-lab-control-section">
            <Header title="🔺 Observables">
            </Header>

            {state.observableObjects.map(observable => (
                <IconCard
                    key={`observable-control-panel-${observable.id}`}
                    icon={(
                        <ObservableObjectIcon color={observable.color} />
                    )}>
                    <ol>
                        <li>Position: [{observable.position.x}, {observable.position.y}]</li>
                        <li>Movable:  {observable.isMovable}</li>
                    </ol>
                </IconCard>

            ))}
        </section>
    )
}

type ObservableObjectIconProps = {
    color: string
}

function ObservableObjectIcon({ color }: ObservableObjectIconProps) {
    return (
        <div className="optics-lab-control-observable-object-icon">
            <ObservableTriangle width={observableDimensions.width} height={observableDimensions.height} isMovable={true} isDragging={false} color={color}></ObservableTriangle>
        </div>
    )
}
