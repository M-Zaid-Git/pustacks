import React from 'react';
import classNames from 'classnames';
import useTilt from '../../utils/useTilt';

const HeroSection = () => {
  const [searchParam, setSearchParam] = React.useState(''); // Search Parameter

  React.useEffect(() => {
    // Add scroll reveal animation to elements
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Tilt for the main illustration card
  const tiltRef = useTilt({ maxTilt: 10, scale: 1.015, glare: true });
  const sceneRef = React.useRef(null);

  // Pointer parallax for decorative layers
  React.useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    let raf;
    const layers = Array.from(el.querySelectorAll('.parallax-layer'));

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const maxShift = 20; // px
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        layers.forEach((layer) => {
          const depth = Number(layer.dataset.depth || 30);
          const dx = -x * ((maxShift * depth) / 60);
          const dy = -y * ((maxShift * depth) / 60);
          layer.style.transform = `translateZ(${depth}px) translateX(${dx.toFixed(1)}px) translateY(${dy.toFixed(
            1
          )}px)`;
        });
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth || 30);
        layer.style.transform = `translateZ(${depth}px) translateX(0px) translateY(0px)`;
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <main className="relative overflow-hidden perspective-1000">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" />
        <div
          className="absolute top-40 right-20 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
          style={{ animationDelay: '-1s' }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-36 h-36 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
          style={{ animationDelay: '-2s' }}
        />
      </div>

      <div className="h-[15vh]" />
  <div className="relative min-h-[85vh] w-full flex items-center justify-between overflow-hidden px-4 lg:px-8">
        {/* Main Content */}
        <section className="relative w-full lg:w-1/2 h-full flex flex-col items-start justify-center gap-8 pl-4 lg:pl-10 z-10">
          {/* Title */}
          <div className="scroll-reveal">
            <h1 className="relative">
              {/* Animated Background Text */}
              <div className="absolute inset-0 text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent opacity-10 animate-pulse-slow select-none pointer-events-none">
                Read. Learn. Share.
              </div>

              {/* Main Text */}
              <div className="relative text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 dark:text-white leading-tight">
                <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  Read.
                </span>{' '}
                <span
                  className="inline-block animate-fadeInUp bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  style={{ animationDelay: '0.3s' }}
                >
                  Learn.
                </span>{' '}
                <span
                  className="inline-block animate-fadeInUp bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  style={{ animationDelay: '0.5s' }}
                >
                  Share.
                </span>
              </div>

              {/* Decorative Elements */}
              <div className="flex items-center gap-3 mt-4 animate-fadeInLeft" style={{ animationDelay: '0.7s' }}>
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" />
                <div
                  className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"
                  style={{ animationDelay: '0.5s' }}
                />
                <div
                  className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"
                  style={{ animationDelay: '1s' }}
                />
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="scroll-reveal animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
            <p className="text-lg lg:text-xl xl:text-2xl font-semibold text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Your Open Digital Library
              </span>
              <br />
              <span className="text-slate-500 dark:text-slate-400 font-normal">
                All books on one page. No logins. Fast Google Drive downloads.
              </span>
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="scroll-reveal animate-scaleIn" style={{ animationDelay: '1.1s' }}>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-1">
                <div className="flex items-center bg-slate-50 dark:bg-slate-700 rounded-xl px-4 py-3 lg:py-4 gap-3 transition-all duration-300 hover:bg-white dark:hover:bg-slate-600">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search for Notes, Books, Research Papers..."
                    value={searchParam}
                    onChange={(e) => setSearchParam(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-slate-700 dark:text-slate-200 font-medium text-lg placeholder-slate-400 dark:placeholder-slate-500"
                  />
                  {searchParam && (
                    <button
                      onClick={() => setSearchParam('')}
                      className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="scroll-reveal animate-fadeInUp flex flex-col sm:flex-row gap-4"
            style={{ animationDelay: '1.3s' }}
          >
            <a
              href="#books"
              className="theme-btn-shadow px-8 py-4 rounded-xl text-white font-semibold text-lg hover-lift"
            >
              Browse Books
            </a>
            <a
              href="/admin"
              className="px-8 py-4 rounded-xl text-slate-700 dark:text-slate-300 font-semibold text-lg border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover-lift"
            >
              Admin Panel
            </a>
          </div>
        </section>

        {/* Illustration Section */}
        <section className="hidden lg:flex w-1/2 h-full items-center justify-center relative">
          <div ref={sceneRef} className="relative w-full max-w-xl preserve-3d transform-gpu">
            {/* Parallax Layers */}
            <div className="parallax-layer" data-depth="60" style={{ transform: 'translateZ(60px)' }}>
              <div className="absolute -top-16 -left-14 w-28 h-28 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl rotate-12 animate-float opacity-70" />
            </div>
            <div className="parallax-layer" data-depth="40" style={{ transform: 'translateZ(40px)' }}>
              <div className="absolute top-1/3 -right-10 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-float opacity-70" />
            </div>
            <div className="parallax-layer" data-depth="30" style={{ transform: 'translateZ(30px)' }}>
              <div className="absolute bottom-6 left-8 w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg rotate-45 animate-float opacity-70" />
            </div>

            {/* Main Illustration Card with Tilt & Shine */}
            <div ref={tiltRef} className="relative z-10 tilt-base tilt-shadow shine rounded-3xl overflow-hidden">
              <div data-glare className="absolute inset-0 pointer-events-none" />
              <img
                src="/fileSharing3.webp"
                alt="Educational Excellence Illustration"
                className="w-full h-auto block select-none"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Decorative Elements */}
  <div className="w-full flex items-center justify-center gap-3 mt-8 pb-8">
        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" />
        <div
          className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className="w-3 h-3 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>
    </main>
  );
};

export default HeroSection;
