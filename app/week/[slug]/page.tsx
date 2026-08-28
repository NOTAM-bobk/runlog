import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGarminWeek, garminWeeks } from '../../data/garmin';

export function generateStaticParams() { return garminWeeks.map((week) => ({ slug: week.slug })); }
const mi = (m: number) => `${(m / 1609.344).toFixed(1)} mi`;
const km = (m: number) => `${(m / 1000).toFixed(1)} km`;
const time = (s: number) => `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}`;
const pace = (s: number | null) => s == null ? '—' : `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')} /km`;
const metric = (v: unknown, suffix = '') => typeof v === 'number' ? `${Math.round(v)}${suffix}` : '—';
const dateLabel = (value: string) => {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default async function WeekPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const week = getGarminWeek(slug);
  if (!week) notFound();

  return <main className="week-shell">
    <header className="week-topbar">
      <Link href="/" className="back-link"><span aria-hidden="true">←</span> All weeks</Link>
      <div className="week-topbar-brand"><span className="brand-mark" aria-hidden="true">R</span> RUNLOG</div>
      <span className="source-badge"><span className="status-dot" aria-hidden="true" /> Garmin snapshot</span>
    </header>

    <header className="week-header">
      <div className="week-heading">
        <div className="eyebrow">WEEKLY TRAINING REPORT</div>
        <h1>{dateLabel(week.startDate)}<br /><span>— {dateLabel(week.endDate)}</span></h1>
        <p>Every metric here comes from the Garmin snapshot for this week. Nothing is estimated or filled in.</p>
      </div>
      <div className="week-stat"><strong>{String(week.stats.activityCount).padStart(2, '0')}</strong><span>activities<br />recorded</span></div>
    </header>

    <section className="stats-grid" aria-label="Weekly summary">
      <div className="stat-card primary"><span>Distance</span><strong>{mi(week.stats.distanceMeters)}</strong><small>{km(week.stats.distanceMeters)}</small></div>
      <div className="stat-card"><span>Moving time</span><strong>{time(week.stats.movingDurationSeconds)}</strong><small>hours : minutes</small></div>
      <div className="stat-card"><span>Avg pace</span><strong>{pace(week.stats.averagePaceSecondsPerKm)}</strong><small>per kilometer</small></div>
      <div className="stat-card"><span>Elevation</span><strong>{metric(week.stats.elevationGainMeters, ' m')}</strong><small>total gain</small></div>
      <div className="stat-card"><span>Calories</span><strong>{metric(week.stats.calories)}</strong><small>total burned</small></div>
    </section>

    <section className="section-heading"><div><div className="eyebrow">ACTIVITIES</div><h2>What Garmin recorded</h2></div><span className="section-count">{week.activities.length} total</span></section>
    {week.activities.length ? <section className="runs">{week.activities.map((a) => <article className="run-card" key={String(a.activityId)}><div className="run-date"><strong>{a.startTimeLocal?.slice(0, 10) ?? '—'}</strong><span>{a.activityType ?? 'Activity'}</span></div><div className="run-main"><div className="run-type">{a.activityName ?? 'Untitled activity'}</div><h2>{typeof a.distanceMeters === 'number' ? mi(a.distanceMeters) : '—'}</h2><p>{typeof a.durationSeconds === 'number' ? time(a.durationSeconds) : '—'} <span>·</span> {pace(typeof a.distanceMeters === 'number' && a.distanceMeters > 0 && typeof a.durationSeconds === 'number' ? a.durationSeconds / (a.distanceMeters / 1000) : null)}</p></div><div className="activity-mini"><span>AVG HR</span><strong>{metric(a.averageHeartRate, ' bpm')}</strong><span>CADENCE</span><strong>{metric(a.averageCadence, ' rpm')}</strong><span>ELEV.</span><strong>{metric(a.elevationGainMeters, ' m')}</strong></div></article>)}</section> : <div className="empty-data">No activities are included in this snapshot yet.</div>}

    <section className="section-heading"><div><div className="eyebrow">RECOVERY & DAILY DATA</div><h2>More from Garmin</h2></div></section>
    <div className="empty-data"><span className="empty-data-mark" aria-hidden="true">+</span><div><strong>More context will land here.</strong><p>Daily health metrics, training effect, splits, weather, gear, HR zones, power, and other available Garmin metrics will appear automatically as snapshots are generated.</p></div></div>
    <p className="source-note">Source: Garmin · Snapshot generated {week.generatedAt}</p>
  </main>;
}
