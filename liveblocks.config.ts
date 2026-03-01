import { createClient, LiveObject, LiveMap, LiveList } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { LivingSpec, Message } from "./types/mission";

const client = createClient({
    publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY || "pk_prod_placeholder",
});

type Presence = {
    cursor: { x: number; y: number } | null;
    user: { name: string; color: string };
};

type Storage = {
    livingSpec: LiveObject<any>;
    messages: LiveList<any>;
    forgeOutcome: string;
    isForging: boolean;
};

type UserMeta = {
    id: string;
    info: {
        name: string;
        color: string;
        avatar?: string;
    };
};

type RoomEvent = {
    type: "FORGE_START" | "FORGE_COMPLETE";
};

export const {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useOthers,
    useOthersMapped,
    useOthersListener,
    useRoomInfo,
    useMutation,
    useStorage,
    useSelf,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
