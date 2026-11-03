import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { StepList } from './StepList'

it('renders one row per step', () => {
    render(
        <StepList
            steps={[
                { threshold: 3, countsAs: 'success' },
                { threshold: 5, countsAs: 'failure' },
            ]}
            onChange={() => {}}
        />,
    )

    expect(screen.getAllByLabelText('Umbral')).toHaveLength(2)
})