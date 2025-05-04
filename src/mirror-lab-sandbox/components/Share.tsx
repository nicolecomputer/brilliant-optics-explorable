"use client"

import { State } from "@/core/reducer/types";
import "./share.css"

import IconButton from "@/component-library/components/IconButton";
import { useState } from "@/lib/StateContext";
import { Link, ShareIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { encodeState } from "@/lib/share-state";

export default function Share() {
    const [shareDialogOpen, setShareDialogOpen] = React.useState<boolean>(false);
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const state: State = useState()

    useEffect(() => {
        if (shareDialogOpen && dialogRef.current) {
            dialogRef.current.showModal();
        } else if (!shareDialogOpen && dialogRef.current) {
            dialogRef.current.close();
        }
    }, [shareDialogOpen]);

    return (
        <>
            <IconButton onClick={() => {
                setShareDialogOpen(true);
            }}>
                <ShareIcon />
            </IconButton>
            <dialog
                className="share-modal-dialog"
                ref={dialogRef}
                onClose={() => {
                    setShareDialogOpen(false);
                }}
            >
                {shareDialogOpen && (
                    <>
                        <header>
                            <h2>Share Optics Exploration</h2>
                        </header>
                        <iframe width={state.world.width} height={state.world.height} src={`/embed?data=${encodeState(state)}`} />
                        <div className="share-modal-controls">
                            <button onClick={() => {
                                // Get the base URL (protocol + hostname + port if present)
                                const baseUrl = window.location.origin;

                                // Create the full share URL by adding /share to the base
                                const shareUrl = `${baseUrl}/share?data=${encodeState(state)}`;

                                // Use the Clipboard API to copy the URL
                                navigator.clipboard.writeText(shareUrl)
                                    .catch(err => {
                                        console.error('Failed to copy share URL: ', err);
                                    });
                            }}>
                                <Link size={16} />
                                Copy link
                            </button>
                            <form method="dialog">
                                <button className="primary">Done</button>
                            </form>
                        </div>
                    </>
                )}

            </dialog>
        </>
    );
}
