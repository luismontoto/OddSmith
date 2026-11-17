import { useId } from 'react'
import type { Threshold } from '../domain/probability'
import type { Step } from '../domain/types'

const THRESHOLDS: Threshold[] = [1, 2, 3, 4, 5, 6, 7]

const COUNTS_AS_LABELS: Record<Step['countsAs'], string> = {
  success: 'Éxito',
  failure: 'Fallo',
}

const thresholdLabel = (t: Threshold) => (t === 7 ? '7 (nunca)' : `${t}+`)

type StepRowProps = {
  step: Step
  onChange: (step: Step) => void
  hideCountsAs?: boolean
}

export function StepRow({
                          step,
                          onChange,
                          hideCountsAs = false,
                        }: StepRowProps) {
  const id = useId()
  const thresholdId = `${id}-threshold`
  const countsAsId = `${id}-counts-as`

  return (
      <div className="step-row">
        <div className="field">
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
                  {thresholdLabel(t)}
                </option>
            ))}
          </select>
        </div>

        {!hideCountsAs && (
            <div className="field">
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
        )}
      </div>
  )
}