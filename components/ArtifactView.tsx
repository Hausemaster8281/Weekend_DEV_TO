import { useStorage, useMutation } from "@/liveblocks.config";
import { useState } from "react";
import { Sparkles, Loader2, Play } from "lucide-react";

export default function ArtifactView() {
    const livingSpec = useStorage((root) => root.livingSpec);
    const messages = useStorage((root) => root.messages);
    const completion = useStorage((root) => root.forgeOutcome);
    const isForging = useStorage((root) => root.isForging);
    const [error, setError] = useState<string | null>(null);

    const handleForge = useMutation(async ({ storage }) => {
        if (!livingSpec || isForging) return;

        storage.set("isForging", true);
        setError(null);

        try {
            const res = await fetch("/api/forge", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ livingSpec, messages }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to forge outcome");

            storage.set("forgeOutcome", data.text);
            const spec = storage.get("livingSpec");
            spec.set("lastUpdated", new Date().toISOString());
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            storage.set("isForging", false);
        }
    }, [livingSpec, messages, isForging]);

    return (
        <section className="bg-white flex flex-col h-full overflow-hidden shadow-2xl relative">
            <div className="p-4 bg-white/80 backdrop-blur-md border-b border-[#E6E0E9] flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#6750A4]/10 text-[#6750A4] rounded-lg flex items-center justify-center">
                        <Sparkles size={18} />
                    </div>
                    <h2 className="font-black text-sm tracking-tight">THE ARTIFACT</h2>
                </div>

                <button
                    onClick={() => handleForge()}
                    disabled={!!isForging}
                    className="bg-[#6750A4] text-white px-6 py-2 rounded-full font-bold text-xs flex items-center gap-2 hover:bg-[#4F378B] transition-all disabled:opacity-50 shadow-md"
                >
                    {isForging ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="currentColor" />}
                    FORGE OUTCOME
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-12 font-serif text-lg leading-relaxed text-[#1C1B1F]">
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 italic">
                        Error: {error}
                    </div>
                )}

                {!completion && !isForging && !error && (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                        <div className="w-24 h-24 border-4 border-[#6750A4] rounded-full flex items-center justify-center mb-4">
                            <Sparkles size={48} />
                        </div>
                        <p className="font-bold text-xl uppercase tracking-widest">Awaiting Ignition</p>
                        <p className="text-sm mt-2 font-sans italic">Modify the blueprint and click Forge to generate.</p>
                    </div>
                )}

                {isForging && (
                    <div className="flex items-center gap-2 text-[#6750A4] font-bold animate-pulse">
                        <Loader2 size={20} className="animate-spin" />
                        IGNITING THE FORGE...
                    </div>
                )}

                <div className="whitespace-pre-wrap">
                    {completion}
                </div>
            </div>

            {isForging && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#EADDFF] overflow-hidden">
                    <div className="h-full bg-[#6750A4] animate-progress-indeterminate w-1/3" />
                </div>
            )}
        </section>
    );
}
