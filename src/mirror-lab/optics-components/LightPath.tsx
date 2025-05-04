import { lightPaths } from "@/core/optics";
import { State } from "@/core/reducer/types"
import { useState } from "@/lib/StateContext"

export default function LightPath() {
    const state: State = useState()
    const { width, height } = state.world;

    const paths = lightPaths(state.observer, state.mirrors, state.observableObjects)

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${width} ${height}`}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }}>
            {paths.map((path, pathIndex) => {
                // Create the path string from the bounce points
                // We need at least one point to create a path
                if (path.points && path.points.length > 0) {
                    // Start the path at the first bounce point
                    let pathString = `M ${path.points[0].x} ${path.points[0].y}`;

                    // Add line segments to each subsequent bounce point
                    for (let i = 1; i < path.points.length; i++) {
                        pathString += ` L ${path.points[i].x} ${path.points[i].y}`;
                    }

                    // Return the SVG path element
                    return (
                        <path
                            key={crypto.randomUUID()}
                            d={pathString}
                            stroke={`rgba(255,213,49,0.44)`}
                            strokeWidth={5}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    );
                }
                return null; // Return null if there are no bounce points
            })}
        </svg>
    );
}
