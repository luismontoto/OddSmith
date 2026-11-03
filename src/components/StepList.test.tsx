import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import { StepList } from './StepList'


it('reports the whole list with only the edited step changed', async () => {
    const onChange = vi.fn()
    render(
        <StepList
            steps={[
                { threshold: 3, countsAs: 'success' },
                { threshold: 5, countsAs: 'failure' },
            ]}
            onChange={onChange}
        />,
    )

    await userEvent.selectOptions(screen.getAllByLabelText('Umbral')[1], '2')

    expect(onChange).toHaveBeenCalledWith([
        { threshold: 3, countsAs: 'success' },
        { threshold: 2, countsAs: 'failure' },
    ])
})
it('appends a default step when "Añadir paso" is clicked', async () => {
    const onChange = vi.fn()
    render(
        <StepList
            steps={[{ threshold: 3, countsAs: 'success' }]}
            onChange={onChange}
        />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Añadir paso' }))

    expect(onChange).toHaveBeenCalledWith([
        { threshold: 3, countsAs: 'success' },
        { threshold: 4, countsAs: 'success' },
    ])
})
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
it('removes the step whose "Quitar" button is clicked', async () => {
    const onChange = vi.fn()
    render(
        <StepList
            steps={[
                { threshold: 3, countsAs: 'success' },
                { threshold: 5, countsAs: 'failure' },
            ]}
            onChange={onChange}
        />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Quitar paso 2' }))

    expect(onChange).toHaveBeenCalledWith([{ threshold: 3, countsAs: 'success' }])
})