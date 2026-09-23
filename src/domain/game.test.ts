import { describe, it, expect } from 'vitest'
import { resolveSequence } from './game'

describe('resolveSequence', () => {
    it('applies a single success step to the initial count', () => {
        const result = resolveSequence(10, [
            { threshold: 4, countsAs: 'success' }
        ])
        expect(result).toBeCloseTo(5)
    })

    it('applies a failure-counted step (e.g. a save)', () => {
        const result = resolveSequence(12, [
            { threshold: 5, countsAs: 'failure' }
        ])
        expect(result).toBeCloseTo(8)
    })
})