import React from 'react';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import DarkMode from '../DarkMode';

const Topbar = () => {
  const [aurora, setAurora] = React.useState(true);

  React.useEffect(() => {
    const root = document.documentElement;
    if (aurora) root.classList.add('theme-aurora');
    else root.classList.remove('theme-aurora');
  }, [aurora]);

  return (
    <header className="w-full glass dark:glass-dark border border-white/20 dark:border-slate-700/50 rounded-2xl px-3 md:px-4 py-2 flex items-center gap-3">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-2 flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5 text-[color:var(--text-muted)]" />
        </div>
        <input
          type="text"
          placeholder="Search books, notes, research..."
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/70 dark:bg-slate-800/70 outline-none text-sm placeholder-[color:var(--text-muted)] focus:bg-white dark:focus:bg-slate-800 transition-colors"
        />
      </div>
      <button
        className="p-2 rounded-lg hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
        title="Notifications"
      >
        <BellIcon className="h-5 w-5 text-[color:var(--text-muted)]" />
      </button>
      <button
        onClick={() => setAurora((v) => !v)}
        className={classNames(
          'px-3 py-2 rounded-lg text-xs font-semibold transition-colors',
          aurora
            ? 'bg-[color:var(--accent-primary)]/20 text-[color:var(--accent-primary)] hover:bg-[color:var(--accent-primary)]/30'
            : 'bg-white/60 dark:bg-white/10 text-[color:var(--text-muted)] hover:bg-white/80 dark:hover:bg-white/20'
        )}
        title="Toggle Aurora Theme"
      >
        Aurora
      </button>
      <DarkMode />
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500" />
      <a
        href="/admin/"
        className="ml-2 px-2 py-1 rounded-md text-xs text-[color:var(--text-muted)] hover:text-[color:var(--text)] hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
        title="Admin"
      >
        Admin
      </a>
    </header>
  );
};

export default Topbar;
