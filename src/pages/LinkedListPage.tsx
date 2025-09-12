import React from 'react'
import Panel from '../components/Panel'
import LinkedListViz from '../components/LinkedListViz'
import { makeList, pushFront, pushBack, deleteAt, toArray, type LinkedList } from '../lib/linkedlist'

export default function LinkedListPage(){
  const [list, setList] = React.useState<LinkedList>(makeList())
  const [val, setVal] = React.useState(42)
  const [idx, setIdx] = React.useState(0)
  const [hl, setHl] = React.useState<number|null>(null)

  const regen = () => setList(makeList())
  const doPushFront = () => { pushFront(list, val); setList({...list}); setHl(list.head) }
  const doPushBack = () => { pushBack(list, val); setList({...list}); setHl(null) }
  const doDelete = () => { deleteAt(list, idx); setList({...list}); setHl(null) }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button className="btn" onClick={regen}>Generate list</button>
        <label className="flex items-center gap-2">Value
          <input type="number" className="px-2 py-1 border rounded w-24" value={val} onChange={e=>setVal(Number(e.target.value))}/>
        </label>
        <button className="btn" onClick={doPushFront}>Push Front</button>
        <button className="btn" onClick={doPushBack}>Push Back</button>
        <label className="flex items-center gap-2">Index
          <input type="number" className="px-2 py-1 border rounded w-20" value={idx} onChange={e=>setIdx(Number(e.target.value))}/>
        </label>
        <button className="btn" onClick={doDelete}>Delete At</button>
      </div>
      <div className="text-sm text-gray-600">Tip: Use Push Front to add a new head, or Delete At index 0 to remove head.</div>
      <Panel title={`List (${toArray(list).length} nodes)`}>
        <LinkedListViz list={list} highlightId={hl} />
      </Panel>
    </div>
  )
}
