import { hangarScene } from './hangar';
import { mineScene } from './mine';
import { terminalScene } from './terminal';

/** Dioramas by name; each is served as /dioramas/<name>.svg. */
export const SCENES = {
  hangar: hangarScene,
  terminal: terminalScene,
  mine: mineScene,
};
export type SceneName = keyof typeof SCENES;
