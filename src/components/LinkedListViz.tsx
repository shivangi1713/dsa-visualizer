import React from 'react'
import type { LinkedList, LLNode } from '../lib/linkedlist'

export default function LinkedListViz({list, highlightId}: {list: LinkedList, highlightId?: number|null}) {
  const arr: LLNode[] = []
  let cur = list.head
  while (cur!=null) {
    const node = list.nodes.find(n=>n.id===cur)
    if (!node) break
    arr.push(node)
    cur = node.next
  }
  const width = Math.max(700, arr.length*140 + 60)
  const height = 140
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[160px] border rounded-2xl bg-white">
      {arr.map((n, i) => {
        const x = 30 + i*140
        const y = 40
        const isH = highlightId === n.id
        return (
          <g key={n.id}>
            <rect x={x} y={y} width={100} height={50} rx={10} className={isH? 'fill-indigo-300' : 'fill-gray-200'} />
            <text x={x+50} y={y+28} textAnchor="middle" fontSize="14" fill="#111">{n.value}</text>
            <text x={x+50} y={y+12} textAnchor="middle" fontSize="10" fill="#666">id:{n.id}</text>
            {i < arr.length-1 && (
              <>
                <line x1={x+100} y1={y+25} x2={x+130} y2={y+25} stroke="#555" strokeWidth="2" markerEnd="url(#arrow)"/>
              </>
            )}
          </g>
        )
      })}
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#555" />
        </marker>
      </defs>
    </svg>
  )
}
