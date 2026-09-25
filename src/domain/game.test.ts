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

    it('applies multiple steps', () => {
        const result = resolveSequence(20, [
            { threshold: 3, countsAs: 'success' },
            { threshold: 4, countsAs: 'failure' }
        ])
        expect(result).toBeCloseTo(6.6666)
    })
    it('resolves a full attack with damage and no FNP', () => {
        const result = resolveAttack(
            10,
            [
                { threshold: 3, countsAs: 'success' }, // hit
                { threshold: 4, countsAs: 'success' }, // wound
                { threshold: 5, countsAs: 'failure' }, // save
            ],
            2, // damage
            [
                { threshold: 7, countsAs: 'failure' }, // no FNP
            ]
        )
        expect(result).toBeCloseTo(40 / 9)
    })
})