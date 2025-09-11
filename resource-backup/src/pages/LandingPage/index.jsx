import React, { useEffect, useState } from 'react';
import { NavBar, HeroSection, Footer } from '../../components';
import BackToTop from '../../components/backtotop';
import Content from '../../components/content';

// Add custom styles for simpler loading animations
const styleBlock = `
@keyframes reveal {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in-out {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
.reveal-animation {
  animation: reveal 0.8s ease-out forwards;
}
.fade-animation {
  animation: fade-in-out 2s ease-in-out infinite;
}
`;

// Simplified utility function to measure loading performance
const measureResourceLoading = () => {
  // Start performance measurement
  const startTime = performance.now();

  // Return timing function
  return () => {
    const loadTime = performance.now() - startTime;
    console.log(`[Total Load Time]: ${Math.round(loadTime)}ms`);
  };
};

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    console.log('LandingPage mounted - Simplified loading');

    // Start measuring performance
    const endMeasurement = measureResourceLoading();

    // Show animation with increasing progress
    setLoadingPhase(1);
    setLoadingProgress(25);

    // Simulate progress increases
    const progressTimer1 = setTimeout(() => setLoadingProgress(50), 400);
    const progressTimer2 = setTimeout(() => setLoadingProgress(75), 800);
    const progressTimer3 = setTimeout(() => setLoadingProgress(100), 1200);

    // Set a fixed time for the loading screen
    const finishLoading = setTimeout(() => {
      setLoadingPhase(2);

      // Fade out effect before hiding completely
      setTimeout(() => {
        setIsLoading(false);
        endMeasurement();
      }, 400);
    }, 1500);

    return () => {
      clearTimeout(progressTimer1);
      clearTimeout(progressTimer2);
      clearTimeout(progressTimer3);
      clearTimeout(finishLoading);
      endMeasurement();
    };
  }, []); // No dependencies needed for this simpler approach

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-white dark:bg-slate-900 z-50"
        style={{
          opacity: loadingPhase === 2 ? 0 : 1,
          transition: 'opacity 0.4s ease-out',
        }}
      >
        <style>{styleBlock}</style>
        <div className="flex flex-col items-center justify-center">
          {/* ZESHO Logo with reveal animation */}
          <div className="reveal-animation" style={{ transformStyle: 'preserve-3d' }}>
            <h1
              className="text-5xl font-bold"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                background: 'linear-gradient(90deg, #8b5cf6, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ZESHO
            </h1>
          </div>

          {/* Simple line under the logo */}
          <div
            className="h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mt-2 mb-8"
            style={{ width: '120px' }}
          ></div>

          {/* Loading text and animated progress bar */}
          <div className="mt-6 flex flex-col items-center">
            <p className="text-slate-600 dark:text-slate-400 mb-2" style={{ fontFamily: 'sans-serif' }}>
              {loadingProgress < 50
                ? 'Loading resources...'
                : loadingProgress < 100
                ? 'Finalizing...'
                : 'Launching ZESHO...'}
            </p>

            {/* Loading bar */}
            <div className="w-48 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                style={{
                  width: `${loadingProgress}%`,
                  transition: 'width 0.5s ease-out',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={'flex flex-col items-start justify-center'}>
        <NavBar />
        <div className="mt-16">
          <HeroSection />
        </div>
        <Content />
        <Footer />
      </div>

      <div>
        <BackToTop />
      </div>
    </>
  );
};

export default LandingPage;
