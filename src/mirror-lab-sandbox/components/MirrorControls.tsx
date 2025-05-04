"use client"

import "./mirror-controls.css"
import "./shared-styles.css"

import Header from "@/component-library/components/Header";
import IconCard from "@/component-library/components/IconCard";
import { State } from "@/core/reducer/types";
import { useDispatch, useState } from "@/lib/StateContext";
import PointEditor from "./PointEditor";
import LengthEditor from "./LengthEditor";

export default function MirrorControls() {
    const state: State = useState();
    const dispatch = useDispatch();

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
            <h3>A</h3>
        </div>
    )
}
