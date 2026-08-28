'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { RunLogWeek } from '../../lib/garmin/schema';

type Props = { weeks: RunLogWeek[] };

const miles = (meters: number) => `${(meters / 1609.344).toFixed(1)} mi`;
const dateLabel = (value: string) => {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function WeekBrowser({ weeks }: Props) {
  const [query, setQuery] = useState('');
  const filteredWeeks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return weeks;
    return weeks.filter((week) => {
      const haystack = [
        week.slug,
        week.startDate,
        week.endDate,
        ...week.activities.flatMap((activity) => [activity.activityName, activity.activityType]),
      ].filter(Boolean).join(' ').toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query, weeks]);

  return (
    <div className="week-browser">
      <div className="search-heading">
        <label htmlFor="week-search">Find a training week</label>
        <span>{weeks.length ? `${filteredWeeks.length} of ${weeks.length}` : 'Ready for your first sync'}</span>
      </div>
      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          id="week-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by date, run, or type…"
          autoComplete="off"
        />
        {query && <button className="clear-search" type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
      </div>

      {weeks.length === 0 ? (
        <div className="empty-home">
          <div className="empty-icon" aria-hidden="true">↗</div>
          <div>
            <h2>Your log starts here.</h2>
            <p>No Garmin snapshots have been added yet. Once a sync is available, each week will appear here with its own permanent page.</p>
          </div>
          <div className="empty-steps" aria-label="How RunLog works">
            <span><b>01</b>Sync Garmin</span>
            <span><b>02</b>Review the week</span>
            <span><b>03</b>Keep moving</span>
          </div>
        </div>
      ) : filteredWeeks.length === 0 ? (
        <div className="empty-home compact"><h2>No weeks match that search.</h2><p>Try a different date, activity name, or activity type.</p></div>
      ) : (
        <div className="week-list" aria-live="polite">
          {filteredWeeks.map((week, index) => (
            <Link className={`week-card${index === 0 ? ' featured' : ''}`} href={`/week/${week.slug}`} key={week.slug}>
              <span className="week-card-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="week-card-main">
                <strong>{dateLabel(week.startDate)} <em>—</em> {dateLabel(week.endDate)}</strong>
                <small>{week.stats.activityCount} {week.stats.activityCount === 1 ? 'activity' : 'activities'} · {miles(week.stats.distanceMeters)}</small>
              </span>
              <span className="week-card-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
