"use client"
import "./observable.css"

import clsx from 'clsx';
import { ObservableObject, Point } from "@/core/types"
import React, { useEffect, useRef } from 'react';

// import { useDispatch, useState } from '@/lib/StateContext';
// import { State } from '@/core/reducer/types';

export const observableDimensions = {
    width: 60,
    height: 60
};

type ObserverableProps = {
    observable: ObservableObject
    onMove: (newPosition: Point) => void
}

export default function Observable({ observable, onMove }: ObserverableProps) {
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const elementRef = useRef<HTMLDivElement>(null);



    // Handle mouse events for dragging
    useEffect(() => {
        const element = elementRef.current;
        if (!element || observable.isMovable === "none") return;

        const handleMouseDown = (e: MouseEvent) => {
            if (!observable.isMovable) return;
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
            const dragX = observable.isMovable == "x-only" || observable.isMovable == "all"
            const dragY = observable.isMovable == "y-only" || observable.isMovable == "all"

            const nextLocation = {
                x: dragX ? e.clientX - parentRect.left : observable.position.x,
                y: dragY ? e.clientY - parentRect.top : observable.position.y
            };

            // Constrain position within parent boundaries
            const constrainedLocation = {
                x: Math.round(Math.max(0, Math.min(500, nextLocation.x))),
                y: Math.round(Math.max(0, Math.min(500, nextLocation.y)))
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
    }, [isDragging, observable.isMovable, onMove, observable.position.x, observable.position.y]);

    return (
        <div
            ref={elementRef}
            className={clsx(
                "optics-observable",
                observable.isMovable !== "none" && "movable",
                isDragging && "is-dragging"
            )}
            style={{
                position: "absolute",
                width: observableDimensions.width,
                height: observableDimensions.height,
                top: observable.position.y - observableDimensions.height / 2,
                left: observable.position.x - observableDimensions.width / 2,
            }}
        >
            <ObservableTriangle
                width={observableDimensions.width}
                height={observableDimensions.height}
                isMovable={observable.isMovable !== "none"}
                isDragging={isDragging}
                color={observable.color}
            />
        </div>
    );
}

type EquilateralTriangleProps = {
    width: number,
    height: number,
    isMovable: boolean,
    isDragging: boolean,
    color: string
}

export function ObservableTriangle({ width, height, isMovable, isDragging, color }: EquilateralTriangleProps) {
    // Calculate points for an equilateral triangle centered in the box
    const centerX = width / 2;
    const topY = height * 0.1;  // 10% from the top
    const bottomY = height * 0.8; // 80% from the top

    // Calculate the bottom points using equilateral triangle properties
    const halfWidth = (bottomY - topY) / Math.sqrt(3);

    // Define the three points of the triangle
    const topPoint = `${centerX},${topY}`;
    const bottomLeftPoint = `${centerX - halfWidth},${bottomY}`;
    const bottomRightPoint = `${centerX + halfWidth},${bottomY}`;

    // Combine the points into a polygon
    const points = `${topPoint} ${bottomRightPoint} ${bottomLeftPoint}`;

    let activeFilter: string | undefined = undefined
    if (isMovable) {
        activeFilter = "url(#movableShadow)"
    }
    if (isDragging) {
        activeFilter = "url(#draggingShadow)"
    }

    return (
        <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="movableShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.14" />
                </filter>
                <filter id="draggingShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.45" />
                </filter>
            </defs>
            <polygon
                points={points}
                filter={activeFilter}
                fill={color}
            />
        </svg>
    );
};
