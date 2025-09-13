import "dotenv/config"
import express from "express"
import cors from "cors"
import { GoogleGenAI } from "@google/genai"

const app = express()
app.use(cors())
app.use(express.json())

const hasKey = !!process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

// --- Health check: confirm server + key status ---
app.get("/api/health", (_req, res) => {
  const key = process.env.GEMINI_API_KEY || ""
  res.json({
    ok: true,
    keyLoaded: hasKey,
    keyPreview: key ? `${key.slice(0, 6)}... (len ${key.length})` : null,
  })
})

// Helper to extract text robustly from various SDK shapes
function extractText(resp) {
  try {
    if (!resp) return ""
    if (typeof resp.text === "function") return resp.text() // some SDKs expose text()
    if (typeof resp.text === "string") return resp.text
    // Try common candidate structure
    const cands = resp.candidates || resp.response?.candidates
    if (Array.isArray(cands) && cands.length) {
      const parts = cands[0]?.content?.parts
      if (Array.isArray(parts)) {
        return parts.map(p => p?.text ?? "").join("").trim()
      }
    }
    // Fallback
    return JSON.stringify(resp)
  } catch {
    return ""
  }
}

app.post("/api/explain", async (req, res) => {
  try {
    const { prompt, system } = req.body ?? {}
    if (!prompt) return res.status(400).json({ error: "Missing prompt" })
    if (!hasKey) return res.status(500).json({ error: "GEMINI_API_KEY not set" })

    // ✅ Merge system into the user prompt (Gemini only accepts 'user'/'model' roles)
    const promptText = system ? `${system}\n\n${prompt}` : prompt

    const resp = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: promptText }] }],
    })

    const text = extractText(resp) || "No text returned"
    res.json({ text })
  } catch (e) {
    console.error("Gemini error:", e)
    res.status(500).json({ error: "Gemini request failed" })
  }
})


const PORT = process.env.PORT || 8787
app.listen(PORT, () => console.log(`AI server running http://localhost:${PORT}`))
