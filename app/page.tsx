"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MissionType, MISSION_TEMPLATES } from "@/types/mission";
import { Rocket, Image as ImageIcon, Code, ArrowRight } from "lucide-react";
import { clsx } from "clsx";

export default function Lobby() {
  const router = useRouter();
  const [missionType, setMissionType] = useState<MissionType>("antigravity_prompt");
  const [roomId, setRoomId] = useState("");

  const generateRoomId = () => {
    const randomId = Math.random().toString(36).substring(2, 10);
    setRoomId(randomId);
  };

  const handleJoin = () => {
    if (!roomId) generateRoomId();
    router.push(`/room/${roomId}?type=${missionType}`);
  };

  return (
    <div className="min-h-screen bg-[#FDF8FF] flex items-center justify-center p-6 text-[#1C1B1F]">
      <div className="max-w-md w-full bg-[#F3EDF7] rounded-[24px] p-8 shadow-sm border border-[#E6E0E9]">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">THE FORGE</h1>
        <p className="text-[#49454F] mb-8 font-medium">Real-time collaborative AI mission control.</p>

        <div className="space-y-4 mb-8">
          <label className="text-sm font-bold text-[#49454F] px-1">SELECT MISSION TYPE</label>
          <div className="grid grid-cols-1 gap-3">
            {(Object.keys(MISSION_TEMPLATES) as MissionType[]).map((type) => (
              <button
                key={type}
                onClick={() => setMissionType(type)}
                className={clsx(
                  "flex items-center gap-4 p-4 rounded-[16px] border transition-all duration-200 text-left",
                  missionType === type
                    ? "bg-[#EADDFF] border-[#6750A4] text-[#21005D]"
                    : "bg-white border-[#CAC4D0] hover:bg-[#F3EDF7]"
                )}
              >
                <div className={clsx(
                  "p-2 rounded-lg",
                  missionType === type ? "bg-[#D0BCFF]" : "bg-[#F3EDF7]"
                )}>
                  {type === "antigravity_prompt" && <Rocket size={20} />}
                  {type === "image_gen" && <ImageIcon size={20} />}
                  {type === "dev_plan" && <Code size={20} />}
                </div>
                <div>
                  <div className="font-bold uppercase text-xs tracking-wider opacity-70">
                    {type.replace("_", " ")}
                  </div>
                  <div className="font-medium text-sm">
                    {MISSION_TEMPLATES[type].description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Mission ID or generate"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full h-14 bg-white border border-[#79747E] rounded-[12px] px-4 pt-2 text-[#1C1B1F] focus:border-[#6750A4] focus:ring-1 focus:ring-[#6750A4] outline-none transition-all placeholder:text-[#49454F]"
            />
            <span className="absolute left-3 -top-2 px-1 bg-[#F3EDF7] text-xs font-bold text-[#6750A4]">MISSION ID</span>
          </div>

          <button
            onClick={handleJoin}
            className="w-full h-14 bg-[#6750A4] text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#4F378B] transition-colors shadow-lg"
          >
            ENTER THE FORGE
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
