export type Threshold = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function successProbability(threshold: Threshold): number {
    return  (7 - threshold) / 6;
}
