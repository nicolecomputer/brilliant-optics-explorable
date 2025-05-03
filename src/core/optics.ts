import { VerticalMirror, Observer, Reflection, Point, ObservableObject } from "./types";

export function simpleCalculateReflections(observer: Observer, mirrors: VerticalMirror[], observableObjects: ObservableObject[]): Reflection[] {
    const reflections: Reflection[] = [];

    // For each mirror, calculate potential reflection of the observer
    for (const mirror of mirrors) {
        // For a vertical mirror, check if the observer is within the y-range of the mirror
        // Assuming the mirror extends downward from its position point by its length
        const mirrorTopY = mirror.position.y;
        const mirrorBottomY = mirror.position.y + mirror.length;

        // Check if observer's y position is within the mirror's range
        if (observer.position.y >= mirrorTopY && observer.position.y <= mirrorBottomY) {
            // Calculate the reflection across the vertical line
            const reflectedX = 2 * mirror.position.x - observer.position.x;

            // Create the reflection point
            const reflectionPoint: Point = {
                x: reflectedX,
                y: observer.position.y
            };

            // Add to reflections
            reflections.push({
                reflectedObject: "observer", // Using "observer" as ID since Observer doesn't have an id property
                type: "observer",
                position: reflectionPoint
            });
        }


        // Calculate potential reflections for each observable object
        for (const obj of observableObjects) {
            // Check if object's y position is within the mirror's range
            if (obj.position.y >= mirrorTopY && obj.position.y <= mirrorBottomY) {
                // Calculate the reflection across the vertical line
                const reflectedX = 2 * mirror.position.x - obj.position.x;

                // Create the reflection point
                const reflectionPoint: Point = {
                    x: reflectedX,
                    y: obj.position.y
                };

                // Add to reflections
                reflections.push({
                    reflectedObject: obj.id,
                    type: "object",
                    position: reflectionPoint,
                    color: obj.color
                });
            }
        }
    }

    return reflections;
}
