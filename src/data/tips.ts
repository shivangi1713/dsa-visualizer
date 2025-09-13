import type { Tip } from "../components/HelpCenter"

export const tipsByRoute: Record<string, { title: string; tips: Tip[] }> = {
  "/": {
    title: "Welcome — Using this Visualizer",
    tips: [
      {
        title: "What this app does",
        body:
          "Visual, step-by-step intuition for Sorting, Linked Lists, BSTs, and Graph traversals — clean SVG, no heavy graphics.",
        bullets: [
          "No backend for visuals (runs in your browser).",
          "Use small inputs first to build intuition.",
          "New: ✨ Gemini Tutor — quick explanations on every page.",
        ],
      },
      {
        title: "Gemini Tutor (AI help)",
        body:
          "Ask questions about what you see. Desktop: left sidebar. Mobile: tap ⚡ Gemini in the header.",
        bullets: [
          "Use the suggestion chips to get started.",
          "The AI calls your local /api/explain (keep the Node server running).",
          "If you see “AI request failed…”, check `/api/health` and restart the server.",
        ],
      },
      {
        title: "Navigation",
        body:
          "Use the header to switch pages. Each page has its own controls and tips.",
        bullets: [
          "Sorting → step/auto-run snapshots with highlights.",
          "Linked List → watch pointers update as you edit.",
          "BST → insert/search/delete with live traversals.",
          "Graph → build/import graphs; run BFS/DFS; provinces.",
        ],
      },
    ],
  },

  "/sorting": {
    title: "Sorting Visualizer — How it works",
    tips: [
      {
        title: "Core workflow",
        body:
          "Pick an algorithm, generate an array, then play through precomputed steps.",
        bullets: [
          "Prepare steps → creates snapshots for the chosen algorithm.",
          "Step ▶ / ◀ or Auto-Run; Speed slider controls playback.",
          "Highlights = comparisons/swaps; progress bar = snapshot index.",
        ],
      },
      {
        title: "Ask Gemini about a step",
        body:
          "Click your **Test Gemini** button (or open the sidebar) to explain the current step.",
        bullets: [
          "Bubble/Selection/Insertion are O(n²); Quick is ~O(n log n) avg.",
          "Ask: “Why did these two bars swap?” or “Why is Quick faster?”",
        ],
      },
    ],
  },

  "/linked-list": {
    title: "Singly Linked List — How to use",
    tips: [
      {
        title: "Operations",
        body: "Manipulate head/tail and visualize next pointers.",
        bullets: [
          "Push Front → new head; next = oldHead.",
          "Push Back → append at tail.",
          "Delete At (index) → rewires pointers; index 0 removes head.",
        ],
      },
      {
        title: "Ask Gemini",
        body:
          "Use the sidebar for quick explanations of the last change.",
        bullets: [
          "Ask: “Show what pointer changed after delete-at(2).”",
          "Why delete by index is O(n): Gemini will explain the traversal.",
        ],
      },
    ],
  },

  "/bst": {
    title: "Binary Search Tree — How to use",
    tips: [
      {
        title: "Operations & traversals",
        body:
          "Insert, Search, Delete; traversals update live. Layout uses inorder X-positions.",
        bullets: [
          "Delete handles 0/1/2-child cases (inorder successor).",
          "Inorder prints keys sorted.",
        ],
      },
      {
        title: "Ask Gemini",
        body:
          "Have Gemini explain which delete case applied and why.",
        bullets: [
          "Ask: “Why did node 7 get replaced during delete?”",
          "Or: “Explain preorder vs inorder in one sentence.”",
        ],
      },
    ],
  },

  "/graph": {
    title: "Graph (BFS/DFS) — How to use",
    tips: [
      {
        title: "Build or import",
        body:
          "Create nodes/edges manually or import an edge list / adjacency matrix.",
        bullets: [
          "Modes: Select / Edge / Add Node.",
          "Edge list: lines like `A B`, `A,B`, `A-B`, `A->B` (treated undirected).",
          "Adjacency matrix: JSON like [[1,1,0],[1,1,0],[0,0,1]].",
        ],
      },
      {
        title: "Run traversals & provinces",
        body:
          "Pick a start node, run BFS/DFS; nodes fill softly; traversal tree edges thicken.",
        bullets: [
          "Provinces colors connected components (e.g., LC 547).",
          "Ask Gemini: “Explain this BFS order in simple terms.”",
        ],
      },
    ],
  },
}
