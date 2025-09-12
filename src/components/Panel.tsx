import React from 'react'
export default function Panel({title, children}: {title?: string, children: React.ReactNode}) {
  return (
    <div className="p-4 border rounded-2xl bg-white shadow-sm">
      {title && <div className="mb-2 font-medium">{title}</div>}
      {children}
    </div>
  )
}
