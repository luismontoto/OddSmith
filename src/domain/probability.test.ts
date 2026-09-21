import { describe, it, expect } from 'vitest'
import { successProbability } from './probability'

describe('successProbability', () => {
    it('returns 1/2 for a 4+ threshold', () => {
        expect(successProbability(4)).toBeCloseTo(0.5)
    })
})