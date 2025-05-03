import { useState } from "@/lib/StateContext";
import VerticalMirrorComponent from "./VerticalMirror";
import { State } from "@/core/reducer/types";

export default function VerticalMirrors() {
    const state: State = useState();
    // const dispatch = useDispatch();

    return (
        <>
            {state.mirrors.map(mirror => (
                <VerticalMirrorComponent
                    key={`mirror-${mirror.id}`}
                    mirror={mirror}
                />
            ))}
        </>
    )
}
