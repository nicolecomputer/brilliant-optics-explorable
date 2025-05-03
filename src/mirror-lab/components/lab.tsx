/*
This is the base optics lab component.

It is meant to be wrapped in a <StateProvider /> or it will not work correctly
*/
"use client"

import Observer from "../optics-components/Observer"
import VerticalMirrors from "../optics-components/VerticalMirrors"
import "./style.css"

export default function MirrorLab() {
    return (
        <div className="mirror-lab">
            <Observer />
            <VerticalMirrors />
        </div>
    )
}
