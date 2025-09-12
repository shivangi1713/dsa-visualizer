export type LLNode = { id: number, value: number, next: number | null }
export type LinkedList = { head: number | null, nodes: LLNode[] }

let idCounter = 1
export function makeList(n=5): LinkedList {
  const nodes: LLNode[] = []
  let head: number | null = null
  for (let i=0;i<n;i++){
    const id = idCounter++
    nodes.push({ id, value: Math.floor(Math.random()*99)+1, next: null })
    if (i===0) head = id
    else nodes[i-1].next = id
  }
  return { head, nodes }
}

export function pushFront(list: LinkedList, value: number) {
  const id = idCounter++
  list.nodes.push({ id, value, next: list.head })
  list.head = id
}

export function pushBack(list: LinkedList, value: number) {
  const id = idCounter++
  const node = { id, value, next: null }
  list.nodes.push(node)
  if (list.head == null) { list.head = id; return }
  let cur = list.nodes.find(n=>n.id===list.head)!
  while (cur.next != null) cur = list.nodes.find(n=>n.id===cur.next)!
  cur.next = id
}

export function deleteAt(list: LinkedList, index: number) {
  if (index<0) return
  if (list.head==null) return
  if (index===0){ list.head = list.nodes.find(n=>n.id===list.head)?.next ?? null; return }
  let prev = list.nodes.find(n=>n.id===list.head)!
  let curIdx = 0
  while (prev && curIdx<index-1 && prev.next!=null){
    prev = list.nodes.find(n=>n.id===prev.next)!
    curIdx++
  }
  if (prev.next!=null){
    const cur = list.nodes.find(n=>n.id===prev.next)!
    prev.next = cur.next
  }
}

export function toArray(list: LinkedList): LLNode[] {
  const out: LLNode[] = []
  let curId = list.head
  while (curId!=null){
    const node = list.nodes.find(n=>n.id===curId)
    if (!node) break
    out.push(node)
    curId = node.next
  }
  return out
}
