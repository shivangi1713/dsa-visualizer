import React from 'react'
import type { LayoutNode } from '../lib/bst'

export default function BSTViz({tree, highlightId}: {tree: LayoutNode | null, highlightId?: number|null}) {
  const w = 900, h = 400
  function draw(n: LayoutNode | null, lines: JSX.Element[], nodes: JSX.Element[]) {
    if (!n) return
    if (n.left) { lines.push(<line key={`l${n.id}`} x1={n.x} y1={n.y} x2={n.left.x} y2={n.left.y} stroke="#999" />); draw(n.left, lines, nodes) }
    if (n.right){ lines.push(<line key={`r${n.id}`} x1={n.x} y1={n.y} x2={n.right.x} y2={n.right.y} stroke="#999" />); draw(n.right, lines, nodes) }
    const isH = highlightId === n.id
    nodes.push(<g key={n.id}><circle cx={n.x} cy={n.y} r={18} className={isH? 'fill-indigo-300' : 'fill-gray-200'} stroke="#555"/><text x={n.x} y={n.y+5} textAnchor="middle" fontSize="12" fill="#111">{n.key}</text></g>)
  }
  const lines: JSX.Element[] = []; const nodes: JSX.Element[] = []; if (tree) draw(tree, lines, nodes)
  return <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[420px] border rounded-2xl bg-white">{lines}{nodes}</svg>
}
