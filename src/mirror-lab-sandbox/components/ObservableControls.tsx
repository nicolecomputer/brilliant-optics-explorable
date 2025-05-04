"use client"

import "./shared-styles.css"
import "./observable-controls.css"

import { CirclePlus } from "lucide-react";

import IconButton from "@/component-library/components/IconButton";
import Header from "@/component-library/components/Header";
import IconCard from "@/component-library/components/IconCard";
import { State } from "@/core/reducer/types";
import { useDispatch, useState } from "@/lib/StateContext";
import { observableDimensions, ObservableTriangle } from "@/mirror-lab/optics-components/Observable";
import { SimulationLimits } from "@/core/limits";
import PointEditor from "./editor/PointEditor";
import MovableEditor from "./editor/MovableEditor";

export default function ObservableObjectControls() {
    const state: State = useState();
    const dispatch = useDispatch();

    return (
        <section className="optics-lab-control-section">
            <Header title="🔺 Observables">
                <IconButton
                    disabled={state.observableObjects.length >= SimulationLimits.numberOfObservableObjects}
                    onClick={() => {
                        dispatch({
                            type: "OBSERVABLE-OBJECT-ADD",
                        })
                    }}>
                    <CirclePlus size={26} />
                </IconButton>
            </Header>

            <div className="control-card-list">
                {state.observableObjects.map(observable => (
                    <IconCard
                        key={`observable-control-panel-${observable.id}`}
                        icon={(
                            <ObservableObjectIcon color={observable.color} />
                        )}
                        showRemove={true}
                        onRemove={() => {
                            dispatch({
                                type: "OBSERVABLE-OBJECT-REMOVE",
                                observableObjectId: observable.id
                            })
                        }}
                    >
                        <PointEditor
                            position={observable.position}
                            world={state.world}
                            onChange={(newPoint) => {
                                dispatch({
                                    type: "OBSERVABLE-OBJECT-MOVE",
                                    observableObjectId: observable.id,
                                    position: newPoint
                                })
                            }}
                        />
                        <MovableEditor movable={observable.isMovable}
                            onChange={(newMovable) => {
                                dispatch({
                                    type: "OBSERVABLE-OBJECT-SET-MOVABLE",
                                    observableObjectId: observable.id,
                                    isMovable: newMovable
                                })
                            }} />

                    </IconCard>
                ))}
            </div>
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
