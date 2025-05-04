"use client"
import "./style.css"

import { State } from "@/core/reducer/types";
import { decodeState } from "@/lib/share-state";
import MirrorLab from "@/mirror-lab";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function MirrorLabFromParams() {
  const searchParams = useSearchParams();
  const encodedConfig = searchParams.get('data') ?? ""
  const labConfig: State = decodeState(encodedConfig)

  return (
    <MirrorLab labConfig={labConfig} />
  );
}

export default function Share() {
  return (
    <div className="share-page">
      <Suspense>
        <MirrorLabFromParams />
      </Suspense>
    </div>
  );
}
