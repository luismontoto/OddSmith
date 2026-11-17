import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import App from './App'

it('derives the result from the steps', async () => {
  render(<App />)

  expect(screen.getByRole('status')).toHaveTextContent('2.50')

  const preDamage = screen.getByRole('region', { name: 'Antes del daño' })
  await userEvent.click(
    within(preDamage).getByRole('button', { name: 'Añadir paso' }),
  )

  expect(screen.getByRole('status')).toHaveTextContent('1.25')
})
