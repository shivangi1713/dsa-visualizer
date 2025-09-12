import React from 'react'

export default function BarArray({arr, highlight=[]}: {arr:number[], highlight?: number[]}) {
  const max = Math.max(...arr, 1)
  return (
    <div className="h-64 flex items-end gap-1 border rounded-xl p-2 bg-white overflow-hidden">
      {arr.map((v,i)=>(
        <div key={i} className={`flex-1 rounded-t ${highlight.includes(i)?'bg-indigo-500':'bg-gray-800'}`} style={{height: `${(v/max)*100}%`}} />
      ))}
    </div>
  )
}
