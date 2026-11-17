import { useState } from 'react'
import { StepList } from './components/StepList'
import { resolveAttack } from './domain/game'
import type { Step } from './domain/types'

const INITIAL_PRE_DAMAGE: Step[] = [
  { threshold: 4, countsAs: 'success' }, // impactar
  { threshold: 4, countsAs: 'success' }, // herir
]
// Salvaciones y FNP reducen el daño: cuentan como fallo del atacante.
const NEW_DEFENCE_STEP: Step = { threshold: 4, countsAs: 'failure' }

function App() {
  const [attacks, setAttacks] = useState(10)
  const [damage, setDamage] = useState(1)
  const [preDamage, setPreDamage] = useState<Step[]>(INITIAL_PRE_DAMAGE)
  const [postDamage, setPostDamage] = useState<Step[]>([])

  const result = resolveAttack(attacks, preDamage, damage, postDamage)

  return (
    <main>
      <h1>OddSmith</h1>

      <div className="inputs">
        <div className="field">
          <label htmlFor="attacks">Ataques</label>
          <input
            id="attacks"
            type="number"
            min={0}
            value={attacks}
            onChange={(e) => setAttacks(Number(e.target.value))}
          />
        </div>
        <div className="field">
          <label htmlFor="damage">Daño por herida</label>
          <input
            id="damage"
            type="number"
            min={0}
            value={damage}
            onChange={(e) => setDamage(Number(e.target.value))}
          />
        </div>
      </div>

        <StepList
            title="Atacante"
            steps={preDamage}
            minSteps={2}
            newStep={NEW_DEFENCE_STEP}
            onChange={setPreDamage}
        />
        <StepList
            title="Defensor"
            steps={postDamage}
            newStep={NEW_DEFENCE_STEP}
            onChange={setPostDamage}
        />

      <div className="result">
        <span>Daño esperado</span>
        <output>{result.toFixed(2)}</output>
      </div>
    </main>
  )
}

export default App
