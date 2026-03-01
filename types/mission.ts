export type MissionType = "antigravity_prompt" | "image_gen" | "dev_plan";

export interface LivingSpec {
    missionType: MissionType;
    title: string;
    description: string;
    parameters: Record<string, any>;
    lastUpdated: string;
}

export const MISSION_TEMPLATES: Record<MissionType, LivingSpec> = {
    antigravity_prompt: {
        missionType: "antigravity_prompt",
        title: "New Prompt Engineering",
        description: "Architecting complex system prompts for LLMs.",
        parameters: {
            role: "Expert AI Architect",
            context: "A high-stakes weekend hackathon project.",
            constraints: ["No emojis", "Concise output"],
        },
        lastUpdated: new Date().toISOString(),
    },
    image_gen: {
        missionType: "image_gen",
        title: "Visual Synthesis",
        description: "Defining tokens for high-fidelity image generation.",
        parameters: {
            role: "Cinematographer",
            context: "Neo-noir cyberpunk aesthetic.",
            style: "Cinematic, 8k",
            aspectRatio: "16:9",
            negativePrompt: "",
            tags: ["Rainy", "Neon"],
        },
        lastUpdated: new Date().toISOString(),
    },
    dev_plan: {
        missionType: "dev_plan",
        title: "System Blueprint",
        description: "Detailed step-by-step implementation guide.",
        parameters: {
            role: "Lead Developer",
            context: "Building THE FORGE real-time workspace.",
            techStack: ["Next.js", "Tailwind"],
            features: ["CRDTs", "AI Forge"],
            architecture: "Modular Monolith",
        },
        lastUpdated: new Date().toISOString(),
    },
};
export interface Message {
    id: string;
    user: string;
    color: string;
    text: string;
    time: string;
}
