import type { RunLogWeek } from '../../lib/garmin/schema';

/**
 * Generated Garmin snapshots belong here. Keep this file free of invented values.
 * A future Garmin sync job can replace the exported weeks with normalized API data.
 */
export const garminWeeks: RunLogWeek[] = [];

export function getGarminWeek(slug: string) {
  return garminWeeks.find((week) => week.slug === slug);
}
