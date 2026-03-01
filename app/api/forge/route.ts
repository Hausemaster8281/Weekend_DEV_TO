import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { LivingSpec } from "@/types/mission";

// export const runtime = "edge";

export async function POST(req: Request) {
  const { livingSpec, messages }: { livingSpec: LivingSpec; messages: any[] } = await req.json();

  // Standardize on GEMINI_API_KEY per latest docs, fallback to previous
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API Key missing (GEMINI_API_KEY)" }, { status: 500 });
  }

  const ai = new GoogleGenAI({ apiKey });

  // Use Gemini 3 Flash for all generation to ensure consistent context handling and speed
  const modelName = "gemini-3-flash-preview";

  // Build chat context
  const chatContext = messages && messages.length > 0
    ? `\nCOMMUNICATION THREAD (CONTEXT):\n${messages.map(m => `[${m.user}]: ${m.text}`).join('\n')}`
    : "";

  let missionInstructions = "";
  if (livingSpec.missionType === "antigravity_prompt") {
    missionInstructions = `
      Your goal is to engineer a WORLD-CLASS SYSTEM PROMPT. 
      Do NOT describe the topic. INSTEAD, OUTPUT THE PROMPT ITSELF.
      Structure:
      # ROLE: [Define specific persona]
      # CONTEXT: [Describe background]
      # OBJECTIVE: [Clear goal]
      # STYLE/CONSTRAINTS: [Rules to follow]
    `;
  } else if (livingSpec.missionType === "image_gen") {
    missionInstructions = `
      Your goal is to generate a HIGH-FIDELITY IMAGE GENERATION PROMPT optimized for NANO BANANA (and other high-end image models).
      Output ONLY the prompt text.
      Focus on: composition, lighting, technical camera settings, and specific artistic tokens.
      Do NOT include preambles.
    `;
  } else {
    missionInstructions = "Create a detailed technical implementation plan with architecture and features based on the specifications.";
  }

  const systemPrompt = `
    You are THE FORGE AI, a Real-Time Systems Architect.
    Mission: ${livingSpec.missionType}
    Title: ${livingSpec.title}
    Description: ${livingSpec.description}
    Parameters: ${JSON.stringify(livingSpec.parameters)}
    ${chatContext}

    INSTRUCTIONS:
    ${missionInstructions}
    
    Synthesize all context (Spec + Comm Thread) into the final outcome.
    Maintain a professional, technical, and concise tone.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      config: {
        systemInstruction: systemPrompt,
      },
      contents: "Generate the definitive outcome based on the latest collaborative state.",
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Forge Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
