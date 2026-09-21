import { describe, it, expect } from 'vitest'
import { successProbability } from './probability'

describe('successProbability', () => {
    it('returns 1/2 for a 4+ threshold', () => {
        expect(successProbability(4)).toBeCloseTo(0.5)
    })
    it('returns 1/6 for a 6+ threshold', () => {
        expect(successProbability(6)).toBeCloseTo(1 / 6)
    })
    it('returns 5/6 for a 2+ threshold', () => {
        expect(successProbability(2)).toBeCloseTo( 5/ 6)
    })
    it('returns 0 for a 0 threshold', () => {
        expect(successProbability(0)).toBeCloseTo( 0)
    })
})