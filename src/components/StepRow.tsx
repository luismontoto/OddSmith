import { useId } from 'react'
import type { Threshold } from '../domain/probability'
import type { Step } from '../domain/types'

const THRESHOLDS: Threshold[] = [1, 2, 3, 4, 5, 6, 7]

const COUNTS_AS_LABELS: Record<Step['countsAs'], string> = {
    success: 'Éxito',
    failure: 'Fallo',
}

type StepRowProps = {
    step: Step
    onChange: (step: Step) => void
}

export function StepRow({ step, onChange }: StepRowProps) {
    const id = useId()
    const thresholdId = `${id}-threshold`
    const countsAsId = `${id}-counts-as`

    return (
        <div>
            <label htmlFor={thresholdId}>Umbral</label>
            <select
                id={thresholdId}
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

            <label htmlFor={countsAsId}>Cuenta como</label>
            <select
                id={countsAsId}
                value={step.countsAs}
                onChange={(e) =>
                    onChange({ ...step, countsAs: e.target.value as Step['countsAs'] })
                }
            >
                {Object.entries(COUNTS_AS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    )
}