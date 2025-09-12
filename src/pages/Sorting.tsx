import React from 'react'
import Panel from '../components/Panel'
import BarArray from '../components/BarArray'
import { generateArray, algorithms, Step } from '../lib/sorting'
import Badge from '../components/Badge'
import Progress from '../components/Progress'

const COMPLEXITY: Record<string, {time:string, space:string, desc:string}> = {
  'Bubble Sort': { time: 'O(n²)', space: 'O(1)', desc: 'Adjacent swaps until sorted. Simple but slow.' },
  'Selection Sort': { time: 'O(n²)', space: 'O(1)', desc: 'Select min each pass and place it at the front.' },
  'Insertion Sort': { time: 'O(n²)', space: 'O(1)', desc: 'Build the sorted prefix by inserting each element.' },
  'Quick Sort': { time: 'O(n log n) avg', space: 'O(log n) stack', desc: 'Partition around pivot, then sort partitions.' },
}

export default function Sorting(){
  const [size, setSize] = React.useState(30)
  const [arr, setArr] = React.useState<number[]>(generateArray(size))
  const [algoName, setAlgoName] = React.useState<string>('Bubble Sort')
  const [steps, setSteps] = React.useState<Step[]>([])
  const [idx, setIdx] = React.useState(0)
  const [autorun, setAutorun] = React.useState(false)
  const [speed, setSpeed] = React.useState(60) // ms per step

  const current = steps[idx] ?? { arr, highlight: [] }
  const total = Math.max(1, steps.length-1)

  const regenerate = () => { setArr(generateArray(size)); setSteps([]); setIdx(0) }
  const compute = () => {
    const fn = algorithms[algoName]
    const s = fn(arr)
    setSteps(s); setIdx(0)
  }
  const step = () => { setIdx(i => Math.min((steps.length-1), i+1)) }
  const back = () => { setIdx(i => Math.max(0, i-1)) }

  React.useEffect(()=>{ setArr(generateArray(size)) }, [size])

  React.useEffect(()=>{
    let id: number | null = null
    if (autorun && steps.length>0 && idx < steps.length-1){
      id = setInterval(()=> setIdx(i => Math.min(steps.length-1, i+1)), Math.max(16, speed)) as unknown as number
    }
    return ()=>{ if (id) clearInterval(id) }
  }, [autorun, steps, idx, speed])

  const cx = COMPLEXITY[algoName]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2">Array size
          <input type="range" min={5} max={80} value={size} onChange={e=>setSize(Number(e.target.value))} className="w-40" />
          <span className="text-sm text-gray-600">{size}</span>
        </label>
        <button className="btn" onClick={regenerate}>Generate</button>
        <select className="px-3 py-2 rounded-xl border" value={algoName} onChange={e=>setAlgoName(e.target.value)}>
          {Object.keys(algorithms).map(k=>(<option key={k} value={k}>{k}</option>))}
        </select>
        <button className="btn" onClick={compute}>Prepare steps</button>
        <div className="ml-auto" />
        <label className="flex items-center gap-2">Speed
          <input type="range" min={20} max={300} value={speed} onChange={e=>setSpeed(Number(e.target.value))} className="w-40" />
          <span className="text-sm text-gray-600">{speed} ms</span>
        </label>
        <button className="btn" onClick={back}>◀</button>
        <button className="btn" onClick={step}>Step ▶</button>
        <button className={`btn ${autorun ? 'btn-primary' : ''}`} onClick={()=>setAutorun(a=>!a)}>{autorun? 'Pause' : 'Auto-Run'}</button>
      </div>

      <Panel title={`Array (${algoName}${steps.length? ` – step ${idx+1}/${steps.length}`:''})`}>
        <BarArray arr={current.arr} highlight={current.highlight ?? []} />
        {steps.length>0 && (
          <div className="mt-3">
            <Progress value={idx} max={total} />
          </div>
        )}
      </Panel>

      <div className="flex items-center gap-3 text-sm text-gray-700">
        <Badge tone="amber">Time: {cx.time}</Badge>
        <Badge tone="emerald">Space: {cx.space}</Badge>
        <span className="text-gray-600">— {cx.desc}</span>
      </div>
    </div>
  )
}
