import React, { useEffect } from 'react';
import styles from './DarkMode.module.css';
import classNames from 'classnames';

const DarkMode = () => {
  const [theme, setTheme] = React.useState(() => {
    // Get saved theme from localStorage or use 'dark' as default
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('zesho-theme');
      return savedTheme || 'dark';
    }
    return 'dark';
  });

  const setDark = () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('zesho-theme', 'dark');
  };

  const setLight = () => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('zesho-theme', 'light');
  };

  // Set the initial theme when component mounts
  useEffect(() => {
    if (theme === 'dark') {
      setDark();
    } else {
      setLight();
    }
  }, []);

  const toggleTheme = (event) => {
    if (event.currentTarget.dataset.theme === 'light') {
      setDark();
    } else {
      setLight();
    }
  };

  return (
    <div
      className={classNames({
        [styles.darkMode]: true,
        'p-1 rounded-lg': true,
      })}
      data-theme={theme}
      onClick={(event) => {
        setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
        toggleTheme(event);
      }}
    >
      <img
        src={`${theme === 'light' ? '/dark-mode.webp' : '/moon.webp'}`}
        alt={'switch'}
        className={classNames({
          'w-7 h-7': true,
          'mobile:w-6 mobile:h-6': true,
        })}
      />
    </div>
  );
};

export default DarkMode;
