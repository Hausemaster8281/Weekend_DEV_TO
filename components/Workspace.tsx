"use client";

import { useOthers, useMyPresence, useUpdateMyPresence } from "@/liveblocks.config";
import BlueprintSidebar from "./BlueprintSidebar";
import ArtifactView from "./ArtifactView";
import CommThread from "./CommThread";
import { useEffect } from "react";

export default function Workspace() {
    const others = useOthers();
    const updateMyPresence = useUpdateMyPresence();

    useEffect(() => {
        const onPointerMove = (e: PointerEvent) => {
            updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } });
        };
        window.addEventListener("pointermove", onPointerMove);
        return () => window.removeEventListener("pointermove", onPointerMove);
    }, [updateMyPresence]);

    return (
        <main className="h-screen bg-[#FDF8FF] grid grid-cols-[380px_1fr_320px] overflow-hidden">
            {/* Visual cursors */}
            {others.map(({ connectionId, presence }) => {
                if (!presence?.cursor) return null;
                return (
                    <div
                        key={connectionId}
                        className="absolute pointer-events-none z-50 transition-transform duration-75"
                        style={{
                            transform: `translate(${presence.cursor.x}px, ${presence.cursor.y}px)`,
                        }}
                    >
                        <div
                            className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                            style={{ backgroundColor: presence.user.color }}
                        />
                        <span className="ml-2 px-2 py-1 rounded bg-black/80 text-white text-[10px] font-bold uppercase tracking-widest leading-none">
                            {presence.user.name}
                        </span>
                    </div>
                );
            })}

            <BlueprintSidebar />
            <ArtifactView />
            <CommThread />
        </main>
    );
}
