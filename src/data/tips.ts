import type { Tip } from "../components/HelpCenter"

export const tipsByRoute: Record<string, { title: string; tips: Tip[] }> = {
  "/": {
    title: "Welcome — Using this Visualizer",
    tips: [
      {
        title: "What this app does",
        body: "Visual, step-by-step intuition for Sorting, Linked Lists, BSTs, and Graph traversals.",
        bullets: ["No backend; runs in your browser", "Use small inputs first to build intuition"],
      },
      {
        title: "Navigation",
        body: "Use the header to switch pages. Each page has its own controls and tips.",
      },
    ],
  },

  "/sorting": {
    title: "Sorting Visualizer — How it works",
    tips: [
      {
        title: "Features",
        body: "Visualize Bubble, Selection, Insertion, Quick.",
        bullets: [
          "Generate: create a random array (use the size slider).",
          "Prepare steps: precompute snapshots for the chosen algorithm.",
          "Step / Auto-Run: play through snapshots; Speed slider controls playback.",
          "Highlights: colored bars show compares/swaps; progress bar shows step index.",
        ],
      },
      {
        title: "Learning cues",
        body: "Each snapshot captures an operation; notes indicate 'Compare', 'Swap', 'Insert', etc.",
        bullets: ["Bubble/Selection are O(n²); Quick is ~O(n log n) average", "Watch how Quick’s pivot partitions the array"],
      },
    ],
  },

  "/linked-list": {
    title: "Singly Linked List — How to use",
    tips: [
      {
        title: "Operations",
        body: "Manipulate head/tail and visualize pointers.",
        bullets: [
          "Push Front: new node becomes the head; its next points to old head.",
          "Push Back: appends at tail.",
          "Delete At: remove node at zero-based index; index 0 removes head.",
        ],
      },
      {
        title: "Reading the diagram",
        body: "Boxes are nodes; arrows are next pointers; IDs help track nodes after updates.",
      },
    ],
  },

  "/bst": {
    title: "Binary Search Tree — How to use",
    tips: [
      {
        title: "Operations",
        body: "Insert, Search, Delete; traversals update live.",
        bullets: [
          "Insert: goes left if smaller, right if larger/equal (as implemented).",
          "Search: highlights the found node.",
          "Delete: handles 0/1/2-child cases (inorder successor).",
        ],
      },
      {
        title: "Layout & Traversals",
        body: "X positions come from inorder order; deeper levels are lower.",
        bullets: [
          "Inorder yields sorted keys.",
          "Preorder/Postorder help understand recursive structure.",
        ],
      },
    ],
  },

  "/graph": {
    title: "Graph (BFS/DFS) — How to use",
    tips: [
      {
        title: "Build or import a graph",
        body: "Create nodes/edges manually or import data.",
        bullets: [
          "Modes: Select / Edge / Add Node.",
          "Edge-list import: lines like `A B`, `A,B`, `A-B`, or `A->B` (treated undirected).",
          "Adjacency matrix import: JSON like [[1,1,0],[1,1,0],[0,0,1]].",
        ],
      },
      {
        title: "Run traversals & provinces",
        body: "BFS/DFS show visitation order and highlight the traversal tree.",
        bullets: [
          "Pick a start node (auto-selected if none).",
          "Compute provinces: colors connected components (e.g., LeetCode 547).",
          "Robust rendering: invalid/stale edges are ignored rather than crashing.",
        ],
      },
    ],
  },
}
