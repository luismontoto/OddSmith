import { useState } from 'react'
import { StepList } from './components/StepList'
import { resolveAttack } from './domain/game'
import type { Step } from './domain/types'

const INITIAL_ATTACK: Step[] = [
  { threshold: 4, countsAs: 'success' }, // impactar
  { threshold: 4, countsAs: 'success' }, // herir
]

const INITIAL_DEFENCE: Step[] = [
  { threshold: 7, countsAs: 'failure' }, // salvación (7 = sin defensa)
]

// El FNP reduce el daño: cuenta como fallo del atacante.
const NEW_FNP: Step = { threshold: 5, countsAs: 'failure' }

function App() {
  const [attacks, setAttacks] = useState(10)
  const [damage, setDamage] = useState(1)
  const [attackSteps, setAttackSteps] = useState<Step[]>(INITIAL_ATTACK)
  // Paso 3 (salvación, siempre) y, opcionalmente, paso 4 (FNP).
  const [defenceSteps, setDefenceSteps] = useState<Step[]>(INITIAL_DEFENCE)

  const [save, ...fnp] = defenceSteps
  const result = resolveAttack(attacks, [...attackSteps, save], damage, fnp)

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
            steps={attackSteps}
            minSteps={2}
            maxSteps={2}
            labels={['Impactar', 'Herir']}
            editableCountsAs={false}
            onChange={setAttackSteps}
        />
        <StepList
            title="Defensor"
            steps={defenceSteps}
            minSteps={1}
            maxSteps={2}
            labels={['Salvación', 'FNP']}
            firstNumber={3}
            addLabel="Añadir FNP"
            editableCountsAs={false}
            newStep={NEW_FNP}
            onChange={setDefenceSteps}
        />

        <div className="result">
          <span>Daño esperado</span>
          <output>{result.toFixed(2)}</output>
        </div>
      </main>
  )
}

export default App