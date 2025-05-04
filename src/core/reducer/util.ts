import { observableObjectColors } from "@/component-library/color";
import { ObservableObject } from "../types";

export function getRandomInt(start: number, end: number): number {
    // Validate input
    if (!Number.isInteger(start) || !Number.isInteger(end)) {
        throw new Error("Both start and end must be integers");
    }

    if (start > end) {
        throw new Error("Start value must be less than or equal to end value");
    }

    // Calculate the range (add 1 to include the end value)
    const range = end - start + 1;

    // Generate a random number within the range and shift by start
    return Math.floor(Math.random() * range) + start;
}

export function getNextAvailableColor(observableObjects: ObservableObject[]): string {
    const colorsInUse = observableObjects.map(o => o.color)

    for (const color of Object.values(observableObjectColors)) {
        if (!colorsInUse.includes(color)) {
            return color
        }
    }

    return "black"
}
