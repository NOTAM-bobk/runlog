import Link from 'next/link';
import { weeks } from './data/weeks';

export default function Home() {
  return (
    <main className="home-shell">
      <section className="home-content">
        <div className="eyebrow">RUNLOG</div>
        <h1>Welcome home,<br /><span>Sawyer.</span></h1>
        <p className="home-subtitle">Your training, one week at a time.</p>
        <div className="home-search">
          <label htmlFor="week-search">Search your weeks</label>
          <input id="week-search" type="search" placeholder="Search by week, focus, or date…" />
        </div>
      </section>
      <nav className="week-dock" aria-label="Weeks">
        {weeks.map((week, index) => (
          <Link className={index === 0 ? 'week-link active' : 'week-link'} href={`/week/${week.slug}`} key={week.slug}>
            <span>{week.label}</span>
            <small>{week.focus}</small>
          </Link>
        ))}
      </nav>
    </main>
  );
}
