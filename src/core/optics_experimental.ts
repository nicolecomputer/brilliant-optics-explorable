import { mirrorWidth } from "@/mirror-lab/optics-components/VerticalMirror";
import { VerticalMirror, Observer, VirtualObject, Point, ObservableObject, LightPath, World } from "./types";

/**
 * Calculate all virtual objects created by mirror reflections
 * Now supports multiple reflections, including mirrors reflecting other mirrors
 */
export function calculateVirtualRoom(observer: Observer, mirrors: VerticalMirror[], observableObjects: ObservableObject[], world: World): VirtualObject[] {
    const reflections: VirtualObject[] = [];
    const MAX_REFLECTION_DEPTH = 3; // Maximum number of reflections to simulate

    // Step 1: Add primary reflections (one bounce)
    addPrimaryReflections(observer, mirrors, observableObjects, reflections);

    // Step 2: Add multiple reflections (mirrors reflecting mirrors)
    addMultipleReflections(observer, mirrors, reflections, MAX_REFLECTION_DEPTH);

    // Step 3: Filter reflections that would be outside the world bounds
    return reflections.filter(reflection =>
        reflection.position.x >= 0 &&
        reflection.position.x <= world.width &&
        reflection.position.y >= 0 &&
        reflection.position.y <= world.height
    );
}

/**
 * Add primary (single bounce) reflections of observer and objects
 */
function addPrimaryReflections(
    observer: Observer,
    mirrors: VerticalMirror[],
    observableObjects: ObservableObject[],
    reflections: VirtualObject[]
) {
    // For each mirror, calculate potential reflections
    for (const mirror of mirrors) {
        const mirrorTopY = mirror.position.y;
        const mirrorBottomY = mirror.position.y + mirror.length;
        const mirrorX = mirror.position.x;

        // Process observer reflections in the mirror
        if (observer.position.y >= mirrorTopY && observer.position.y <= mirrorBottomY) {
            // Calculate the reflection across the vertical line
            const reflectedObserverX = 2 * mirrorX - observer.position.x;
            const reflectedObserver: Point = {
                x: reflectedObserverX,
                y: observer.position.y
            };

            reflections.push({
                reflectedObject: "observer",
                type: "observer",
                position: reflectedObserver
            });
        }

        // Process observable objects reflections
        for (const obj of observableObjects) {
            // Calculate the reflection across the vertical line
            const reflectedObjX = 2 * mirrorX - obj.position.x;
            const reflectedObj: Point = {
                x: reflectedObjX,
                y: obj.position.y
            };

            // Calculate the bounce point - where the line from observer to
            // the reflected object intersects the mirror
            const bouncePoint = calculateBouncePoint(observer.position, reflectedObj, mirrorX);

            // If we have a valid bounce point and it's within the mirror's y-range
            if (bouncePoint &&
                bouncePoint.y >= mirrorTopY &&
                bouncePoint.y <= mirrorBottomY) {

                // Check if there's a clear path from observer to bounce point
                // (no other mirrors in the way)
                const otherMirrors = mirrors.filter(m => m.id !== mirror.id);
                if (isDirectlyVisible(observer.position, bouncePoint, otherMirrors)) {
                    reflections.push({
                        reflectedObject: obj.id,
                        type: "object",
                        position: reflectedObj,
                        color: obj.color
                    });
                }
            }
        }

        // Add mirror reflections of other mirrors
        for (const otherMirror of mirrors) {
            if (mirror.id === otherMirror.id) continue; // Skip self-reflection

            // Calculate reflected position of other mirror
            const reflectedMirrorX = 2 * mirrorX - otherMirror.position.x;
            const reflectedMirror: VirtualObject = {
                reflectedObject: otherMirror.id,
                type: "mirror",
                position: {
                    x: reflectedMirrorX,
                    y: otherMirror.position.y
                },
                length: otherMirror.length
            };

            // Only add if mirrors could reflect each other (y-ranges overlap)
            if (!(otherMirror.position.y + otherMirror.length < mirrorTopY ||
                otherMirror.position.y > mirrorBottomY)) {
                reflections.push(reflectedMirror);
            }
        }
    }
}

/**
 * Add multiple reflections by creating virtual mirrors and reflecting through them
 */
function addMultipleReflections(
    observer: Observer,
    mirrors: VerticalMirror[],
    reflections: VirtualObject[],
    maxDepth: number
) {
    // This keeps track of mirrors we've already processed to avoid infinite recursion
    const processedMirrorPairs = new Set<string>();

    // First, gather all virtual mirrors (reflections of type "mirror")
    let virtualMirrors: VirtualObject[] = reflections.filter(r => r.type === "mirror");

    // For subsequent bounces (depth > 1)
    for (let depth = 1; depth < maxDepth; depth++) {
        const newVirtualMirrors: VirtualObject[] = [];

        // For each real mirror and each virtual mirror from previous iteration
        for (const realMirror of mirrors) {
            for (const virtualMirror of virtualMirrors) {
                // Create a unique ID for this mirror pair to avoid duplicates
                const mirrorPairId = `${realMirror.id}-${virtualMirror.reflectedObject}-${depth}`;
                if (processedMirrorPairs.has(mirrorPairId)) continue;
                processedMirrorPairs.add(mirrorPairId);

                // Calculate reflection of objects in this virtual mirror
                const mirrorTopY = virtualMirror.position.y;
                const mirrorBottomY = virtualMirror.position.y + (virtualMirror.length || 0);
                const mirrorX = virtualMirror.position.x;

                // Reflect the observer in this virtual mirror
                if (observer.position.y >= mirrorTopY && observer.position.y <= mirrorBottomY) {
                    const reflectedObserverX = 2 * mirrorX - observer.position.x;
                    reflections.push({
                        reflectedObject: `observer-${depth}-${virtualMirror.reflectedObject}`,
                        type: "observer",
                        position: {
                            x: reflectedObserverX,
                            y: observer.position.y
                        }
                    });
                }

                // Reflect real mirrors in virtual mirrors to create next level virtual mirrors
                for (const otherRealMirror of mirrors) {
                    if (otherRealMirror.id === realMirror.id) continue;

                    const reflectedMirrorX = 2 * mirrorX - otherRealMirror.position.x;
                    const newVirtualMirror: VirtualObject = {
                        reflectedObject: `${otherRealMirror.id}-${depth}-${virtualMirror.reflectedObject}`,
                        type: "mirror",
                        position: {
                            x: reflectedMirrorX,
                            y: otherRealMirror.position.y
                        },
                        length: otherRealMirror.length
                    };

                    // Only add if y-ranges overlap
                    if (!(otherRealMirror.position.y + otherRealMirror.length < mirrorTopY ||
                        otherRealMirror.position.y > mirrorBottomY)) {
                        newVirtualMirrors.push(newVirtualMirror);
                        reflections.push(newVirtualMirror);
                    }
                }
            }
        }

        // Use these new virtual mirrors for the next iteration
        virtualMirrors = newVirtualMirrors;

        // If no new virtual mirrors were created, we can stop
        if (virtualMirrors.length === 0) break;
    }
}

/**
 * Calculate all possible light paths from observer to objects through mirrors
 * Now handles multiple reflections up to a specified depth
 */
export function lightPaths(observer: Observer, mirrors: VerticalMirror[], observableObjects: ObservableObject[]): LightPath[] {
    const paths: LightPath[] = [];
    const MAX_REFLECTION_DEPTH = 3; // Maximum number of reflections to consider

    // First add direct paths (if objects are directly visible)
    addDirectPaths(observer, mirrors, observableObjects, paths);

    // Then add single reflection paths
    addSingleReflectionPaths(observer, mirrors, observableObjects, paths);

    // Finally add multiple reflection paths
    addMultipleReflectionPaths(observer, mirrors, observableObjects, paths, MAX_REFLECTION_DEPTH);

    return paths;
}

/**
 * Add paths for objects that are directly visible to the observer
 */
function addDirectPaths(observer: Observer, mirrors: VerticalMirror[], observableObjects: ObservableObject[], paths: LightPath[]) {
    for (const obj of observableObjects) {
        if (isDirectlyVisible(observer.position, obj.position, mirrors)) {
            paths.push({
                reflectedObject: obj.id,
                points: [
                    obj.position,
                    observer.position
                ]
            });
        }
    }
}

/**
 * Add paths that involve a single reflection off a mirror
 */
function addSingleReflectionPaths(observer: Observer, mirrors: VerticalMirror[], observableObjects: ObservableObject[], paths: LightPath[]) {
    for (const obj of observableObjects) {
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
    }
}

/**
 * Add paths that involve multiple reflections
 */
function addMultipleReflectionPaths(
    observer: Observer,
    mirrors: VerticalMirror[],
    observableObjects: ObservableObject[],
    paths: LightPath[],
    maxDepth: number
) {
    for (const obj of observableObjects) {
        // For each depth level (2 to maxDepth reflections)
        for (let depth = 2; depth <= maxDepth; depth++) {
            findPathsWithDepth(observer, mirrors, obj, depth, [], observer.position, paths);
        }
    }
}

/**
 * Recursively find all paths with a specific reflection depth
 */
function findPathsWithDepth(
    observer: Observer,
    mirrors: VerticalMirror[],
    obj: ObservableObject,
    remainingDepth: number,
    currentPath: Point[],
    currentPoint: Point,
    allPaths: LightPath[]
) {
    // Base case: if we've used all reflections and can now reach the object directly
    if (remainingDepth === 0) {
        if (isDirectlyVisible(currentPoint, obj.position, mirrors)) {
            // Complete the path and add it
            const completePath = [
                obj.position,
                ...currentPath.slice().reverse(),
                observer.position
            ];

            allPaths.push({
                reflectedObject: obj.id,
                points: completePath
            });
        }
        return;
    }

    // Try each mirror for the next reflection
    for (const mirror of mirrors) {
        const mirrorTopY = mirror.position.y;
        const mirrorBottomY = mirror.position.y + mirror.length;
        const mirrorX = mirror.position.x;

        // Skip if mirror is too far from our current path
        // (Optimization to avoid unnecessary calculations)
        const distanceThreshold = 300; // Adjust based on your world dimensions
        if (Math.abs(currentPoint.x - mirrorX) > distanceThreshold) continue;

        // Calculate potential bounce point on this mirror
        const bouncePoint = findBouncePointOnMirror(currentPoint, mirrorX, mirrorTopY, mirrorBottomY);

        // Skip if no valid bounce point
        if (!bouncePoint) continue;

        // Verify the bounce point is visible from current point
        const mirrorsExceptCurrent = mirrors.filter(m => m.id !== mirror.id);
        if (!isDirectlyVisible(currentPoint, bouncePoint, mirrorsExceptCurrent)) continue;

        // Calculate next point after reflection
        const nextPointX = 2 * mirrorX - currentPoint.x;
        const nextPoint: Point = {
            x: nextPointX,
            y: currentPoint.y
        };

        // Continue path search with new reflection point
        const newPath = [...currentPath, bouncePoint];
        findPathsWithDepth(observer, mirrors, obj, remainingDepth - 1, newPath, nextPoint, allPaths);
    }
}

/**
 * Find a bounce point on a specific mirror given a point
 */
function findBouncePointOnMirror(
    point: Point,
    mirrorX: number,
    mirrorTopY: number,
    mirrorBottomY: number
): Point | null {
    // Simplification: for vertical mirrors, horizontal reflection
    // The y-coordinate stays the same
    if (point.y < mirrorTopY || point.y > mirrorBottomY) {
        return null; // Point's y is outside mirror bounds
    }

    return {
        x: mirrorX,
        y: point.y
    };
}

// Helper function to calculate where the line from observer to reflectedObj
// intersects the mirror at mirrorX
function calculateBouncePoint(observer: Point, reflectedObj: Point, mirrorX: number): Point | null {
    // If the observer and reflected object have the same x coordinate (vertical line)
    // or if they're on the same side of the mirror, no valid bounce point
    if (observer.x === reflectedObj.x ||
        (observer.x < mirrorX && reflectedObj.x < mirrorX) ||
        (observer.x > mirrorX && reflectedObj.x > mirrorX)) {
        return null;
    }

    // Calculate the y-coordinate of the intersection using line equation
    const slope = (reflectedObj.y - observer.y) / (reflectedObj.x - observer.x);
    const yIntercept = observer.y - slope * observer.x;

    // y = slope * x + yIntercept
    // At x = mirrorX, y = slope * mirrorX + yIntercept
    const intersectionY = slope * mirrorX + yIntercept;

    return {
        x: mirrorX,
        y: intersectionY
    };
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
