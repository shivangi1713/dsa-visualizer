// src/lib/ai.ts
export async function explain(prompt: string, system?: string) {
  const r = await fetch("/api/explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, system }),
  })
  const data = await r.json()
  if (!r.ok) throw new Error(data.error || "AI error")
  return data.text as string
}
