import { mirrorWidth } from "@/mirror-lab/optics-components/VerticalMirror";
import { VerticalMirror, Observer, Reflection, Point, ObservableObject, Identifier } from "./types";

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


type LightPath = {
    reflectedObject: Identifier,
    points: Point[]
}

export function lightPaths(observer: Observer, mirrors: VerticalMirror[], observableObjects: ObservableObject[]): LightPath[] {
    const paths: LightPath[] = [];

    // Check each observable object
    for (const obj of observableObjects) {
        // Skip directly visible objects - we only want reflection paths

        // Check single-reflection paths
        for (const mirror of mirrors) {
            const bouncePoint = findReflectionBouncePoint(observer.position, obj.position, mirror);

            // If we found a valid bounce point
            if (bouncePoint) {
                // Verify that both segments of the path are clear from other mirrors
                const otherMirrors = mirrors.filter(m => m.id !== mirror.id);

                if (isDirectlyVisible(observer.position, bouncePoint, otherMirrors) &&
                    isDirectlyVisible(bouncePoint, obj.position, otherMirrors)) {
                    paths.push({
                        reflectedObject: obj.id,
                        points: [
                            obj.position,     // Start at the object
                            bouncePoint,      // Bounce point on the mirror
                            observer.position // End at the observer
                        ]
                    });
                }
            }
        }

        // We could add multiple-reflection logic here in the future
    }

    return paths;
}

// Check if there's a direct line of sight between two points
function isDirectlyVisible(from: Point, to: Point, mirrors: VerticalMirror[]): boolean {
    // Edge case: if points are the same, they're always visible
    if (from.x === to.x && from.y === to.y) {
        return true;
    }

    // For each mirror, check if it blocks the line segment
    for (const mirror of mirrors) {
        // For vertical mirrors, x is constant
        const mirrorX = mirror.position.x;

        // Check if mirror is between the points (x-wise)
        if ((from.x < mirrorX && to.x > mirrorX) || (from.x > mirrorX && to.x < mirrorX)) {
            // Handle case where from.x == to.x (vertical line)
            if (from.x === to.x) {
                return true; // Vertical line can't intersect vertical mirror (parallel)
            }

            // Calculate intersection y-coordinate using line equation
            const t = (mirrorX - from.x) / (to.x - from.x);
            const intersectionY = from.y + t * (to.y - from.y);

            // Check if intersection point is within mirror bounds
            const mirrorTop = mirror.position.y;
            const mirrorBottom = mirror.position.y + mirror.length;

            if (intersectionY >= mirrorTop && intersectionY <= mirrorBottom) {
                return false; // Mirror blocks the view
            }
        }
    }

    return true; // No mirrors block the view
}

// Find the bounce point on a mirror for a reflection path
function findReflectionBouncePoint(observer: Point, object: Point, mirror: VerticalMirror): Point | null {
    const mirrorX = mirror.position.x;

    // Calculate the reflected object position (reflection across the mirror's line)
    const reflectedX = 2 * mirrorX - object.x;
    const reflectedObject = { x: reflectedX, y: object.y };

    // Edge cases
    if (observer.x === mirrorX || object.x === mirrorX) {
        return null; // Observer or object is exactly on the mirror - no reflection possible
    }

    // Check if mirror is between observer and reflected object (valid reflection scenario)
    if (!((observer.x < mirrorX && reflectedObject.x > mirrorX) ||
        (observer.x > mirrorX && reflectedObject.x < mirrorX))) {
        return null; // Mirror isn't between observer and reflected object
    }

    // Find where the line from observer to reflected object intersects the mirror

    // Handle case of horizontal line (observer.y == reflectedObject.y)
    if (observer.y === reflectedObject.y) {
        const intersectionY = observer.y;

        // Check if intersection is within mirror bounds
        const mirrorTop = mirror.position.y;
        const mirrorBottom = mirror.position.y + mirror.length;

        if (intersectionY >= mirrorTop && intersectionY <= mirrorBottom) {
            return { x: mirrorX, y: intersectionY };
        } else {
            return null; // Intersection outside mirror bounds
        }
    }

    // Normal case - calculate intersection y-coordinate
    const slope = (reflectedObject.y - observer.y) / (reflectedObject.x - observer.x);
    const intersectionY = observer.y + (mirrorX - observer.x) * slope;

    // Check if intersection is within mirror bounds
    const mirrorTop = mirror.position.y;
    const mirrorBottom = mirror.position.y + mirror.length;

    if (intersectionY < mirrorTop || intersectionY > mirrorBottom) {
        return null; // Intersection outside mirror bounds
    }

    return { x: mirrorX + mirrorWidth / 2, y: intersectionY };
}
