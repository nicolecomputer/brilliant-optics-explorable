"use client"

import { State } from "@/core/reducer/types";
import MirrorLab from "@/mirror-lab";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import "./style.css"
import { decodeState } from "@/lib/share-state";

export default function Embed() {
    return (
        <div className="embed-page">
            <Suspense>
                <MirrorLabFromParams />
            </Suspense>
        </div>
    )
}

function MirrorLabFromParams() {
    const searchParams = useSearchParams();
    const encodedConfig = searchParams.get('data') ?? ""
    const labConfig: State = decodeState(encodedConfig)

    return (
        <MirrorLab labConfig={labConfig} />
    );
}
