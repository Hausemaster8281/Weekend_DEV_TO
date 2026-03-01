"use client";

import { useStorage, useMutation } from "@/liveblocks.config";
import { Hammer, Settings, Info, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { LiveList, LiveObject } from "@liveblocks/client";

export default function BlueprintSidebar() {
    const livingSpec = useStorage((root) => root.livingSpec);
    const [isAddingParam, setIsAddingParam] = useState(false);
    const [newParamKey, setNewParamKey] = useState("");

    const updateTitle = useMutation(({ storage }, title: string) => {
        const spec = storage.get("livingSpec");
        spec.set("title", title);
        spec.set("lastUpdated", new Date().toISOString());
    }, []);

    const updateDescription = useMutation(({ storage }, desc: string) => {
        const spec = storage.get("livingSpec");
        spec.set("description", desc);
        spec.set("lastUpdated", new Date().toISOString());
    }, []);

    const updateParam = useMutation(({ storage }, key: string, value: any) => {
        const spec = storage.get("livingSpec");
        const params = spec.get("parameters") as any;
        params.set(key, value);
        spec.set("lastUpdated", new Date().toISOString());
    }, []);

    const renameParam = useMutation(({ storage }, oldKey: string, newKey: string) => {
        if (!newKey || oldKey === newKey) return;
        const spec = storage.get("livingSpec");
        const params = spec.get("parameters") as any;
        const val = params.get(oldKey);
        params.set(newKey, val);
        params.delete(oldKey);
        spec.set("lastUpdated", new Date().toISOString());
    }, []);

    const removeParam = useMutation(({ storage }, key: string) => {
        const spec = storage.get("livingSpec");
        const params = spec.get("parameters") as any;
        params.delete(key);
        spec.set("lastUpdated", new Date().toISOString());
    }, []);

    const addParam = useMutation(({ storage }, key: string, isList: boolean = false) => {
        if (!key) return;
        const spec = storage.get("livingSpec");
        const params = spec.get("parameters") as any;
        params.set(key, isList ? new LiveList([]) : "");
        spec.set("lastUpdated", new Date().toISOString());
        setIsAddingParam(false);
        setNewParamKey("");
    }, []);

    const pushListItem = useMutation(({ storage }, key: string, value: string) => {
        const spec = storage.get("livingSpec");
        const params = spec.get("parameters") as any;
        const list = params.get(key) as LiveList<string>;
        list.push(value);
        spec.set("lastUpdated", new Date().toISOString());
    }, []);

    const removeListItem = useMutation(({ storage }, key: string, index: number) => {
        const spec = storage.get("livingSpec");
        const params = spec.get("parameters") as any;
        const list = params.get(key) as LiveList<string>;
        list.delete(index);
        spec.set("lastUpdated", new Date().toISOString());
    }, []);

    if (!livingSpec) return (
        <aside className="bg-[#F3EDF7] border-r border-[#E6E0E9] flex flex-col items-center justify-center p-8 text-center gap-4">
            <div className="w-12 h-12 bg-[#6750A4]/10 text-[#6750A4] rounded-full flex items-center justify-center animate-pulse">
                <Hammer size={24} />
            </div>
            <div className="space-y-1">
                <p className="font-bold text-sm">INITIALIZING...</p>
            </div>
        </aside>
    );

    return (
        <aside className="bg-[#F3EDF7] border-r border-[#E6E0E9] flex flex-col h-full overflow-hidden shadow-inner w-80">
            <div className="p-6 border-b border-[#E6E0E9] bg-white/40">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#6750A4] text-white rounded-xl shadow-md">
                        <Hammer size={24} />
                    </div>
                    <div>
                        <h2 className="font-black text-xl tracking-tighter">BLUEPRINT</h2>
                        <p className="text-[10px] font-bold text-[#6750A4] tracking-[0.2em] uppercase">Living Spec 1.0</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="relative group">
                        <input
                            value={livingSpec.title}
                            onChange={(e) => updateTitle(e.target.value)}
                            className="w-full bg-white border border-[#79747E] rounded-[12px] px-3 pt-4 pb-1 font-bold text-[#1C1B1F] focus:border-[#6750A4] outline-none shadow-sm"
                        />
                        <span className="absolute left-3 top-1 text-[10px] font-black text-[#6750A4] uppercase">Title</span>
                    </div>

                    <div className="relative group">
                        <textarea
                            value={livingSpec.description}
                            onChange={(e) => updateDescription(e.target.value)}
                            className="w-full bg-white border border-[#79747E] rounded-[12px] px-3 pt-4 pb-1 h-20 text-sm font-medium text-[#49454F] focus:border-[#6750A4] outline-none resize-none shadow-sm"
                        />
                        <span className="absolute left-3 top-1 text-[10px] font-black text-[#6750A4] uppercase">Description</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#49454F]">
                        <Settings size={18} />
                        <h3 className="font-black text-[10px] tracking-[0.1em] uppercase opacity-70">Process Params</h3>
                    </div>
                    <button
                        onClick={() => setIsAddingParam(true)}
                        className="p-1 text-[#6750A4] hover:bg-[#6750A4] hover:text-white rounded-lg transition-all active:scale-95"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                {isAddingParam && (
                    <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-[#6750A4] space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="relative">
                            <input
                                autoFocus
                                value={newParamKey}
                                onChange={(e) => setNewParamKey(e.target.value)}
                                placeholder="Param Name"
                                className="w-full text-sm font-bold border-b border-[#79747E] pb-1 focus:border-[#6750A4] outline-none"
                            />
                            <span className="text-[9px] text-[#6750A4] font-bold uppercase mt-1 block">New Parameter Key</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => addParam(newParamKey, false)}
                                className="flex-1 bg-[#6750A4] text-white py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all"
                            >
                                Text
                            </button>
                            <button
                                onClick={() => addParam(newParamKey, true)}
                                className="flex-1 border-2 border-[#6750A4] text-[#6750A4] py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[#6750A4] hover:text-white active:scale-95 transition-all"
                            >
                                List
                            </button>
                            <button
                                onClick={() => setIsAddingParam(false)}
                                className="p-2 text-[#79747E] hover:text-red-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                )}

                <div className="space-y-4 pb-20">
                    {Object.entries(livingSpec.parameters).map(([key, value]) => (
                        <div key={key} className="bg-white p-4 rounded-2xl border border-[#CAC4D0] focus-within:border-[#6750A4] focus-within:ring-1 focus-within:ring-[#6750A4] transition-all shadow-sm group hover:shadow-md relative overflow-hidden">
                            <div className="flex items-center justify-between mb-3 border-b border-[#F1F1F1] pb-2">
                                <input
                                    className="text-[10px] font-black text-[#6750A4] uppercase tracking-wider bg-transparent border-none outline-none focus:text-[#6750A4] w-full mr-4"
                                    value={key}
                                    onChange={(e) => renameParam(key, e.target.value)}
                                />
                                <button
                                    onClick={() => removeParam(key)}
                                    className="opacity-0 group-hover:opacity-40 hover:!opacity-100 p-1 text-red-600 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            {Array.isArray(value) ? (
                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        {value.map((item: string, index: number) => (
                                            <div key={`${key}-${index}`} className="flex items-center gap-1 bg-[#EADDFF] text-[#21005D] px-2 py-1.5 rounded-xl text-[11px] font-bold group/item shadow-sm">
                                                <input
                                                    value={item}
                                                    onChange={(e) => {
                                                        const newArr = [...value];
                                                        newArr[index] = e.target.value;
                                                        updateParam(key, newArr);
                                                    }}
                                                    className="bg-transparent border-none outline-none w-auto min-w-[40px] appearance-none"
                                                />
                                                <button
                                                    onClick={() => removeListItem(key, index)}
                                                    className="hover:text-red-600 opacity-30 group-hover/item:opacity-100 transition-opacity ml-1"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => pushListItem(key, "new item")}
                                        className="w-full border-2 border-[#6750A4] border-dashed text-[#6750A4] text-[10px] py-1.5 rounded-xl font-black hover:bg-[#6750A4] hover:text-white transition-all active:scale-95 shadow-sm uppercase tracking-tighter"
                                    >
                                        + ADD ITEM
                                    </button>
                                </div>
                            ) : (
                                <textarea
                                    value={String(value)}
                                    onChange={(e) => updateParam(key, e.target.value)}
                                    className="w-full bg-transparent border-none p-0 text-sm font-bold text-[#1C1B1F] focus:outline-none resize-none min-h-[40px] placeholder-[#49454F]/30"
                                    placeholder="Enter details..."
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-[#E6E0E9]/30 italic text-[9px] text-[#49454F] flex items-center gap-2 border-t border-[#E6E0E9] mt-auto">
                <Info size={14} className="opacity-50" />
                <span>Custom parameters directly influence the Forge Outcome intelligence. All changes sync via CRDTs.</span>
            </div>
        </aside>
    );
}
