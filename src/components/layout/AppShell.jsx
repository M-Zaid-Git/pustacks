import React from 'react';
import Topbar from './Topbar';
import Container from '../ui/Container';

const AppShell = ({ children, className }) => {
  return (
    <div className="min-h-screen theme-aurora overflow-x-hidden">
      <div className="px-3 md:px-6 py-4 md:py-6">
        <div className="max-w-7xl mx-auto">
          <main className="flex flex-col gap-4">
            <Topbar />
            <Container className={className}>{children}</Container>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppShell;
