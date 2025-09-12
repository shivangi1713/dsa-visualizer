import React from 'react'
import { NavLink, Route, Routes, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Sorting from './pages/Sorting'
import LinkedListPage from './pages/LinkedListPage'
import BSTPage from './pages/BSTPage'
import GraphPage from './pages/GraphPage'
import HelpCenter from './components/HelpCenter'
import { tipsByRoute } from './data/tips'

const NavItem: React.FC<{to: string, label: string}> = ({to, label}) => (
  <NavLink to={to} className={({isActive}) => `px-3 py-2 rounded-xl transition-colors ${isActive ? 'bg-indigo-100 text-indigo-900' : 'hover:bg-indigo-50'}`}>{label}</NavLink>
)

export default function App() {
  const [helpOpen, setHelpOpen] = React.useState(false)
  const loc = useLocation()

  // Choose tips by path; fall back to home
  const tipsKey = ((): string => {
    const p = loc.pathname
    if (tipsByRoute[p]) return p
    // match base paths like /graph/foo
    const base = ['/', '/sorting', '/linked-list', '/bst', '/graph'].find(k => p.startsWith(k))
    return base ?? '/'
  })()
  const { title, tips } = tipsByRoute[tipsKey] ?? tipsByRoute["/"]

  // Show once on very first visit
  React.useEffect(() => {
    const k = 'tipsShownOnce'
    if (!localStorage.getItem(k)) {
      setHelpOpen(true)
      localStorage.setItem(k, '1')
    }
  }, [])

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-gradient-to-r from-indigo-50 to-cyan-50 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">DSA Visualizer</Link>
          <nav className="flex items-center gap-2">
            <NavItem to="/" label="Home" />
            <NavItem to="/sorting" label="Sorting" />
            <NavItem to="/linked-list" label="Linked List" />
            <NavItem to="/bst" label="BST" />
            <NavItem to="/graph" label="Graph (BFS/DFS)" />
            <button
              className="ml-2 px-3 py-2 rounded-xl border hover:bg-indigo-50"
              onClick={() => setHelpOpen(true)}
              aria-label="Open tips"
              title="Open tips"
            >
              ❓ Tips
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sorting" element={<Sorting/>} />
          <Route path="/linked-list" element={<LinkedListPage/>} />
          <Route path="/bst" element={<BSTPage/>} />
          <Route path="/graph" element={<GraphPage/>} />
        </Routes>
      </main>

      <footer className="border-t border-indigo-200/60 bg-gradient-to-r from-indigo-50 via-amber-50 to-indigo-50">
  <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-900">
    Built with React + TypeScript + Tailwind.
  </div>
</footer>










      <HelpCenter open={helpOpen} onClose={()=>setHelpOpen(false)} title={title} tips={tips}/>
    </div>
  )
}
