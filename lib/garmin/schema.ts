export type GarminValue<T = number> = T | null;

export type GarminActivity = {
  activityId: string | number;
  activityName?: string | null;
  activityType?: string | null;
  eventType?: string | null;
  startTimeLocal?: string | null;
  distanceMeters?: GarminValue;
  durationSeconds?: GarminValue;
  movingDurationSeconds?: GarminValue;
  elapsedDurationSeconds?: GarminValue;
  averageSpeedMetersPerSecond?: GarminValue;
  maxSpeedMetersPerSecond?: GarminValue;
  averageHeartRate?: GarminValue;
  maxHeartRate?: GarminValue;
  elevationGainMeters?: GarminValue;
  elevationLossMeters?: GarminValue;
  calories?: GarminValue;
  averageCadence?: GarminValue;
  maxCadence?: GarminValue;
  averagePowerWatts?: GarminValue;
  maxPowerWatts?: GarminValue;
  trainingEffect?: GarminValue;
  description?: string | null;
  feel?: GarminValue;
  perceivedEffort?: GarminValue;
};

export type GarminSplit = Record<string, unknown>;
export type GarminWeather = Record<string, unknown>;
export type GarminGear = Record<string, unknown>;
export type GarminDailyStats = Record<string, unknown>;
export type GarminTrainingEffect = Record<string, unknown>;

export type RunLogWeek = {
  slug: string;
  startDate: string;
  endDate: string;
  source: 'garmin';
  generatedAt: string;
  activities: GarminActivity[];
  dailyStats: Record<string, GarminDailyStats>;
  splits: Record<string, GarminSplit[]>;
  weather: Record<string, GarminWeather>;
  gear: Record<string, GarminGear>;
  trainingEffect: Record<string, GarminTrainingEffect>;
  stats: {
    activityCount: number;
    distanceMeters: number;
    durationSeconds: number;
    movingDurationSeconds: number;
    elevationGainMeters: number;
    calories: number;
    averagePaceSecondsPerKm: number | null;
  };
};
