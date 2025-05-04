"use client"

import "./simulation-controls.css"
import "./shared-styles.css"

import Header from "@/component-library/components/Header";
import { State } from "@/core/reducer/types";
import { useDispatch, useState } from "@/lib/StateContext";
import { SimulationOptions } from "@/core/types";

type ControlRowProps = {
    children: React.ReactNode,
    title: string
}
function ControlRow({ title, children }: ControlRowProps) {
    return (
        <div className="simulation-control-row">
            <h3>{title}</h3>
            <div className="control">
                {children}
            </div>
        </div>
    )

}

type SimulatonControlsProps = {
    simulationOptions: SimulationOptions,
    onShowLightPathChange: (newValue: boolean) => void,
    onShowVisiblePathChange: (newValue: boolean) => void,
    onUseExperimentalOpticsChange: (newValue: boolean) => void,
}
export function SimulatonControls({ simulationOptions, onShowLightPathChange, onShowVisiblePathChange, onUseExperimentalOpticsChange, }: SimulatonControlsProps) {
    return (
        <section className="optics-lab-control-section">
            <Header title="🔮 Simulation Controls">
            </Header>

            <ControlRow title="Show Light Path">
                <input type="checkbox"
                    checked={simulationOptions.showLightPath}
                    onChange={(e) => {
                        onShowLightPathChange(e.target.checked)
                    }} />
            </ControlRow>

            <ControlRow title="Show Visible Path">
                <input type="checkbox"
                    checked={simulationOptions.showVisiblePath}
                    onChange={(e) => {
                        onShowVisiblePathChange(e.target.checked)
                    }} />
            </ControlRow>
            <ControlRow title="Use Experimental Optics">
                <input type="checkbox"
                    checked={simulationOptions.useExperimentalOptics}
                    onChange={(e) => {
                        onUseExperimentalOpticsChange(e.target.checked)
                    }
                    } />
            </ControlRow>

        </section >
    )
}

export default function WiredSimulatonControls() {
    const state: State = useState();
    const dispatch = useDispatch();

    return <SimulatonControls
        simulationOptions={state.simulationOptions}
        onShowLightPathChange={(newValue: boolean) => {
            dispatch({
                type: "SIMULATION-OPTION-SET-LIGHT-PATH",
                value: newValue
            })
        }}
        onShowVisiblePathChange={(newValue: boolean) => {
            dispatch({
                type: "SIMULATION-OPTION-SET-VISIBLE-PATH",
                value: newValue
            })
        }}
        onUseExperimentalOpticsChange={(newValue: boolean) => {
            dispatch({
                type: "SIMULATION-OPTION-SET-USE-EXPERIMENTAL-OPTICS",
                value: newValue
            })
        }}
    />
}
