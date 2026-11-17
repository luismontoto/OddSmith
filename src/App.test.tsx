import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import App from './App'

it('derives the result from the steps, with an optional FNP as step 4', async () => {
  render(<App />)

  expect(screen.getByRole('status')).toHaveTextContent('2.50')
  expect(
      screen.queryByRole('button', { name: 'Añadir paso' }),
  ).not.toBeInTheDocument()

  const defender = screen.getByRole('region', { name: 'Defensor' })
  await userEvent.click(
      within(defender).getByRole('button', { name: 'Añadir FNP' }),
  )

  expect(screen.getByRole('status')).toHaveTextContent('1.67')
  expect(
      screen.queryByRole('button', { name: 'Añadir FNP' }),
  ).not.toBeInTheDocument()
})