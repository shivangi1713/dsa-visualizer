import React from 'react'
import Panel from '../components/Panel'
import BSTViz from '../components/BSTViz'
import { makeBST, insert, remove, search, inorder, preorder, postorder, layout, type BST } from '../lib/bst'

export default function BSTPage(){
  const [tree, setTree] = React.useState<BST>(makeBST())
  const [key, setKey] = React.useState(50)
  const [foundId, setFoundId] = React.useState<number|null>(null)

  const doInsert = () => { insert(tree, key); setTree({...tree}); setFoundId(null) }
  const doDelete = () => { remove(tree, key); setTree({...tree}); setFoundId(null) }
  const doSearch = () => { const n = search(tree, key); setFoundId(n?.id ?? null) }

  const L = layout(tree.root)
  const io = inorder(tree.root).join(', ')
  const po = preorder(tree.root).join(', ')
  const posto = postorder(tree.root).join(', ')

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2">Key
          <input type="number" className="px-2 py-1 border rounded w-24" value={key} onChange={e=>setKey(Number(e.target.value))}/>
        </label>
        <button className="btn" onClick={doInsert}>Insert</button>
        <button className="btn" onClick={doDelete}>Delete</button>
        <button className="btn" onClick={doSearch}>Search</button>
      </div>
      <div className="text-sm text-gray-600">Tip: Insert a balanced spread of keys for a compact tree (e.g., 50, 25, 75, …).</div>
      <Panel title="Tree">
        <BSTViz tree={L} highlightId={foundId} />
      </Panel>
      <Panel title="Traversals">
        <div className="text-sm text-gray-700 space-y-1">
          <div><span className="font-medium">Inorder:</span> {io || '—'}</div>
          <div><span className="font-medium">Preorder:</span> {po || '—'}</div>
          <div><span className="font-medium">Postorder:</span> {posto || '—'}</div>
        </div>
      </Panel>
    </div>
  )
}
