/*
This is the base optics lab component.

It is meant to be wrapped in a <StateProvider /> or it will not work correctly
*/
"use client"

import { useState } from "@/lib/StateContext"
import Observables from "../optics-components/Observables"
import Observer from "../optics-components/Observer"
import Reflections from "../optics-components/Reflections"
import VerticalMirrors from "../optics-components/VerticalMirrors"
import "./style.css"
import { State } from "@/core/reducer/types"
import LightPath from "../optics-components/LightPath"
import { calculateVirtualRoom } from "@/core/optics"

export default function MirrorLab() {
    const state: State = useState()

    const virtualObjects = calculateVirtualRoom(state.observer, state.mirrors, state.observableObjects)

    return (
        <div className="mirror-lab"
            style={{
                width: state.world.width,
                height: state.world.height
            }}>
            <LightPath />
            <Observer />
            <VerticalMirrors />
            <Observables />
            <Reflections virtualObjects={virtualObjects} />
        </div>
    )
}
