import { render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { StepRow } from './StepRow'
import userEvent from '@testing-library/user-event'


it('reports the updated step when the threshold changes', async () => {
    const onChange = vi.fn()
    render(
        <StepRow
            step={{ threshold: 4, countsAs: 'success' }}
            onChange={onChange}
        />,
    )

    await userEvent.selectOptions(screen.getByLabelText('Umbral'), '2')

    expect(onChange).toHaveBeenCalledWith({ threshold: 2, countsAs: 'success' })
})
it('reports the updated step when countsAs changes', async () => {
    const onChange = vi.fn()
    render(
        <StepRow
            step={{ threshold: 4, countsAs: 'success' }}
            onChange={onChange}
        />,
    )

    await userEvent.selectOptions(screen.getByLabelText('Cuenta como'), 'failure')

    expect(onChange).toHaveBeenCalledWith({ threshold: 4, countsAs: 'failure' })
})
it('shows the threshold of the step', () => {
    render(
        <StepRow
            step={{ threshold: 4, countsAs: 'success' }}
            onChange={() => {}}
        />,
    )

    expect(screen.getByLabelText('Umbral')).toHaveValue('4')
})