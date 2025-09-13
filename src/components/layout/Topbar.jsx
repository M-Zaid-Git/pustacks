import React from 'react';
import { BellIcon, HomeIcon, BookOpenIcon, RectangleStackIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import DarkMode from '../DarkMode';

const NavButton = ({ icon: Icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={classNames(
      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 min-w-0',
      active
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-sm'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
    )}
  >
    <Icon className="h-4 w-4 flex-shrink-0" />
    <span className="font-medium hidden anti-ham:inline truncate">{label}</span>
  </button>
);

const SocialLink = ({ href, emoji, label, className = '' }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={classNames(
      'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
      'bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700',
      'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white',
      'border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600',
      'shadow-sm hover:shadow-md',
      className
    )}
    title={label}
  >
    <span className="text-sm" aria-hidden="true">{emoji}</span>
    <span className="hidden sm:inline font-medium">{label}</span>
  </a>
);

const Topbar = () => {
  const [aurora, setAurora] = React.useState(true);
  const [activeNav, setActiveNav] = React.useState('Overview');

  React.useEffect(() => {
    const root = document.documentElement;
    if (aurora) root.classList.add('theme-aurora');
    else root.classList.remove('theme-aurora');
  }, [aurora]);

  const scrollToId = (id) => {
    const el = typeof document !== 'undefined' && document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onOverview = () => {
    setActiveNav('Overview');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onBooks = () => {
    setActiveNav('Books');
    scrollToId('books');
  };

  const onCollections = () => {
    setActiveNav('Collections');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ui:navigate:collection'));
    }
    scrollToId('books');
  };

  const socialLinks = [
    { key: 'github', label: 'GitHub', emoji: '🐙', url: import.meta.env.VITE_SOCIAL_GITHUB },
    { key: 'linkedin', label: 'LinkedIn', emoji: '💼', url: import.meta.env.VITE_SOCIAL_LINKEDIN || 'https://www.linkedin.com/in/zaidx/' },
    { key: 'x', label: 'X', emoji: '𝕏', url: import.meta.env.VITE_SOCIAL_X },
    { key: 'instagram', label: 'Instagram', emoji: '📷', url: import.meta.env.VITE_SOCIAL_INSTAGRAM },
    { key: 'youtube', label: 'YouTube', emoji: '▶️', url: import.meta.env.VITE_SOCIAL_YOUTUBE },
    { key: 'linktree', label: 'Zaidx.me', emoji: '🌳', url: import.meta.env.VITE_SOCIAL_LINKTREE || 'https://linktr.ee/zaidx.me' },
  ].filter((l) => !!l.url);

  return (
    <header className="w-full glass dark:glass-dark border border-white/20 dark:border-slate-700/50 rounded-2xl backdrop-blur-xl">
      {/* Mobile-first design for screens under 500px */}
      <div className="mobile:block hidden">
        <div className="px-3 py-3">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-black tracking-tight text-blue-700 dark:text-blue-300">
              PUstacks
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAurora((v) => !v)}
                className={classNames(
                  'w-8 h-8 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center',
                  aurora
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                )}
                title="Toggle Aurora Theme"
              >
                A
              </button>
              <DarkMode />
              <img 
                src="/profile-avatar.jpg" 
                alt="Profile" 
                className="h-8 w-8 rounded-full shadow-md object-cover border-2 border-white/20" 
              />
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <nav className="grid grid-cols-3 gap-2 mb-3">
            <button
              onClick={onOverview}
              className={classNames(
                'flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200',
                activeNav === 'Overview'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
              )}
            >
              <HomeIcon className="h-5 w-5" />
              <span className="text-xs font-medium">Overview</span>
            </button>
            <button
              onClick={onBooks}
              className={classNames(
                'flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200',
                activeNav === 'Books'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
              )}
            >
              <BookOpenIcon className="h-5 w-5" />
              <span className="text-xs font-medium">Books</span>
            </button>
            <button
              onClick={onCollections}
              className={classNames(
                'flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200',
                activeNav === 'Collections'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
              )}
            >
              <RectangleStackIcon className="h-5 w-5" />
              <span className="text-xs font-medium">Collections</span>
            </button>
          </nav>
          
          {/* Mobile Social Links - Compact horizontal scroll */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            {socialLinks.map((link) => (
              <a
                key={link.key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200 flex-shrink-0"
                title={link.label}
              >
                <span className="text-lg" aria-hidden="true">{link.emoji}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Standard design for screens 500px and above */}
      <div className="mobile:hidden block">
        <div className="px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Left Section: Brand + Navigation */}
            <div className="flex items-center gap-2 sm:gap-6 min-w-0">
              {/* Brand */}
              <div className="flex flex-col">
                <div className="text-lg sm:text-xl font-black tracking-tight text-blue-700 dark:text-blue-300">
                  PUstacks
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5 hidden anti-ham:block">
                  Library & Community
                </div>
              </div>
              
              {/* Navigation - Hidden on mobile, shows on larger screens */}
              <nav className="hidden xl:flex items-center gap-1 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg p-1">
                <NavButton 
                  icon={HomeIcon} 
                  label="Overview" 
                  active={activeNav === 'Overview'} 
                  onClick={onOverview} 
                />
                <NavButton 
                  icon={BookOpenIcon} 
                  label="Books" 
                  active={activeNav === 'Books'} 
                  onClick={onBooks} 
                />
                <NavButton 
                  icon={RectangleStackIcon} 
                  label="Collections" 
                  active={activeNav === 'Collections'} 
                  onClick={onCollections} 
                />
              </nav>
            </div>

            {/* Center Section: Social Links - Hidden on small screens */}
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-center max-w-md">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                {socialLinks.map((link) => (
                  <SocialLink
                    key={link.key}
                    href={link.url}
                    emoji={link.emoji}
                    label={link.label}
                  />
                ))}
              </div>
            </div>

            {/* Right Section: Controls */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Notifications - Hidden on very small screens */}
              <button
                className="hidden sm:block p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors group"
                title="Notifications"
              >
                <BellIcon className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </button>

              {/* Aurora Toggle - Smaller on mobile */}
              <button
                onClick={() => setAurora((v) => !v)}
                className={classNames(
                  'px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-semibold transition-all duration-200',
                  aurora
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                )}
                title="Toggle Aurora Theme"
              >
                <span className="hidden sm:inline">Aurora</span>
                <span className="sm:hidden">A</span>
              </button>

              {/* Dark Mode Toggle */}
              <DarkMode />

              {/* Divider - Hidden on very small screens */}
              <div className="hidden sm:block h-6 w-px bg-gray-300 dark:bg-gray-600" />

              {/* User Avatar */}
              <img 
                src="/profile-avatar.jpg" 
                alt="Profile" 
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full shadow-md hover:shadow-lg transition-shadow cursor-pointer object-cover border-2 border-white/20" 
              />

              {/* Admin Link - Hidden on very small screens */}
              <a
                href="/admin/"
                className="hidden sm:block px-3 py-2 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200"
                title="Admin Panel"
              >
                Admin
              </a>
            </div>
          </div>

          {/* Mobile Navigation for medium screens - Shows below on small screens */}
          <div className="xl:hidden mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
            <nav className="flex items-center justify-center gap-1 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg p-1">
              <NavButton 
                icon={HomeIcon} 
                label="Overview" 
                active={activeNav === 'Overview'} 
                onClick={onOverview} 
              />
              <NavButton 
                icon={BookOpenIcon} 
                label="Books" 
                active={activeNav === 'Books'} 
                onClick={onBooks} 
              />
              <NavButton 
                icon={RectangleStackIcon} 
                label="Collections" 
                active={activeNav === 'Collections'} 
                onClick={onCollections} 
              />
            </nav>
            
            {/* Medium screen social links */}
            <div className="lg:hidden md:flex hidden mt-2 sm:mt-3 items-center justify-center gap-1.5 overflow-x-auto scrollbar-hide">
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.key}
                  href={link.url}
                  emoji={link.emoji}
                  label={link.label}
                  className="text-xs"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
