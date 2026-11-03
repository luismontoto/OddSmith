import type { Step } from '../domain/types'
import { StepRow } from './StepRow'

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
        </div>
    )
}