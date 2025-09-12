import React from 'react'
import { Link } from 'react-router-dom'

function Sparkle(){ return (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2l1.8 4.6L18 8.4l-4.2 1.2L12 14l-1.8-4.4L6 8.4l4.2-1.8L12 2z" stroke="#6366f1" />
  </svg>
)}

export default function Home(){
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border bg-white p-8">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-indigo-100 blur-2xl opacity-60" />
        <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-cyan-100 blur-2xl opacity-60" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 text-sm text-indigo-700 bg-indigo-50 rounded-full px-3 py-1 mb-3">
            <Sparkle/>SHIVANGI😊
          </div>
          <h1 className="text-3xl font-semibold leading-tight">Understand Data Structures & Algorithms with clean, interactive visuals</h1>
          <p className="mt-2 text-gray-700">Step through operations, see state changes, and build intuition—no heavy graphics, just crisp SVG & Tailwind.</p>
          <div className="mt-4 flex gap-3">
            <Link to="/sorting" className="btn btn-primary">Try Sorting</Link>
            <Link to="/graph" className="btn btn-ghost">Explore Graphs</Link>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <Link to="/sorting" className="card">
          <div className="font-medium">Sorting Visualizer</div>
          <div className="text-sm text-gray-600">Bubble, Selection, Insertion, Quick — step-by-step with highlights.</div>
        </Link>
        <Link to="/linked-list" className="card">
          <div className="font-medium">Singly Linked List</div>
          <div className="text-sm text-gray-600">Push/Pop, Insert/Delete at index. Watch pointers update.</div>
        </Link>
        <Link to="/bst" className="card">
          <div className="font-medium">Binary Search Tree</div>
          <div className="text-sm text-gray-600">Insert, Delete, Search with live traversals.</div>
        </Link>
        <Link to="/graph" className="card">
          <div className="font-medium">Graph (BFS/DFS)</div>
          <div className="text-sm text-gray-600">Add nodes/edges; visualize visitation order.</div>
        </Link>
      </section>
    </div>
  )
}
