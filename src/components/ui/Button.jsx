import React from 'react';
import classNames from 'classnames';

const variants = {
  primary: 'theme-btn-shadow text-white',
  outline:
    'border border-[color:var(--accent-primary)] text-[color:var(--accent-primary)] bg-white/60 dark:bg-transparent hover:bg-white/80 dark:hover:bg-white/10',
  ghost: 'text-[color:var(--accent-primary)] hover:bg-white/10',
};

const Button = ({ as: Tag = 'button', href, variant = 'primary', className, children, ...props }) => {
  const Comp = href ? 'a' : Tag;
  const extra = href ? { href } : {};
  return (
    <Comp
      {...extra}
      {...props}
      className={classNames(
        'px-4 py-2 rounded-xl monu text-sm font-medium hover-lift transition-colors',
        variants[variant],
        className
      )}
    >
      {children}
    </Comp>
  );
};

export default Button;
