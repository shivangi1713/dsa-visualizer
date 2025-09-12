export type BSTNode = { id: number, key: number, left: BSTNode | null, right: BSTNode | null }
let idCounter = 1
export type BST = { root: BSTNode | null }

function newNode(key:number): BSTNode { return { id: idCounter++, key, left: null, right: null } }
export function makeBST(): BST { return { root: null } }

export function insert(tree: BST, key: number) {
  const n = newNode(key)
  if (!tree.root){ tree.root = n; return }
  let cur = tree.root
  while (true){
    if (key < cur.key){
      if (cur.left) cur = cur.left
      else { cur.left = n; return }
    } else {
      if (cur.right) cur = cur.right
      else { cur.right = n; return }
    }
  }
}

export function search(tree: BST, key: number): BSTNode | null {
  let cur = tree.root
  while (cur){
    if (key === cur.key) return cur
    cur = key < cur.key ? cur.left : cur.right
  }
  return null
}

export function remove(tree: BST, key: number) {
  function del(node: BSTNode | null, k: number): BSTNode | null {
    if (!node) return null
    if (k < node.key) node.left = del(node.left, k)
    else if (k > node.key) node.right = del(node.right, k)
    else {
      if (!node.left) return node.right
      if (!node.right) return node.left
      let succ = node.right
      while (succ.left) succ = succ.left
      node.key = succ.key
      node.right = del(node.right, succ.key)
    }
    return node
  }
  tree.root = del(tree.root, key)
}

export function inorder(node: BSTNode | null, out: number[] = []): number[] {
  if (!node) return out
  inorder(node.left, out); out.push(node.key); inorder(node.right, out)
  return out
}
export function preorder(node: BSTNode | null, out: number[] = []): number[] {
  if (!node) return out
  out.push(node.key); preorder(node.left, out); preorder(node.right, out)
  return out
}
export function postorder(node: BSTNode | null, out: number[] = []): number[] {
  if (!node) return out
  postorder(node.left, out); postorder(node.right, out); out.push(node.key)
  return out
}

export type LayoutNode = { x:number, y:number, key:number, id:number, left?: LayoutNode, right?: LayoutNode }
export function layout(root: BSTNode | null): LayoutNode | null {
  if (!root) return null
  const xs: Record<number, number> = {}
  let idx = 0
  function assignX(n: BSTNode | null){
    if (!n) return
    assignX(n.left); xs[n.id] = idx++; assignX(n.right)
  }
  assignX(root)
  function build(n: BSTNode | null, depth=0): LayoutNode | null {
    if (!n) return null
    const node: LayoutNode = { x: xs[n.id]*70 + 40, y: depth*80 + 40, key: n.key, id: n.id }
    const L = build(n.left, depth+1)
    const R = build(n.right, depth+1)
    if (L) node.left = L
    if (R) node.right = R
    return node
  }
  return build(root)
}
