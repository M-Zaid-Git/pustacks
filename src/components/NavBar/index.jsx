import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import DarkMode from '../DarkMode';

const NavBar = () => {
  return (
    <div
      className={classNames({
        'w-full h-fit': true,
        'fixed top-2 z-[10000] ': true,
        'flex justify-center items-center': true,
      })}
    >
      <div
        className={classNames({
          'w-full max-w-7xl h-fit': true,
          'px-10 py-2': true,
          'flex items-center justify-center': true,
          'rounded-2xl shadow-md': true,
          'glass dark:glass-dark border border-white/20 dark:border-slate-700/50 backdrop-blur-xl': true,
          'mobile:px-2': true,
        })}
      >
        {/* Logo... */}
        <div
          className={classNames({
            'w-1/4 h-fit p-2': true,
            'flex items-center justify-start': true,
            'monu font-normal text-xl text-[#37474f]': true,
            'dark:text-white': true,
            'mobile:text-lg': true,
          })}
        >
          <Link to="/">PUstacks</Link>
        </div>

        {/* NavItems... */}
        <div
          className={classNames({
            'w-3/4 h-fit': true,
            'flex items-center justify-end gap-4': true,
            'mobile:gap-2': true,
          })}
        >
          <a
            href="#books"
            className={classNames({
              'rounded-xl border border-[#3B82F6] text-[#3B82F6]': true,
              'px-4 py-2': true,
              'monu text-sm font-normal': true,
              'mobile:text-xs': true,
              'bg-white/60 hover:bg-white/80 dark:bg-transparent dark:hover:bg-white/10 transition-colors hover-lift': true,
            })}
          >
            Browse
          </a>
          <button
            className={classNames({
              'theme-btn-shadow rounded-xl bg-[#3B82F6]': true,
              'px-4 py-2': true,
              'monu text-sm text-white font-normal': true,
              'mobile:text-xs': true,
            })}
          >
            <Link to="/admin">Admin</Link>
          </button>
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
