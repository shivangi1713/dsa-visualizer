export type Step = { arr: number[], highlight?: number[], note?: string }

function snap(a: number[], highlight: number[] = [], note?: string): Step {
  return { arr: [...a], highlight: [...highlight], note }
}

export function generateArray(n=30, min=5, max=100) {
  return Array.from({length:n}, () => Math.floor(Math.random()*(max-min+1))+min)
}

export function bubbleSortSteps(arr: number[]): Step[] {
  const a = [...arr]
  const steps: Step[] = [snap(a, [], 'Start')]
  for (let i=0;i<a.length;i++){
    for (let j=0;j<a.length-1-i;j++){
      steps.push(snap(a, [j, j+1], 'Compare'))
      if (a[j] > a[j+1]){
        const t = a[j]; a[j]=a[j+1]; a[j+1]=t
        steps.push(snap(a, [j, j+1], 'Swap'))
      }
    }
  }
  return steps
}

export function selectionSortSteps(arr: number[]): Step[] {
  const a = [...arr]
  const steps: Step[] = [snap(a, [], 'Start')]
  for (let i=0;i<a.length;i++){
    let minIdx = i
    for (let j=i+1;j<a.length;j++){
      steps.push(snap(a, [minIdx, j], 'Find min'))
      if (a[j] < a[minIdx]) minIdx = j
    }
    if (minIdx !== i) {
      const t=a[i]; a[i]=a[minIdx]; a[minIdx]=t
      steps.push(snap(a, [i, minIdx], 'Place min'))
    }
  }
  return steps
}

export function insertionSortSteps(arr: number[]): Step[] {
  const a = [...arr]
  const steps: Step[] = [snap(a, [], 'Start')]
  for (let i=1;i<a.length;i++){
    let key=a[i]
    let j=i-1
    while (j>=0 && a[j]>key){
      steps.push(snap(a, [j, j+1], 'Shift right'))
      a[j+1]=a[j]
      j--
      steps.push(snap(a, [j+1], 'After shift'))
    }
    a[j+1]=key
    steps.push(snap(a, [j+1], 'Insert'))
  }
  return steps
}

export function quickSortSteps(arr: number[]): Step[] {
  const a = [...arr]
  const steps: Step[] = [snap(a, [], 'Start')]

  function part(l:number, r:number): number {
    const pivot = a[r]
    let i = l
    for (let j=l;j<r;j++){
      steps.push(snap(a, [j, r], 'Compare with pivot'))
      if (a[j] <= pivot){
        const t=a[i]; a[i]=a[j]; a[j]=t
        steps.push(snap(a, [i, j], 'Swap <= pivot'))
        i++
      }
    }
    const t=a[i]; a[i]=a[r]; a[r]=t
    steps.push(snap(a, [i, r], 'Place pivot'))
    return i
  }

  function qs(l:number, r:number){
    if (l>=r) return
    const p = part(l,r)
    qs(l, p-1)
    qs(p+1, r)
  }

  qs(0, a.length-1)
  return steps
}

export const algorithms: Record<string, (arr:number[])=>Step[]> = {
  'Bubble Sort': bubbleSortSteps,
  'Selection Sort': selectionSortSteps,
  'Insertion Sort': insertionSortSteps,
  'Quick Sort': quickSortSteps,
}
