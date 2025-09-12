import React from 'react';
import AppShell from '../../components/layout/AppShell';
import BooksSection from '../../components/BooksSection';

const Feature = ({ title, desc, emoji, delay = 0 }) => (
  <div
    className="glass dark:glass-dark rounded-2xl p-5 border border-white/20 dark:border-slate-700/50 hover-lift"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="text-2xl mb-2">{emoji}</div>
    <div className="font-semibold">{title}</div>
    <div className="text-sm text-[color:var(--text-muted)]">{desc}</div>
  </div>
);

const NewHome = () => {
  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl p-6 md:p-10 bg-[color:var(--bg-secondary)] dark:bg-slate-800/60 border border-white/20 dark:border-slate-700/50">
        <div className="absolute inset-0 -z-10 animate-gradient" style={{ background: 'var(--gradient-hero)' }} />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Your Learning, Elevated</h1>
          <p className="mt-2 text-[color:var(--text-secondary)] max-w-2xl">
            Explore a growing library of books and resources. Save, share, and study with a beautifully modern
            interface.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <Feature emoji="📚" title="All in one" desc="All books on one page, simple and fast." />
            <Feature emoji="⚡" title="Instant access" desc="Open or download via Google Drive." delay={100} />
            <Feature emoji="🔒" title="Managed content" desc="Lightweight admin panel for updates." delay={200} />
          </div>
        </div>
      </section>

      {/* Books Grid (reusing existing logic with new visual shell) */}
      <section className="mt-6">
        <BooksSection />
      </section>
    </AppShell>
  );
};

export default NewHome;
