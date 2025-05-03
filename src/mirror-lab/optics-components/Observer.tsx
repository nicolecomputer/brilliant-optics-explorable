"use client"
import "./observer.css"

import clsx from 'clsx';
import { Point } from "@/core/types"
import { Eye } from "lucide-react"
import React, { useEffect, useRef } from 'react';

import { useDispatch, useState } from '@/lib/StateContext';
import { State } from '@/core/reducer/types';

type ObserverProps = {
    position: Point,
    isMovable: "all" | "x-only" | "y-only" | "none",
    onMove: (newLocation: Point) => void
}

export function Observer({ position, isMovable, onMove }: ObserverProps) {
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const elementRef = useRef<HTMLDivElement>(null);

    const markerDimensions = {
        width: 60,
        height: 50
    };

    // Handle mouse events for dragging
    useEffect(() => {
        const element = elementRef.current;
        if (!element || isMovable === "none") return;

        const handleMouseDown = (e: MouseEvent) => {
            if (!isMovable) return;
            setIsDragging(true);

            // Prevent text selection during drag
            e.preventDefault();
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            // Get parent container
            const parentElement = element.parentElement;
            if (!parentElement) return;

            const parentRect = parentElement.getBoundingClientRect();

            // Calculate position directly relative to parent - always drag from center
            const dragX = isMovable == "x-only" || isMovable == "all"
            const dragY = isMovable == "y-only" || isMovable == "all"

            const nextLocation = {
                x: dragX ? e.clientX - parentRect.left : position.x,
                y: dragY ? e.clientY - parentRect.top : position.y
            };

            // Constrain position within parent boundaries
            const constrainedLocation = {
                x: Math.max(0, Math.min(500, nextLocation.x)),
                y: Math.max(0, Math.min(500, nextLocation.y))
            };

            onMove(constrainedLocation);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        // Add event listeners
        element.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        // Clean up event listeners
        return () => {
            element.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isMovable, onMove, markerDimensions.height, markerDimensions.width, position.x, position.y]);

    return (
        <div
            ref={elementRef}
            className={clsx(
                "optics-observer",
                isMovable && "movable",
                isDragging && "is-dragging"
            )}
            style={{
                position: "absolute",
                width: markerDimensions.width,
                height: markerDimensions.height,
                top: position.y - markerDimensions.height / 2,
                left: position.x - markerDimensions.width / 2,
            }}
        >
            <Eye size={32} />
        </div>
    );
}

export default function WiredObserver() {
    const state: State = useState()!;
    const dispatch = useDispatch();

    return (
        <Observer
            position={state.observer.location}
            isMovable={"all"}
            onMove={(nextPoint) => {
                dispatch({
                    type: "OBSERVER-MOVE",
                    location: nextPoint
                });
            }}
        />
    );
}
