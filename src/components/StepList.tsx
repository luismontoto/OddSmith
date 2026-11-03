import type { Step } from '../domain/types'
import { StepRow } from './StepRow'

const DEFAULT_STEP: Step = { threshold: 4, countsAs: 'success' }

type StepListProps = {
    steps: Step[]
    onChange: (steps: Step[]) => void
}

export function StepList({ steps, onChange }: StepListProps) {
    return (
        <div>
            {steps.map((step, index) => (
                <StepRow
                    key={index}
                    step={step}
                    onChange={(updated) =>
                        onChange(steps.map((s, i) => (i === index ? updated : s)))
                    }
                />
            ))}
            <button type="button" onClick={() => onChange([...steps, DEFAULT_STEP])}>
                Añadir paso
            </button>
        </div>
    )
}