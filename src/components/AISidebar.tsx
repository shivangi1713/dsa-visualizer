// src/components/AISidebar.tsx
import React from "react"
import { useLocation } from "react-router-dom"
import { explain } from "../lib/ai"

const suggestionsByRoute: Record<string, string[]> = {
  "/": [
    "What can I learn on this page?",
    "How should I use this visualizer effectively?",
  ],
  "/sorting": [
    "Explain Bubble vs Insertion in 3 sentences.",
    "Why is Quick Sort usually faster than Insertion?",
    "Time/space complexity of Selection Sort?",
  ],
  "/linked-list": [
    "Show push-front vs push-back pointers.",
    "Why is delete-at-index O(n)?",
  ],
  "/bst": [
    "Explain BST delete (2 children) simply.",
    "Why does inorder give sorted order?",
  ],
  "/graph": [
    "Difference between BFS and DFS, briefly.",
    "How do I count provinces/connected components?",
  ],
}

function useSuggestions() {
  const loc = useLocation()
  const base = Object.keys(suggestionsByRoute).find(k => loc.pathname.startsWith(k)) || "/"
  return suggestionsByRoute[base]
}

export default function AISidebar({
  onClose,
  insideDrawer = false,
}: {
  onClose?: () => void
  insideDrawer?: boolean
}) {
  const suggestions = useSuggestions()
  const [prompt, setPrompt] = React.useState("")
  const [answer, setAnswer] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function run() {
    if (!prompt.trim()) return
    try {
      setLoading(true); setError(null)
      const text = await explain(prompt, "You are a friendly DSA tutor. Keep responses concise and beginner-friendly.")
      setAnswer(text)
    } catch (e: any) {
      setError("AI request failed — check the AI server and GEMINI_API_KEY.")
    } finally {
      setLoading(false)
    }
  }

  const body = (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-indigo-50 to-cyan-50">
        <div className="font-semibold">Gemini Tutor</div>
        {insideDrawer && (
          <button className="px-2 py-1 rounded-lg hover:bg-indigo-100" onClick={onClose} aria-label="Close sidebar">
            ✕
          </button>
        )}
      </div>

      <div className="p-4 space-y-3 overflow-auto">
        <div className="text-sm text-gray-700">Ask anything about what you’re seeing.</div>

        <div className="flex flex-wrap gap-2">
          {suggestions?.map((s, i) => (
            <button
              key={i}
              className="text-xs px-2 py-1 rounded-full border hover:bg-indigo-50"
              onClick={() => setPrompt(s)}
              title={s}
            >
              {s}
            </button>
          ))}
        </div>

        <textarea
          className="w-full h-28 p-2 border rounded-xl"
          placeholder="Type your question…"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />

        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={run} disabled={loading}>
            {loading ? "Asking…" : "Ask Gemini"}
          </button>
          <button className="btn" onClick={() => { setPrompt(""); setAnswer(""); setError(null) }}>
            Clear
          </button>
        </div>

        {error && <div className="text-sm text-rose-600">{error}</div>}

        {answer && (
          <div className="mt-2 p-3 border rounded-xl bg-white text-sm whitespace-pre-wrap">
            {answer}
          </div>
        )}

        <div className="pt-2 text-[11px] text-gray-500">
          Tip: Keep inputs small and specific for best answers. This panel calls your local <code>/api/explain</code>.
        </div>
      </div>
    </div>
  )

  return (
    <aside className="h-full w-80 border rounded-2xl bg-white hidden lg:block">
      {body}
    </aside>
  )
}

export function AISidebarDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute right-2 top-2 bottom-2 w-[320px] border rounded-2xl bg-white shadow-xl overflow-hidden">
        <AISidebar onClose={onClose} insideDrawer />
      </div>
    </div>
  )
}
