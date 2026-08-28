export type Run = never;
/** Deprecated placeholder data intentionally removed. Garmin is the only source of truth. */
export const weeks: never[] = [];
export function getWeek(_slug: string): never { throw new Error('RunLog uses Garmin snapshots; no placeholder weeks exist.'); }
