import React from "react"

export type Tip = {
  title: string
  body: string
  bullets?: string[]
}

export default function HelpCenter({
  open,
  onClose,
  title,
  tips,
}: {
  open: boolean
  onClose: () => void
  title: string
  tips: Tip[]
}) {
  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    if (open) document.addEventListener("keydown", onEsc)
    return () => document.removeEventListener("keydown", onEsc)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-[min(880px,95vw)] max-h-[85vh] overflow-auto rounded-2xl border bg-white shadow-lg"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-cyan-50">
          <div className="font-semibold">{title}</div>
          <button className="px-3 py-1.5 rounded-lg hover:bg-indigo-100" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="p-5 space-y-4">
          {tips.map((t, i) => (
            <div key={i} className="p-4 border rounded-xl bg-white">
              <div className="font-medium">{t.title}</div>
              <p className="mt-1 text-sm text-gray-700">{t.body}</p>
              {!!t.bullets?.length && (
                <ul className="mt-2 list-disc ml-5 text-sm text-gray-700 space-y-1">
                  {t.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
          <div className="text-xs text-gray-500">Tip: Press <kbd>Esc</kbd> to close.</div>
        </div>
      </div>
    </div>
  )
}
