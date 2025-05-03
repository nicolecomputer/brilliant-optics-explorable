import { StateProvider } from "@/lib/StateContext";
import MirrorLab from "./components/lab";
import { State } from "@/core/reducer/types";

type WiredMirrorLabProps = {
    labConfig?: State

}
export default function WiredMirrorLab({ labConfig }: WiredMirrorLabProps) {
    return (
        <StateProvider labConfig={labConfig}>
            <MirrorLab />
        </StateProvider>
    )
}
