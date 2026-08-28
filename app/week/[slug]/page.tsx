import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWeek, weeks } from '../../data/weeks';

export function generateStaticParams() {
  return weeks.map((week) => ({ slug: week.slug }));
}

export default async function WeekPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const week = getWeek(slug);
  if (!week) notFound();

  return (
    <main className="week-shell">
      <header className="week-header">
        <Link href="/" className="back-link">← RunLog</Link>
        <div className="week-heading">
          <div className="eyebrow">TRAINING PLAN</div>
          <h1>{week.label}</h1>
          <p>{week.summary}</p>
        </div>
        <div className="week-stat"><strong>{week.mileage}</strong><span>planned</span></div>
      </header>

      <section className="focus-card">
        <span>THIS WEEK’S FOCUS</span>
        <strong>{week.focus}</strong>
      </section>

      <section className="runs" aria-label="Runs this week">
        {week.runs.map((run) => (
          <article className="run-card" key={`${run.date}-${run.type}`}>
            <div className="run-date"><strong>{run.day}</strong><span>{run.date}</span></div>
            <div className="run-main"><div className="run-type">{run.type}</div><h2>{run.distance}</h2><p>{run.details}</p></div>
            {run.effort && <div className="effort"><span>EFFORT</span><strong>{run.effort}</strong></div>}
          </article>
        ))}
      </section>

      <nav className="week-nav" aria-label="Week navigation">
        {weeks.map((item, index) => (
          <Link href={`/week/${item.slug}`} className={item.slug === slug ? 'selected' : ''} key={item.slug}>
            <span>{index + 1}</span>{item.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
