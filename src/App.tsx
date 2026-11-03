import { useState } from 'react'
import { StepList } from './components/StepList'
import { resolveSequence } from './domain/game'
import type { Step } from './domain/types'

function App() {
  const [attacks, setAttacks] = useState(10)
  const [steps, setSteps] = useState<Step[]>([])

  const result = resolveSequence(attacks, steps)

  return (
      <main>
        <h1>OddSmith</h1>

        <label htmlFor="attacks">Ataques</label>
        <input
            id="attacks"
            type="number"
            min={0}
            value={attacks}
            onChange={(e) => setAttacks(Number(e.target.value))}
        />

        <StepList steps={steps} onChange={setSteps} />

        <output>{result.toFixed(2)}</output>
      </main>
  )
}

export default App