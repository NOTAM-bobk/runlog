import { garminWeeks } from './data/garmin';
import WeekBrowser from './components/week-browser';

export default function Home() {
  const weekCount = garminWeeks.length;
  const activityCount = garminWeeks.reduce((total, week) => total + week.stats.activityCount, 0);

  return (
    <main className="home-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="RunLog home">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span>RUNLOG</span>
        </a>
        <div className="header-meta">
          <span className="status-dot" aria-hidden="true" />
          <span>GARMIN SOURCE</span>
        </div>
      </header>

      <section className="home-content" aria-labelledby="home-title">
        <div className="eyebrow">A CLEARER TRAINING LOG</div>
        <h1 id="home-title">Every mile,<br /><span>in context.</span></h1>
        <p className="home-subtitle">Your training, one week at a time — without the noise.</p>
        <div className="home-rule" aria-hidden="true"><span /></div>
        <WeekBrowser weeks={garminWeeks} />
      </section>

      <footer className="home-footer">
        <div><strong>{weekCount}</strong><span>weeks synced</span></div>
        <div><strong>{activityCount}</strong><span>activities recorded</span></div>
        <p>Private by default. Metrics come from Garmin snapshots only.</p>
      </footer>
    </main>
  );
}
