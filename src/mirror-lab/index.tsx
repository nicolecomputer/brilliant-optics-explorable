import { StateProvider } from "@/lib/StateContext";
import MirrorLab from "./components/lab";

export default function WiredMirrorLab() {
    return (
        <StateProvider>
            <MirrorLab />
        </StateProvider>
    )
}
