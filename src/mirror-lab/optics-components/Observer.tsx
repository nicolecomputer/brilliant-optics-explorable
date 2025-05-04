"use client"
import "./observer.css"

import clsx from 'clsx';
import { Point, World } from "@/core/types"
import { Eye } from "lucide-react"
import React, { useEffect, useRef } from 'react';

import { useDispatch, useState } from '@/lib/StateContext';
import { State } from '@/core/reducer/types';

export const observerDimensions = {
    width: 60,
    height: 50
};

type MovableState = "all" | "x-only" | "y-only" | "none";

type ObserverProps = {
    position: Point,
    world: World,
    isMovable: MovableState,
    onMove: (newPosition: Point) => void
}

export function Observer({ position, isMovable, onMove, world }: ObserverProps) {
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const elementRef = useRef<HTMLDivElement>(null);



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
                x: Math.round(Math.max(0, Math.min(world.width, nextLocation.x))),
                y: Math.round(Math.max(0, Math.min(world.height, nextLocation.y)))
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
    }, [isDragging, isMovable, onMove, position.x, position.y, world.height, world.width]);

    return (
        <div
            ref={elementRef}
            className={clsx(
                "optics-observer",
                isMovable !== "none" && "movable",
                isDragging && "is-dragging"
            )}
            style={{
                position: "absolute",
                width: observerDimensions.width,
                height: observerDimensions.height,
                top: position.y - observerDimensions.height / 2,
                left: position.x - observerDimensions.width / 2,
            }}
        >
            <Eye size={observerDimensions.height * (2 / 3)} />
        </div>
    );
}

export default function WiredObserver() {
    const state: State = useState()!;
    const dispatch = useDispatch();

    return (
        <Observer
            position={state.observer.position}
            isMovable={state.observer.isMovable}
            world={state.world}
            onMove={(nextPoint) => {
                dispatch({
                    type: "OBSERVER-MOVE",
                    position: nextPoint
                });
            }}
        />
    );
}

// This is used to show a non-interactive Observer Icon and is grouped here for
//  keeping code in sync
export function ObserverIcon() {
    return (
        <div
            className={clsx(
                "optics-observer",
                "movable"
            )}
            style={{
                width: observerDimensions.width,
                height: observerDimensions.height,
                cursor: "unset"
            }}
        >
            <Eye size={32} />
        </div>
    )
}
