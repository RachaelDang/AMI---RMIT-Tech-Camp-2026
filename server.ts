import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route: AI Insights for Parents and Teachers
  app.post("/api/insights", async (req, res) => {
    try {
      const { userType, logs } = req.body; // userType: 'parent' | 'teacher'

      if (!logs || !Array.isArray(logs) || logs.length === 0) {
        return res.status(400).json({ error: "No communication logs provided." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      const isKeyDefaultOrMissing = !apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "";

      if (isKeyDefaultOrMissing) {
        // Return beautiful, realistic, expertly crafted fallback insights if Gemini API key isn't active
        const mockInsights = getStaticExpertInsights(userType, logs);
        return res.json({
          insights: mockInsights,
          isMock: true,
          notice: "Using local clinical rules engine (Configure GEMINI_API_KEY in Secrets for customized AI)."
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Construct a tailored prompt of recent logs
      const logSummary = logs
        .map((l: any, i: number) => {
          return `- Log #${i + 1}: Child is feeling ${l.emotion} because of "${l.trigger}". They need: "${l.need}". (Logged: ${new Date(l.timestamp).toLocaleDateString()})`;
        })
        .join("\n");

      const systemInstruction = userType === "teacher" 
        ? "You are an expert school psychologist and Board Certified Behavior Analyst (BCBA) specializing in neurodiverse school environments and autism. Provide direct, positive, actionable classroom modifications, sensory accommodations, and communication support strategies. Avoid fluff and clinical lecturing. Use warm but highly professional educational phrasing." 
        : "You are an affectionate, clinical pediatric occupational therapist and gentle parenting guide specializing in autism spectrum support. Provide compassionate, highly practical home adjustments, calming schedules, clear-language validations, and parent co-regulation tips. Speak directly to the parents with warmth and encouragement.";

      const prompt = `
        Below is a log of recent emotional states and felt experience details of an autistic school student or child:
        ${logSummary}

        Analyze these trends carefully. Provide 4 concise, bulleted sections of actionable insights and strategies:
        1. **Pattern Recognition**: Identify what main triggers and needs are repeating or rising (e.g. sensory load, routine shift, or lack of agency).
        2. **Co-regulation Support**: Explicit actions the ${userType === 'teacher' ? 'teacher' : 'parent'} can do in the moment to calm or reassure the child.
        3. **Environment Accommodation**: Quick structural adjustments (classroom setup or home sensory spaces) matching their highlighted stressors.
        4. **Skill-building Idea**: A small, calm-state game or communication play idea to teach self-advocacy.

        Structure your response with clear Markdown headings for these 4 sections. Keep the total length around 250-300 words. Be encouraging and highly constructive.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({
        insights: response.text || "Unable to generate insights at this moment.",
        isMock: false
      });

    } catch (error: any) {
      console.error("Gemini API Error in /api/insights:", error);
      res.status(500).json({ 
        error: "Failed to generate AI insights.", 
        details: error.message 
      });
    }
  });

  // Serve static assets or mount Vite under dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

// Clinically sound offline insights matcher when Gemini API is local/not connected
function getStaticExpertInsights(userType: string, logs: any[]): string {
  // Aggregate triggers and emotions
  const triggerCounts: Record<string, number> = {};
  const emotionCounts: Record<string, number> = {};
  
  logs.forEach((log) => {
    triggerCounts[log.trigger] = (triggerCounts[log.trigger] || 0) + 1;
    emotionCounts[log.emotion] = (emotionCounts[log.emotion] || 0) + 1;
  });

  const topTrigger = Object.keys(triggerCounts).reduce((a, b) => triggerCounts[a] > triggerCounts[b] ? a : b, "Noise");
  const topEmotion = Object.keys(emotionCounts).reduce((a, b) => emotionCounts[a] > emotionCounts[b] ? a : b, "Overwhelmed");

  if (userType === "teacher") {
    return `### 1. Pattern Recognition
Our analysis shows a correlation between a state of **${topEmotion}** and triggers like **${topTrigger}**. This indicates that high-intensity auditory and visual stimuli are currently exceeding the child's processing threshold in classroom transition zones.

### 2. Co-regulation Support
- **Pre-emptive Buffering**: When transitioning to raw noise environments, stand adjacent to the student and provide a low-tone verbal run-through of the path ("We are walking to the library, it is five steps").
- **Co-regulate with Deep pressure**: Offer heavy work tasks (carrying books, holding a relative door weights) just prior to high-trigger times.

### 3. Environment Accommodation
- Setup a designated "Echo Harbor" corner in the classroom equipped with sound-deadening felt screens or soft floor cushions.
- Keep noise-reducing headphones or sound earmuffs on a highly visible, labelled peg that the child has independent permission to access at any time.

### 4. Skill-building Idea
- **"The Volume Dial Game"**: During calm periods, practice modeling high, medium, and low volume settings using a visual slider chart. This builds somatic awareness of sound scales in the class.`;
  } else {
    return `### 1. Pattern Recognition
Home-based logs reveal that **${topEmotion}** arises frequently when encountering **${topTrigger}**. Sensory adjustments are often needed during school-to-home transitions when the child is recovering from the day's cognitive load.

### 2. Co-regulation Support
- **Validate Calmly & Instantly**: Use clear, flat-pitch validations. Say, *"I see you are ${topEmotion.toLowerCase()}. It is okay to be ${topEmotion.toLowerCase()}. I am right here."* Keep verbal demands strictly minimal.
- **Side-by-side Presence**: Sit parallel to the child on the floor without demanding direct eye-contact. Matching their breathing rhythm helps regulate their heartbeat.

### 3. Environment Accommodation
- Establish a "Calm Burrow" at home—a low-light, soft-fabric nest (like a small pop-up tent or box with heavy weighted blankets) where they can retreat.
- Minimize unexpected sensory triggers. Introduce dynamic timers (visual sand timers or warm color lights) 10 minutes prior to routine changes such as dinnertime or bath.

### 4. Skill-building Idea
- **"Card Trading Support"**: Practice exchanging the Echo card at the dining table for low-stakes comforts (such as water or a squeeze ball) in peaceful, playful moments. This builds motor patterns for requesting aid under stress.`;
  }
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
