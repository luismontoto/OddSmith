import type { Step } from './types'
import { successProbability } from './probability'


export function resolveSequence(initialCount: number, steps: Step[]): number {
    let count = initialCount;
    for (const step of steps) {
        const p = successProbability(step.threshold);
        const applyStep: Record<Step['countsAs'], (p: number) => number> = {
            success: (p) => p,
            failure: (p) => 1 - p,
        }
        count = count * applyStep[step.countsAs](p);
    }
    return count;
}
