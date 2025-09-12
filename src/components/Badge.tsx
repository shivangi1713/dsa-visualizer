import React from 'react'
export default function Badge({children, tone='indigo'}:{children:React.ReactNode, tone?:'indigo'|'amber'|'emerald'}){
  const cls = tone==='amber' ? 'badge badge-amber' : tone==='emerald' ? 'badge badge-emerald' : 'badge badge-indigo'
  return <span className={cls}>{children}</span>
}
