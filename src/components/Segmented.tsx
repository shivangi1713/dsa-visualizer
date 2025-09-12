import React from 'react'
export default function Segmented({
  options, value, onChange
}:{options:{label:string,value:string}[], value:string, onChange:(v:string)=>void}){
  return (
    <div className="segmented" role="tablist" aria-label="Mode">
      {options.map(opt => (
        <button key={opt.value} role="tab" aria-pressed={value===opt.value} onClick={()=>onChange(opt.value)} className="border-r last:border-r-0">
          {opt.label}
        </button>
      ))}
    </div>
  )
}
