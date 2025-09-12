import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Container from '../ui/Container';

const AppShell = ({ children, className }) => {
  return (
    <div className="min-h-screen px-3 md:px-6 py-4 md:py-6 theme-aurora">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-4">
        <Sidebar />
        <main className="flex flex-col gap-4">
          <Topbar />
          <Container className={className}>{children}</Container>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
