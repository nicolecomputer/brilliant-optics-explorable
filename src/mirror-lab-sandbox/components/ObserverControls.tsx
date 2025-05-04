"use client";

import "./observer-controls.css"

import Header from "@/component-library/components/Header";
import IconCard from "@/component-library/components/IconCard";
import { State } from "@/core/reducer/types";
import { Observer } from "@/core/types";
import { useDispatch, useState } from "@/lib/StateContext";
import { ObserverIcon } from "@/mirror-lab/optics-components/Observer";
import PointEditor from "./PointEditor";

type ObserverControlProps = {
    observer: Observer
}
export function ObserverControls({ observer }: ObserverControlProps) {
    const state: State = useState();
    const dispatch = useDispatch();

    return (
        <section className="optics-lab-control-section">
            <Header title="👀 Observer"></Header>
            <IconCard
                icon={(
                    <ObserverIcon />
                )}>
                <PointEditor
                    position={state.observer.position}
                    world={state.world}
                    onChange={(newPoint) => {
                        dispatch({
                            type: "OBSERVER-MOVE",
                            position: newPoint
                        })
                    }}
                />

                <ol>
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
