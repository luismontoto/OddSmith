import { stepProbability } from '../domain/game'
import type { Step } from '../domain/types'
import { StepRow } from './StepRow'

const FALLBACK_STEP: Step = { threshold: 4, countsAs: 'success' }

type StepListProps = {
    title?: string
    steps: Step[]
    minSteps?: number
    maxSteps?: number
    labels?: string[]
    firstNumber?: number
    addLabel?: string
    editableCountsAs?: boolean
    newStep?: Step
    onChange: (steps: Step[]) => void
}

export function StepList({
                             title,
                             steps,
                             minSteps = 0,
                             maxSteps = Infinity,
                             labels = [],
                             firstNumber = 1,
                             addLabel = 'Añadir paso',
                             editableCountsAs = true,
                             newStep = FALLBACK_STEP,
                             onChange,
                         }: StepListProps) {
    return (
        <section className="step-list" aria-label={title}>
            {title && <h2>{title}</h2>}
            {steps.map((step, index) => (
                <div className="step-item" key={index}>
                    <span className="step-number">{firstNumber + index}</span>
                    {labels[index] && <span className="step-name">{labels[index]}</span>}
                    <StepRow
                        step={step}
                        hideCountsAs={!editableCountsAs || index < minSteps}
                        onChange={(updated) =>
                            onChange(steps.map((s, i) => (i === index ? updated : s)))
                        }
                    />
                    <span
                        className="chance"
                        title="Probabilidad de que el ataque continúe"
                    >
                        {Math.round(stepProbability(step) * 100)} %
                    </span>
                    {index >= minSteps && (
                        <button
                            type="button"
                            className="remove"
                            onClick={() => onChange(steps.filter((_, i) => i !== index))}
                        >
                            Quitar {labels[index] ?? `paso ${firstNumber + index}`}
                        </button>
                    )}
                </div>
            ))}
            {steps.length < maxSteps && (
                <button type="button" onClick={() => onChange([...steps, newStep])}>
                    {addLabel}
                </button>
            )}
        </section>
    )
}