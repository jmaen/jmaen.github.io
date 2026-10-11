import { getCollection, type CollectionEntry } from 'astro:content';
import { dateKey } from './format';

const visible = <T extends { data: { draft: boolean } }>(e: T) => !e.data.draft;
const newestFirst = (a: string, b: string) => dateKey(b).localeCompare(dateKey(a));

export async function getProjects() {
  // Pinned projects first, then newest first.
  return (await getCollection('projects', visible)).sort(
    (a, b) => Number(b.data.pinned) - Number(a.data.pinned) || newestFirst(a.data.date, b.data.date),
  );
}

export type CvSection = 'education' | 'experience' | 'scholarships';

export async function getCv(section: CvSection) {
  return (await getCollection(section, visible)).sort(
    (a, b) =>
      // Ongoing entries first, then by start (newest first), then by `order`.
      Number(!!a.data.end) - Number(!!b.data.end) ||
      newestFirst(a.data.start, b.data.start) ||
      a.data.order - b.data.order,
  );
}

type Publication = CollectionEntry<'publications'>;
const pubKey = (p: Publication) => p.data.year * 100 + (p.data.month ?? 0);

/** All visible publications, split into papers/preprints and posters/talks. The section is shown when any exist. */
export async function getPublications() {
  const all = (await getCollection('publications', visible)).sort((a, b) => pubKey(b) - pubKey(a));
  return {
    any: all.length > 0,
    papers: all.filter((p) => p.data.type === 'paper' || p.data.type === 'preprint'),
    presentations: all.filter((p) => p.data.type === 'poster' || p.data.type === 'talk'),
  };
}
