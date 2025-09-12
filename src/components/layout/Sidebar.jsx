import React from 'react';
import { HomeIcon, BookOpenIcon, Cog6ToothIcon, RectangleStackIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

const NavItem = ({ icon: Icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={classNames(
      'group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
      active
        ? 'bg-[color:var(--primary-100)] text-[color:var(--primary-700)] dark:bg-slate-700/50 dark:text-white'
        : 'text-[color:var(--text-muted)] hover:bg-white/50 dark:hover:bg-white/5'
    )}
  >
    <Icon className={classNames('h-5 w-5', active ? 'text-[color:var(--accent-primary)]' : 'text-current')} />
    <span className="truncate">{label}</span>
  </button>
);

const Sidebar = () => {
  const [active, setActive] = React.useState('Overview');

  const scrollToId = (id) => {
    const el = typeof document !== 'undefined' && document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onOverview = () => {
    setActive('Overview');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onBooks = () => {
    setActive('Books');
    scrollToId('books');
  };

  return (
    <aside className="hidden md:flex md:flex-col gap-2 w-[16rem] p-4 glass dark:glass-dark border border-white/20 dark:border-slate-700/50 rounded-2xl h-[calc(100vh-2rem)] sticky top-4">
      <div className="px-2 py-1 mb-2">
        <div className="text-xl font-extrabold tracking-tight text-[color:var(--primary-700)] dark:text-white">
          PUstacks
        </div>
        <div className="text-xs text-[color:var(--text-muted)]">Library & Community</div>
      </div>
      <NavItem icon={HomeIcon} label="Overview" active={active === 'Overview'} onClick={onOverview} />
      <NavItem icon={BookOpenIcon} label="Books" active={active === 'Books'} onClick={onBooks} />
      <NavItem icon={RectangleStackIcon} label="Collections" />
      <div className="mt-auto" />
      <NavItem icon={Cog6ToothIcon} label="Settings" />
    </aside>
  );
};

export default Sidebar;
