"use client"

import { State } from "@/core/reducer/types";
import MirrorLab from "@/mirror-lab";
import { useSearchParams } from "next/navigation";

export default function Share() {
  const searchParams = useSearchParams();
  const encodedConfig = searchParams.get('config') ?? ""
  const decodedConfig = atob(encodedConfig)
  const labConfig: State = JSON.parse(decodedConfig) as State

  return (
    <MirrorLab labConfig={labConfig} />
  );
}
