import React from 'react';
import classNames from 'classnames';

const Card = ({ className, children, ...props }) => {
  return (
    <div
      {...props}
      className={classNames(
        'relative bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg border border-white/10 dark:border-slate-700/40',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
