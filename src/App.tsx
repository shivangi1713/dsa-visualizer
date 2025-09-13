import React from 'react'
import { NavLink, Route, Routes, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Sorting from './pages/Sorting'
import LinkedListPage from './pages/LinkedListPage'
import BSTPage from './pages/BSTPage'
import GraphPage from './pages/GraphPage'

import HelpCenter from './components/HelpCenter'   // if you added tips earlier
import { tipsByRoute } from './data/tips'          // optional
import AISidebar, { AISidebarDrawer } from './components/AISidebar' // <<< NEW

const NavItem: React.FC<{to: string, label: string}> = ({to, label}) => (
  <NavLink to={to} className={({isActive}) => `px-3 py-2 rounded-xl transition-colors ${isActive ? 'bg-indigo-100 text-indigo-900' : 'hover:bg-indigo-50'}`}>{label}</NavLink>
)

export default function App() {
  const [helpOpen, setHelpOpen] = React.useState(false)
  const [aiOpen, setAiOpen] = React.useState(false) // <<< NEW
  const loc = useLocation()

  const tipsKey = ((): string => {
    const p = loc.pathname
    if (tipsByRoute?.[p]) return p
    const base = ['/', '/sorting', '/linked-list', '/bst', '/graph'].find(k => p.startsWith(k))
    return base ?? '/'
  })()
  const { title, tips } = tipsByRoute?.[tipsKey] ?? { title: 'Tips', tips: [] }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-amber-50 to-cyan-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">DSA Visualizer</Link>
          <nav className="flex items-center gap-2">
            <NavItem to="/" label="Home" />
            <NavItem to="/sorting" label="Sorting" />
            <NavItem to="/linked-list" label="Linked List" />
            <NavItem to="/bst" label="BST" />
            <NavItem to="/graph" label="Graph (BFS/DFS)" />
            <button
              className="hidden lg:inline-flex ml-2 px-3 py-2 rounded-xl border hover:bg-indigo-50"
              onClick={() => setHelpOpen(true)}
              title="Open tips"
            >
              ❓ Tips
            </button>
            {/* Mobile Gemini toggle */}
            <button
              className="lg:hidden ml-2 px-3 py-2 rounded-xl border hover:bg-indigo-50"
              onClick={() => setAiOpen(true)}
              title="Open Gemini"
            >
              ⚡ Gemini
            </button>
          </nav>
        </div>
      </header>

      {/* Main: sidebar + content */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
          {/* Sidebar (desktop only) */}
          <div className="hidden lg:block">
            <AISidebar />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/sorting" element={<Sorting/>} />
              <Route path="/linked-list" element={<LinkedListPage/>} />
              <Route path="/bst" element={<BSTPage/>} />
              <Route path="/graph" element={<GraphPage/>} />
            </Routes>
          </div>
        </div>
      </main>

      {/* Footer (unchanged except your gradient/color choices) */}
      <footer className="border-t bg-gradient-to-r from-indigo-100 via-amber-100 to-cyan-100">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-900">
          Built with React + TypeScript + Tailwind.
        </div>
      </footer>

      {/* Modals / Drawers */}
      {tips?.length ? <HelpCenter open={helpOpen} onClose={()=>setHelpOpen(false)} title={title} tips={tips}/> : null}
      <AISidebarDrawer open={aiOpen} onClose={()=>setAiOpen(false)} />
    </div>
  )
}
