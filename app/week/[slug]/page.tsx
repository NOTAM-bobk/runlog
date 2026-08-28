import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGarminWeek, garminWeeks } from '../../data/garmin';

export function generateStaticParams() { return garminWeeks.map((week) => ({ slug: week.slug })); }
const mi = (m: number) => `${(m / 1609.344).toFixed(1)} mi`;
const km = (m: number) => `${(m / 1000).toFixed(1)} km`;
const time = (s: number) => `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}`;
const pace = (s: number | null) => s == null ? '—' : `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')} /km`;
const metric = (v: unknown, suffix = '') => typeof v === 'number' ? `${Math.round(v)}${suffix}` : '—';

export default async function WeekPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const week = getGarminWeek(slug);
  if (!week) notFound();
  return <main className="week-shell">
    <header className="week-header"><Link href="/" className="back-link">← RunLog</Link><div className="week-heading"><div className="eyebrow">GARMIN TRAINING DATA</div><h1>{week.startDate}<br/>— {week.endDate}</h1><p>Every metric here comes from the Garmin snapshot for this week.</p></div><div className="week-stat"><strong>{week.stats.activityCount}</strong><span>activities</span></div></header>
    <section className="stats-grid">
      <div><span>Distance</span><strong>{mi(week.stats.distanceMeters)}</strong><small>{km(week.stats.distanceMeters)}</small></div>
      <div><span>Moving time</span><strong>{time(week.stats.movingDurationSeconds)}</strong><small>hh:mm</small></div>
      <div><span>Avg pace</span><strong>{pace(week.stats.averagePaceSecondsPerKm)}</strong><small>per km</small></div>
      <div><span>Elevation</span><strong>{metric(week.stats.elevationGainMeters, ' m')}</strong><small>gain</small></div>
      <div><span>Calories</span><strong>{metric(week.stats.calories)}</strong><small>total</small></div>
    </section>
    <section className="section-heading"><div><div className="eyebrow">ACTIVITIES</div><h2>What Garmin recorded</h2></div></section>
    <section className="runs">{week.activities.map((a) => <article className="run-card" key={String(a.activityId)}><div className="run-date"><strong>{a.startTimeLocal?.slice(0,10) ?? '—'}</strong><span>{a.activityType ?? 'Activity'}</span></div><div className="run-main"><div className="run-type">{a.activityName ?? 'Untitled activity'}</div><h2>{typeof a.distanceMeters === 'number' ? mi(a.distanceMeters) : '—'}</h2><p>{typeof a.durationSeconds === 'number' ? time(a.durationSeconds) : '—'} · {pace(typeof a.distanceMeters === 'number' && a.distanceMeters > 0 && typeof a.durationSeconds === 'number' ? a.durationSeconds / (a.distanceMeters / 1000) : null)}</p></div><div className="activity-mini"><span>AVG HR</span><strong>{metric(a.averageHeartRate, ' bpm')}</strong><span>CADENCE</span><strong>{metric(a.averageCadence, ' rpm')}</strong><span>ELEV.</span><strong>{metric(a.elevationGainMeters, ' m')}</strong></div></article>)}</section>
    <section className="section-heading"><div><div className="eyebrow">RECOVERY & DAILY DATA</div><h2>More from Garmin</h2></div></section>
    <div className="empty-data">Daily health metrics, training effect, splits, weather, gear, HR zones, power, and other available Garmin metrics will appear here automatically as snapshots are generated. No placeholder values are shown.</div>
    <p className="source-note">Source: Garmin · Snapshot generated {week.generatedAt}</p>
  </main>;
}
