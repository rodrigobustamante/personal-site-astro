import type { APIRoute, GetStaticPaths } from 'astro';
import { sceneDocument } from '~/components/portfolio/dioramas/iso';
import { SCENES, type SceneName } from '~/components/portfolio/dioramas/scenes';

export const prerender = true;

export const getStaticPaths = (() =>
  Object.keys(SCENES).map((scene) => ({ params: { scene } }))) satisfies GetStaticPaths;

/** The diorama SVGs, fetched and inlined by Diorama.astro so they stay out of the page HTML. */
export const GET: APIRoute = ({ params }) =>
  new Response(sceneDocument(SCENES[params.scene as SceneName]), {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
