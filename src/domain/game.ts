import type { Step } from './types'
import { successProbability } from './probability'


const applyStep: Record<Step['countsAs'], (p: number) => number> = {
    success: (p) => p,
    failure: (p) => 1 - p,
}

export function stepProbability(step: Step): number {
    return applyStep[step.countsAs](successProbability(step.threshold));
}

export function resolveSequence(initialCount: number, steps: Step[]): number {
    let count = initialCount;
    for (const step of steps) {
        count = count * stepProbability(step);
    }
    return count;
}

export function resolveAttack(
    initialCount: number,
    preDamageSteps: Step[],
    damage: number,
    postDamageSteps: Step[]
): number {
    const notSaved = resolveSequence(initialCount, preDamageSteps);
    const damagePoints = notSaved * damage;
    return resolveSequence(damagePoints, postDamageSteps);
}
