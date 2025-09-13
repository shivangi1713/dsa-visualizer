# DSA Visualizer.

Clean, interactive visuals for **Sorting**, **Singly Linked List**, **Binary Search Tree**, and **Graphs (BFS/DFS + Provinces)**. Built with **React + TypeScript + Tailwind + Vite**. Optional **Gemini Tutor** sidebar gives short,explanations of what you’re seeing.

---

## 1) Project Overview
- **Client-side visuals**: Algorithms render as lightweight SVG; no backend is required for animations.
- **Step-by-step intuition**: Precomputed snapshots (sorting) and live pointer/tree updates (list/BST/graph).
- **Gemini Tutor**: A small local server calls Google’s Gemini to generate explanations (`/api/explain`).
- **Friendly UI**: Clean layout, gradients, and a Tips modal with quick guidance on each page.
  
<img width="1465" height="849" alt="Screenshot 2025-09-14 015456" src="https://github.com/user-attachments/assets/46b8a529-5ba5-4180-94c2-49b5ed820b15" />
> Live visuals run entirely in the browser. Only the Gemini feature calls a backend (local Express server).

---

## 2) Objective
- Help beginners **see** how data structures & algorithms evolve over time.
- Provide a safe space to **experiment with small inputs** and build intuition.
- Offer **on-demand explanations** via Gemini without leaving the page.
- Keep the codebase **simple, modular, and extendable** (add more DSAs later).

---

## 3) Key Components
- **UI Pages**: `Home`, `Sorting`, `Linked List`, `BST`, `Graph (BFS/DFS)`.
- **Visual primitives**: Bars (sorting), nodes/edges (graph), circles/arrows (list), tree layout (BST).
- **Algorithm library** (src/lib): Sorting steps, BFS/DFS traversal, list ops, BST insert/search/delete.
- **Tips** (src/data/tips.ts): Page-specific guidance shown in a modal.
- **Gemini Tutor**:
  - server/index.mjs: Express server (POST /api/explain) using @google/genai.
  - src/lib/ai.ts: Tiny fetch helper for the UI.
  - src/components/AISidebar.tsx: Always-available sidebar (drawer on mobile).

---

## 4) Workflow


<img width="1465" height="811" alt="Screenshot 2025-09-14 013026" src="https://github.com/user-attachments/assets/e7042834-20ef-457a-8d1f-c2fadc057086" />



1. User picks a visualizer and interacts with controls (size, steps, operations).
2. The page updates **local state** → SVG re-renders the current snapshot.
3. (Optional) User asks **Gemini Tutor** → UI calls `/api/explain` through Vite’s dev proxy.
4. Express server reads `GEMINI_API_KEY` from `.env`, calls Gemini (`gemini-2.5-flash`), returns text.
5. UI displays a short explanation inside the sidebar/drawer.

> The core visuals do **not** depend on the server; the server is only for AI explanations.

---

## 5) Supported DSAs (current)
- **Sorting**: Bubble • Selection • Insertion • Quick  
  _Highlights comparisons/swaps; step/auto-run with speed control._
- **Singly Linked List**: Push/Pop Front/Back • Insert/Delete at index  
  _Pointers update visually; great for seeing re-links._
- **Binary Search Tree**: Insert • Search • Delete (0/1/2-child cases)  
  _Traversals (inorder/preorder/postorder) update live._
- **Graph**: BFS • DFS • Provinces (Connected Components)  
  _Add nodes/edges manually; import edge list or adjacency matrix; show visitation order & tree edges._

---


