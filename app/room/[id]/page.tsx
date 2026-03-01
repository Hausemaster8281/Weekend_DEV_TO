"use client";

import { useMutation, useStorage, RoomProvider } from "@/liveblocks.config";
import Workspace from "@/components/Workspace";
import { useSearchParams } from "next/navigation";
import { MISSION_TEMPLATES, MissionType } from "@/types/mission";
import { LiveObject, LiveList } from "@liveblocks/client";
import { use, Suspense, useEffect } from "react";

function RoomContent({ id }: { id: string }) {
    const searchParams = useSearchParams();
    const type = (searchParams.get("type") as MissionType) || "antigravity_prompt";
    const template = MISSION_TEMPLATES[type];

    // Deep initialize for Liveblocks reactivity
    const initialParams = new LiveObject();
    Object.entries(template.parameters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            initialParams.set(key, new LiveList(value));
        } else {
            initialParams.set(key, value);
        }
    });

    const initialLivingSpec = new LiveObject({
        ...template,
        parameters: initialParams,
    } as any);

    return (
        <RoomProvider
            id={id}
            initialPresence={{ cursor: null, user: { name: "Architect", color: "#6750A4" } }}
            initialStorage={{
                livingSpec: initialLivingSpec,
                messages: new LiveList([]),
                forgeOutcome: "",
                isForging: false,
            }}
        >
            <RoomInitializer type={type} />
        </RoomProvider>
    );
}

function RoomInitializer({ type }: { type: MissionType }) {
    const livingSpec = useStorage((root) => root.livingSpec);

    const resetStorage = useMutation(({ storage }) => {
        const template = MISSION_TEMPLATES[type];
        storage.set("livingSpec", new LiveObject(template as any));
        storage.set("messages", new LiveList([]));
        storage.set("forgeOutcome", "");
        storage.set("isForging", false);
    }, [type]);

    useEffect(() => {
        if (livingSpec) {
            const lastUpdate = new Date(livingSpec.lastUpdated).getTime();
            const now = Date.now();
            // If room hasn't been touched in 30 minutes, expire it on join
            if (now - lastUpdate > 1000 * 60 * 30) {
                resetStorage();
            }
        }
    }, [livingSpec, resetStorage]);

    return <Workspace />;
}

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return (
        <Suspense fallback={<div>Loading Workspace...</div>}>
            <RoomContent id={id} />
        </Suspense>
    );
}
