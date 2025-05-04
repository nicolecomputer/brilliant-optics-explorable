import { State } from "@/core/reducer/types";

export function encodeState(state: State): string {
    const json = JSON.stringify(state);
    return btoa(json)
}

export function decodeState(data: string): State {
    const decoded = atob(data)
    return JSON.parse(decoded)
}
