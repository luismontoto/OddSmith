import { useId } from 'react'
import type { Threshold } from '../domain/probability'
import type { Step } from '../domain/types'

const THRESHOLDS: Threshold[] = [1, 2, 3, 4, 5, 6, 7]

type StepRowProps = {
    step: Step
    onChange: (step: Step) => void
}

export function StepRow({ step, onChange }: StepRowProps) {
    const id = useId()

    return (
        <div>
            <label htmlFor={id}>Umbral</label>
            <select
                id={id}
                value={step.threshold}
                onChange={(e) =>
                    onChange({ ...step, threshold: Number(e.target.value) as Threshold })
                }
            >
                {THRESHOLDS.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                ))}
            </select>
        </div>
    )
}