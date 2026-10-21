import { hangarScene } from './hangar';
import { intervaloScene } from './intervalo';
import { madridScene } from './madrid';
import { mineScene } from './mine';
import { paceScene } from './pace';
import { santiagoScene } from './santiago';
import { terminalScene } from './terminal';

/** Dioramas by name; each is served as /dioramas/<name>.svg. */
export const SCENES = {
  hangar: hangarScene,
  terminal: terminalScene,
  mine: mineScene,
  pace: paceScene,
  intervalo: intervaloScene,
  santiago: santiagoScene,
  madrid: madridScene,
};
export type SceneName = keyof typeof SCENES;
