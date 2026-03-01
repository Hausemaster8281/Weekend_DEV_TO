"use client";

import { useOthers, useSelf, useStorage, useMutation } from "@/liveblocks.config";
import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Message } from "@/types/mission";

export default function CommThread() {
    const others = useOthers();
    const self = useSelf();
    const messages = useStorage((root) => root.messages);
    const [input, setInput] = useState("");

    const sendMessage = useMutation(({ storage }) => {
        if (!input.trim() || !self) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            user: self.presence.user.name,
            color: self.presence.user.color,
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        storage.get("messages").push(newMessage);
        setInput("");
    }, [input, self]);

    return (
        <aside className="bg-[#F3EDF7] border-l border-[#E6E0E9] flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-[#E6E0E9] flex items-center justify-between bg-white/20">
                <div className="flex items-center gap-2">
                    <MessageSquare size={18} className="text-[#6750A4]" />
                    <h2 className="font-black text-sm tracking-tight uppercase">The Comm</h2>
                </div>
                <div className="flex -space-x-2">
                    {others.map((user) => (
                        <div
                            key={user.connectionId}
                            className="w-6 h-6 rounded-full border-2 border-[#F3EDF7] flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                            style={{ backgroundColor: user.presence.user.color }}
                            title={user.presence.user.name}
                        >
                            {user.presence.user.name.charAt(0)}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map((msg: Message) => (
                    <div key={msg.id} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span
                                className="text-[10px] font-black uppercase tracking-wider"
                                style={{ color: msg.color }}
                            >
                                {msg.user}
                            </span>
                            <span className="text-[10px] text-[#49454F]/50">{msg.time}</span>
                        </div>
                        <div className="bg-white px-4 py-3 rounded-[20px] rounded-tl-none text-sm text-[#1C1B1F] shadow-sm border border-[#E6E0E9]">
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-white/50 border-t border-[#E6E0E9]">
                <div className="relative">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Transmit message..."
                        className="w-full bg-white border border-[#79747E] rounded-full px-5 py-3 pr-12 text-sm font-medium text-[#1C1B1F] placeholder-[#49454F]/60 focus:border-[#6750A4] focus:ring-1 focus:ring-[#6750A4] outline-none shadow-inner"
                    />
                    <button
                        onClick={() => sendMessage()}
                        className="absolute right-2 top-2 w-9 h-9 bg-[#6750A4] text-white rounded-full flex items-center justify-center hover:bg-[#4F378B] transition-colors"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
