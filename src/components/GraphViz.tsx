import React from 'react'
import type { Graph } from '../lib/graph'

export default function GraphViz({
  g, path=[], treeEdges=[], selectedId, onSelect, onAddNode
}: {
  g: Graph,
  path?: number[],
  treeEdges?: Array<[number, number]>,
  selectedId?: number|null,
  onSelect?: (id:number)=>void,
  onAddNode?: (x:number,y:number)=>void,
}) {
  const w=900,h=420
  const pathSet = new Set(path)
  const treeSet = new Set(treeEdges.map(([a,b]) => a < b ? `${a}-${b}` : `${b}-${a}`))

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = (e.target as SVGElement).closest('svg')!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    onAddNode && onAddNode(x, y)
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[420px] border rounded-2xl bg-white" onClick={handleClick}>
      {/* edges */}
      {g.edges.map((e,i)=>{
        const a = g.nodes.find(n=>n.id===e.a)
        const b = g.nodes.find(n=>n.id===e.b)
        if (!a || !b) return null // guard against stale edges
        const key = e.a < e.b ? `${e.a}-${e.b}` : `${e.b}-${e.a}`
        const isTree = treeSet.has(key)
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={isTree? '#6366f1':'#999'} strokeWidth={isTree? 3:2} />
      })}
      {/* nodes */}
      {g.nodes.map(n=>{
        const isSel = selectedId===n.id
        const inPath = pathSet.has(n.id)
        return (
          <g key={n.id} onClick={(e)=>{ e.stopPropagation(); onSelect && onSelect(n.id); }}>
            <circle cx={n.x} cy={n.y} r={20} className={inPath? 'fill-indigo-200' : 'fill-gray-200'} stroke={isSel? '#1e293b' : '#555'} strokeWidth={isSel? 3 : 1.5}/>
            <text x={n.x} y={n.y+5} textAnchor="middle" fontSize="12" fill="#111">{n.label ?? n.id}</text>
          </g>
        )
      })}
    </svg>
  )
}
