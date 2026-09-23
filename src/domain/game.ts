import type { Step } from './types'
import { successProbability } from './probability'


export function resolveSequence(initialCount: number, steps: Step[]): number {
    let count = initialCount;
    for (const step of steps) {
        const p = successProbability(step.threshold);
        if(step.countsAs === "success") {
            count = count * p;
        }
        else {
            count = count * (1 - p);
        }
    }
    return count;
}