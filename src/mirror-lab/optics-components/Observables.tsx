import { useDispatch, useState } from "@/lib/StateContext";
import { State } from "@/core/reducer/types";
import Observable from "./Observable";

export default function Observables() {
    const state: State = useState();
    const dispatch = useDispatch();

    return (
        <>
            {state.observableObjects.map(observable => (
                <Observable
                    key={`observable-${observable.id}`}
                    observable={observable}
                    world={state.world}
                    onMove={(newPoint) => {
                        dispatch({
                            type: "OBSERVABLE-OBJECT-MOVE",
                            observableObjectId: observable.id,
                            position: newPoint

                        })
                    }}
                />
            ))}
        </>
    )
}
