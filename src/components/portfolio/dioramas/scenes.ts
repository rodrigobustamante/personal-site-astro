import { hangarScene } from './hangar';
import { terminalScene } from './terminal';

/** Dioramas by name; each is served as /dioramas/<name>.svg. */
export const SCENES = {
  hangar: hangarScene,
  terminal: terminalScene,
};
export type SceneName = keyof typeof SCENES;
