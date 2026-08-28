import type { GarminActivity, RunLogWeek } from './schema';

const n = (value: unknown) => typeof value === 'number' && Number.isFinite(value) ? value : 0;

export function buildWeek(slug: string, startDate: string, endDate: string, activities: GarminActivity[], dailyStats: RunLogWeek['dailyStats'] = {}, splits: RunLogWeek['splits'] = {}, weather: RunLogWeek['weather'] = {}, gear: RunLogWeek['gear'] = {}, trainingEffect: RunLogWeek['trainingEffect'] = {}): RunLogWeek {
  const distanceMeters = activities.reduce((sum, a) => sum + n(a.distanceMeters), 0);
  const durationSeconds = activities.reduce((sum, a) => sum + n(a.durationSeconds), 0);
  const movingDurationSeconds = activities.reduce((sum, a) => sum + n(a.movingDurationSeconds), 0);
  const elevationGainMeters = activities.reduce((sum, a) => sum + n(a.elevationGainMeters), 0);
  const calories = activities.reduce((sum, a) => sum + n(a.calories), 0);
  return {
    slug, startDate, endDate, source: 'garmin', generatedAt: new Date().toISOString(),
    activities, dailyStats, splits, weather, gear, trainingEffect,
    stats: {
      activityCount: activities.length,
      distanceMeters,
      durationSeconds,
      movingDurationSeconds,
      elevationGainMeters,
      calories,
      averagePaceSecondsPerKm: distanceMeters > 0 ? durationSeconds / (distanceMeters / 1000) : null,
    },
  };
}
