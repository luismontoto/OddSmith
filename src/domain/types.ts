import type { Threshold } from './probability'

export type Step = {
    threshold: Threshold
    countsAs: 'success' | 'failure'
}