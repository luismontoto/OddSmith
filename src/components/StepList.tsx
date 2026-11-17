import type { Step } from '../domain/types'
import { StepRow } from './StepRow'

const FALLBACK_STEP: Step = { threshold: 4, countsAs: 'success' }

type StepListProps = {
  title?: string
  steps: Step[]
  minSteps?: number
  newStep?: Step
  onChange: (steps: Step[]) => void
}

export function StepList({
  title,
  steps,
  minSteps = 0,
  newStep = FALLBACK_STEP,
  onChange,
}: StepListProps) {
  return (
    <section className="step-list" aria-label={title}>
      {title && <h2>{title}</h2>}
      {steps.map((step, index) => (
        <div className="step-item" key={index}>
          <span className="step-number">{index + 1}</span>
          <StepRow
            step={step}
            countsAsLocked={index < minSteps}
            onChange={(updated) =>
              onChange(steps.map((s, i) => (i === index ? updated : s)))
            }
          />
          {index >= minSteps && (
            <button
              type="button"
              className="remove"
              onClick={() => onChange(steps.filter((_, i) => i !== index))}
            >
              Quitar paso {index + 1}
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => onChange([...steps, newStep])}>
        Añadir paso
      </button>
    </section>
  )
}
