import React from 'react'
import Panel from '../components/Panel'
import GraphViz from '../components/GraphViz'
import Segmented from '../components/Segmented'
import {
  makeGraph, addNode, toggleEdge,
  bfsWithTree, dfsWithTree, type Graph,
  buildGraphFromEdgeList, graphToEdgeList
} from '../lib/graph'

export default function GraphPage(){
  const [graph, setGraph] = React.useState<Graph>(makeGraph())
  const [selected, setSelected] = React.useState<number|null>(null)
  const [mode, setMode] = React.useState<'select'|'edge'|'add'>('select')
  const [path, setPath] = React.useState<number[]>([])
  const [treeEdges, setTreeEdges] = React.useState<Array<[number,number]>>([])
  const [pending, setPending] = React.useState<number|null>(null)
  const [importText, setImportText] = React.useState<string>(`A B
A C
B D
C D`)

  // Ensure there is a selected start node
  React.useEffect(() => {
    if (selected == null && graph.nodes.length > 0) setSelected(graph.nodes[0].id)
  }, [graph, selected])

  const onSelect = (id:number) => {
    if (mode==='edge'){
      if (pending==null) setPending(id)
      else { toggleEdge(graph, pending, id); setGraph({...graph}); setPending(null) }
    } else {
      setSelected(id)
    }
  }

  const onAddNode = (x:number, y:number) => {
    if (mode!=='add') return
    addNode(graph, x, y)
    setGraph({...graph})
  }

  const runBFS = () => {
    const start = selected ?? graph.nodes[0]?.id
    if (!start) return
    const r = bfsWithTree(graph, start)
    setPath(r.order); setTreeEdges(r.tree)
  }

  const runDFS = () => {
    const start = selected ?? graph.nodes[0]?.id
    if (!start) return
    const r = dfsWithTree(graph, start)
    setPath(r.order); setTreeEdges(r.tree)
  }

  const reset = () => {
    setGraph(makeGraph()); setPath([]); setTreeEdges([]); setSelected(null); setPending(null)
  }

  const doImport = () => {
    const g = buildGraphFromEdgeList(importText)
    setGraph(g); setPath([]); setTreeEdges([]); setSelected(null); setPending(null)
  }

  const copyEdgeList = async () => {
    const text = graphToEdgeList(graph)
    try { await navigator.clipboard.writeText(text) } catch {}
    alert('Edge list copied to clipboard.')
  }

  return (
    <div className="space-y-4">
      <Panel title="Import / Export">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-700 mb-2">Paste an edge list (formats: <code>A B</code>, <code>A,B</code>, <code>A-B</code>, or <code>A-&gt;B</code> per line)</div>
            <textarea className="w-full h-28 p-2 border rounded-xl" value={importText} onChange={e=>setImportText(e.target.value)} />
            <div className="mt-2 flex gap-2">
              <button className="btn btn-primary" onClick={doImport}>Import edge list</button>
              <button className="btn" onClick={copyEdgeList}>Copy current edge list</button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <div className="mb-2">Tips</div>
            <ul className="list-disc ml-5 space-y-1">
              <li>Labels are supported (e.g., A, B, C). They render on nodes.</li>
              <li>Click a node to set the BFS/DFS start (auto-selected if none).</li>
              <li>Modes: <b>Select</b> (pick start), <b>Edge</b> (toggle edges by clicking two nodes), <b>Add</b> (click canvas to add nodes).</li>
            </ul>
          </div>
        </div>
      </Panel>

      <div className="flex flex-wrap items-center gap-3">
        <button className="btn" onClick={reset}>Reset graph</button>
        <div className="ml-auto" />
        <Segmented options={[{label:'Select',value:'select'},{label:'Edge',value:'edge'},{label:'Add Node',value:'add'}]} value={mode} onChange={(v)=>setMode(v as any)} />
        <button className="btn" onClick={runBFS}>Run BFS</button>
        <button className="btn" onClick={runDFS}>Run DFS</button>
      </div>

      <div className="text-sm text-gray-600">
        {selected ? <>Start node: <b>{graph.nodes.find(n=>n.id===selected)?.label ?? selected}</b>. </> : <>Select a start node.</>} 
        In Edge mode, click two nodes to toggle an edge. In Add Node mode, click empty canvas.
      </div>

      <Panel title={`Graph ${selected? `(start ${graph.nodes.find(n=>n.id===selected)?.label ?? selected})`:''}`}>
        <GraphViz g={graph} path={path} treeEdges={treeEdges} selectedId={selected} onSelect={onSelect} onAddNode={onAddNode}/>
      </Panel>

      <Panel title="Visitation order">
        <div className="text-sm text-gray-700">{path.length? path.map(id => graph.nodes.find(n=>n.id===id)?.label ?? id).join(' → ') : '—'}</div>
      </Panel>
    </div>
  )
}
