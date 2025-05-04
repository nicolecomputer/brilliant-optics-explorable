"use client";

import "./observer-controls.css"

import Header from "@/component-library/components/Header";
import IconCard from "@/component-library/components/IconCard";
import { State } from "@/core/reducer/types";
import { useDispatch, useState } from "@/lib/StateContext";
import { ObserverIcon } from "@/mirror-lab/optics-components/Observer";
import PointEditor from "./editor/PointEditor";
import MovableEditor from "./editor/MovableEditor";


export default function ObserverControls() {
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

                <MovableEditor movable={state.observer.isMovable}
                    onChange={(newMovable) => {
                        dispatch({
                            type: "OBSERVER-SET-MOVABLE",
                            isMovable: newMovable
                        })
                    }} />
            </IconCard>
        </section>
    )
}
