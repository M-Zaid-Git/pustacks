import React from 'react';
import classNames from 'classnames';

const Container = ({ className, children }) => {
  // Use full width within the parent grid column to avoid horizontal shift/indentation
  return <div className={classNames('w-full', className)}>{children}</div>;
};

export default Container;
