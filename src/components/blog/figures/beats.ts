export type Lang = 'en' | 'es';

/**
 * The `at-1 … at-N` classes a figure scene carries at its last step. Scenes
 * are rendered in that state so they read as a still diagram before (or
 * without) the script that animates them.
 */
export const finalStep = (steps: number): string => Array.from({ length: steps }, (_, i) => `at-${i + 1}`).join(' ');
