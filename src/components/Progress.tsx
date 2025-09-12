import React from 'react'
export default function Progress({value, max}:{value:number, max:number}){
  const pct = Math.max(0, Math.min(100, Math.round((value/max)*100)))
  return <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><span style={{width: pct+'%'}}/></div>
}
