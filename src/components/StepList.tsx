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
                <div key={index}>
                    <StepRow
                        step={step}
                        onChange={(updated) =>
                            onChange(steps.map((s, i) => (i === index ? updated : s)))
                        }
                    />
                    <button
                        type="button"
                        onClick={() => onChange(steps.filter((_, i) => i !== index))}
                    >
                        Quitar paso {index + 1}
                    </button>
                </div>
            ))}
            <button type="button" onClick={() => onChange([...steps, DEFAULT_STEP])}>
                Añadir paso
            </button>
        </div>
    )
}