"use client"

import "./mirror-controls.css"
import "./shared-styles.css"

import Header from "@/component-library/components/Header";
import IconCard from "@/component-library/components/IconCard";
import { State } from "@/core/reducer/types";
import { useDispatch, useState } from "@/lib/StateContext";
import PointEditor from "./editor/PointEditor";
import LengthEditor from "./editor/LengthEditor";
import IconButton from "@/component-library/components/IconButton";
import { CirclePlus } from "lucide-react";
import { SimulationLimits } from "@/core/limits";

export default function MirrorControls() {
    const state: State = useState();
    const dispatch = useDispatch();

    return (
        <section className="optics-lab-control-section">
            <Header title="🪞 Mirrors">
                <IconButton
                    disabled={state.mirrors.length >= SimulationLimits.numberOfMirrors}
                    onClick={() => {
                        dispatch({
                            type: "VERTICAL-MIRROR-ADD",
                        })
                    }}>
                    <CirclePlus size={26} />
                </IconButton>

            </Header>

            <div className="control-card-list">
                {state.mirrors.map(mirror => (
                    <IconCard
                        showRemove={true}
                        onRemove={() => {
                            dispatch({
                                type: "VERTICAL-MIRROR-REMOVE",
                                mirrorId: mirror.id
                            })
                        }}
                        key={`mirror-control-panel-${mirror.id}`}
                        icon={(
                            <MirrorIcon />
                        )}>
                        <PointEditor
                            position={mirror.position}
                            world={state.world}
                            onChange={(newPoint) => {
                                dispatch({
                                    type: "VERTICAL-MIRROR-MOVE",
                                    mirrorId: mirror.id,
                                    position: newPoint
                                })
                            }}
                        />
                        <LengthEditor
                            length={mirror.length}
                            minValue={30}
                            maxValue={state.world.height}
                            onChange={(newLength) => {
                                dispatch({
                                    type: "VERTICAL-MIRROR-CHANGE-LENGTH",
                                    mirrorId: mirror.id,
                                    length: newLength
                                })
                            }} />
                    </IconCard>

                ))}
            </div>
        </section>
    )
}

function MirrorIcon() {
    return (
        <div className="optics-lab-control-mirror-icon">
            {/* NOTE(NEW): Placeholder for mirror label in the future */}
            <h3> </h3>
        </div>
    )
}
