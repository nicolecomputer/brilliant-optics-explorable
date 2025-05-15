"use client"
import "./sandbox-controls.css"

import { State } from "@/core/reducer/types";
import MirrorControls from "../MirrorControls";
import ObservableObjectControls from "../ObservableControls";
import ObserverControls from "../ObserverControls";
import SimulatonControls from "../SimulationControls";
import { useDispatch, useState } from "@/lib/StateContext";
import { useCallback } from "react";
import React from "react";

export default function SandboxControls() {
    const state: State = useState();
    const dispatch = useDispatch();
    const [isDragging, setIsDragging] = React.useState(false);
    const startXRef = React.useRef(0);
    const startWidthRef = React.useRef(0);

    // Handle the start of dragging
    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
        startXRef.current = e.clientX;
        startWidthRef.current = state.editorOptions.panelWidth;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [state.editorOptions.panelWidth]);

    // Handle mouse movement during dragging
    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startXRef.current;
        const newWidth = Math.max(200, Math.min(800, startWidthRef.current + deltaX));

        dispatch({
            type: 'SET_EDITOR_OPTION',
            payload: {
                key: 'panelWidth',
                value: newWidth
            }
        });
    }, [isDragging, dispatch]);

    // Handle the end of dragging
    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    return (
        <div className="mirror-lab-sandbox-controls">
            <div
                className={`resize-control ${isDragging ? 'dragging' : ''}`}
                onMouseDown={handleMouseDown}
            ></div>
            <div className="editor-pane" style={{
                width: state.editorOptions.panelWidth
            }}>
                <SimulatonControls />
                <ObserverControls />
                <MirrorControls />
                <ObservableObjectControls />
            </div>
        </div>
    )
}
