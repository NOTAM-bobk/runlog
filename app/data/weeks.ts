export type Run = {
  day: string;
  date: string;
  type: string;
  distance: string;
  details: string;
  effort?: string;
};

export type Week = {
  slug: string;
  label: string;
  focus: string;
  summary: string;
  mileage: string;
  runs: Run[];
};

export const weeks: Week[] = [
  {
    slug: '2026-08-24',
    label: 'Week of Aug 24',
    focus: 'Build consistency',
    summary: 'A balanced week focused on getting quality miles in without overreaching.',
    mileage: '22 mi',
    runs: [
      { day: 'Mon', date: 'Aug 24', type: 'Easy Run', distance: '4 mi', details: 'Relaxed aerobic pace. Finish feeling fresh.', effort: 'Easy' },
      { day: 'Tue', date: 'Aug 25', type: 'Intervals', distance: '5 mi', details: '1 mi warm-up, 6 × 400m controlled, easy recoveries, cool-down.', effort: 'Moderate' },
      { day: 'Wed', date: 'Aug 26', type: 'Recovery', distance: '3 mi', details: 'Very easy conversational effort.', effort: 'Very easy' },
      { day: 'Thu', date: 'Aug 27', type: 'Tempo', distance: '4 mi', details: '1 mi easy, 2 mi comfortably hard, 1 mi cool-down.', effort: 'Strong' },
      { day: 'Sat', date: 'Aug 29', type: 'Long Run', distance: '6 mi', details: 'Steady aerobic effort. Keep the first half deliberately easy.', effort: 'Easy–steady' },
    ],
  },
];

export function getWeek(slug: string) {
  return weeks.find((week) => week.slug === slug);
}
