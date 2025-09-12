export type Node = { id:number, x:number, y:number, label?: string }
export type Edge = { a:number, b:number }
export type Graph = { nodes: Node[], edges: Edge[] }
let idCounter = 1

export function makeGraph(): Graph {
  // Create nodes first and wire edges using their fresh IDs (no hardcoded 1,2,3,4)
  const n1 = { id: idCounter++, x: 120, y: 120, label: '1' };
  const n2 = { id: idCounter++, x: 260, y: 80,  label: '2' };
  const n3 = { id: idCounter++, x: 260, y: 160, label: '3' };
  const n4 = { id: idCounter++, x: 420, y: 120, label: '4' };
  return {
    nodes: [n1, n2, n3, n4],
    edges: [
      { a: n1.id, b: n2.id },
      { a: n1.id, b: n3.id },
      { a: n2.id, b: n4.id },
      { a: n3.id, b: n4.id },
    ],
  };
}

export function addNode(g: Graph, x:number, y:number, label?:string) {
  g.nodes.push({ id: idCounter++, x, y, label })
}

export function toggleEdge(g: Graph, a:number, b:number) {
  if (a===b) return
  const i = g.edges.findIndex(e => (e.a===a && e.b===b) || (e.a===b && e.b===a))
  if (i>=0) g.edges.splice(i,1)
  else g.edges.push({a,b})
}

export function neighbors(g: Graph, id:number): number[] {
  const nb: number[] = []
  for (const e of g.edges){
    if (e.a===id) nb.push(e.b)
    else if (e.b===id) nb.push(e.a)
  }
  return nb
}

export type TraversalResult = { order: number[]; tree: Array<[number, number]> }

export function bfsWithTree(g: Graph, startId: number): TraversalResult {
  const order: number[] = []
  const tree: Array<[number, number]> = []
  const q: number[] = [startId]
  const seen = new Set<number>([startId])
  while(q.length){
    const v = q.shift()!
    order.push(v)
    for (const w of neighbors(g, v)){
      if (!seen.has(w)){
        seen.add(w); q.push(w); tree.push([v, w])
      }
    }
  }
  return { order, tree }
}

export function dfsWithTree(g: Graph, startId: number): TraversalResult {
  const order: number[] = []
  const tree: Array<[number, number]> = []
  const seen = new Set<number>()
  function dfs(v:number){
    seen.add(v); order.push(v)
    for (const w of neighbors(g, v)){
      if (!seen.has(w)){ tree.push([v, w]); dfs(w) }
    }
  }
  dfs(startId)
  return { order, tree }
}

/** Build a graph from a simple edge list text.
 * Each line defines an edge between two labels. Accepted separators:
 * space, comma, hyphen, or ->  (e.g., "A B", "A,B", "A-B", "A->B")
 * Nodes are placed around a circle automatically.
 */
export function buildGraphFromEdgeList(text: string): Graph {
  const rawLines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  const pairs: Array<[string,string]> = []
  for (const line of rawLines) {
    const parts = line.split(/[\s,->]+/).filter(Boolean)
    if (parts.length >= 2) pairs.push([parts[0], parts[1]])
  }
  if (pairs.length === 0) return makeGraph()

  const labels = Array.from(new Set(pairs.flat()))
  const labelToId = new Map<string, number>()
  const cx = 450, cy = 210
  const r = Math.min(cx, cy) - 60
  const nodes = labels.map((label, i) => {
    const id = idCounter++
    labelToId.set(label, id)
    const angle = (i / labels.length) * Math.PI * 2
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    return { id, x, y, label }
  })
  const edges = pairs.map(([a,b]) => ({ a: labelToId.get(a)!, b: labelToId.get(b)! }))
  return { nodes, edges }
}

/** Export a simple edge list using labels if present, else ids */
export function graphToEdgeList(g: Graph): string {
  const idToLabel = new Map<number, string>()
  for (const n of g.nodes) idToLabel.set(n.id, n.label ?? String(n.id))
  return g.edges.map(e => `${idToLabel.get(e.a)} ${idToLabel.get(e.b)}`).join('\n')
}
