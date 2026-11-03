import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { StepRow } from './StepRow'

it('shows the threshold of the step', () => {
    render(
        <StepRow
            step={{ threshold: 4, countsAs: 'success' }}
            onChange={() => {}}
        />,
    )

    expect(screen.getByLabelText('Umbral')).toHaveValue('4')
})