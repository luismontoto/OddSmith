import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import App from './App'

it('derives the result from the steps', async () => {
    render(<App />)

    expect(screen.getByRole('status')).toHaveTextContent('10.00')

    await userEvent.click(screen.getByRole('button', { name: 'Añadir paso' }))

    expect(screen.getByRole('status')).toHaveTextContent('5.00')
})