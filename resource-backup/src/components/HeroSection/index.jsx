import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [searchParam, setSearchParam] = React.useState(''); // Search Parameter
  return (
    <main>
      <div className="h-[15vh] mobile:h-[12vh]" />
      <div
        className={classNames({
          'h-[75vh] w-screen relative': true,
          'flex items-center justify-between overflow-hidden': true,
          'mobile:flex-col mobile:min-h-[85vh]': true,
        })}
      >
        <img
          src={'/overview-image.jpg'}
          alt={'Subtle Background'}
          className="mobile-sm:!scale-[1.2] hero-section-sm:block hidden absolute mobile:scale-[1.1] w-full left-[0rem] z-0 opacity-40"
          style={{ filter: 'grayscale(40%) brightness(1.1)' }}
        />

        {/* Text */}
        <section
          className={classNames({
            'w-1/2 h-full': true,
            'flex flex-col flex-1 items-start justify-center gap-6': true,
            'pl-10': true,
            'hero-section:gap-3': true,
            'hero-section:w-[46%]': true,
            'hero-section-sm:items-center hero-section-sm:pl-0': true,
            'bg-no-repeat bg-[length:110vw_110vw] bg-center': true,
            'hero-section-sm:bg-[url("/yellowBlob-cropped.webp")]': true,
            'mobile:w-full mobile:h-auto mobile:pt-8 mobile:px-4': true,
            'mobile:bg-[length:120vw_120vw] mobile-sm:!bg-[length:145vw_145vw]': true,
            'mobile:items-center mobile:text-center': true,
          })}
        >
          {/* Title */}
          <div
            className={classNames({
              'flex flex-col items-start justify-center z-10': true,
              'fade-in': true,
              'mobile:items-center': true,
            })}
          >
            <h1
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
              className={classNames({
                relative: true,
                'w-[26rem] mobile:w-full': true,
                'text-5xl lg:text-6xl': true,
                'flex flex-col items-start justify-center': true,
                'hero-section-sm:text-center hero-section-sm:items-center hero-section-sm:gap-1': true,
                'mobile:text-[2.5rem] mobile:items-center': true,
              })}
            >
              <span
                className="slide-up"
                style={{
                  background: 'var(--gradient-mixed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
                }}
              >
                ZESHO
              </span>
              <span
                className="slide-up"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.7em',
                  marginTop: '0.5rem',
                }}
              >
                Study Smarter
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 500,
              lineHeight: 1.6,
            }}
            className={classNames({
              'my-3 z-20': true,
              'hero-section:text-[1.2rem] hero-section:w-[24rem]': true,
              'text-lg lg:text-xl w-fit slide-up': true,
              'mobile:text-center mobile:w-full mobile:px-4': true,
            })}
          >
            {'Your centralized portal for sharing and discovering academic resources with the community'}
          </p>

          {/* Searchbar */}
          <div
            style={{
              backgroundColor: 'var(--form-bg)',
              boxShadow: '0 8px 20px var(--box-shadow)',
              border: '1px solid var(--form-border)',
            }}
            className={classNames({
              'relative h-[3.5rem] px-4 z-10': true,
              'w-[20rem] lg:w-[30rem]': true,
              'hero-section-sm:w-[22rem]': true,
              'mobile:w-[90%]': true,
              'rounded-xl': true,
              'flex items-center justify-start gap-3': true,
              'transition-all duration-300': true,
              'slide-up': true,
              'hover:shadow-lg': true,
            })}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              style={{ color: 'var(--zesho-purple)' }}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type={'text'}
              placeholder={'Search for notes, books, papers...'}
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
              className={classNames({
                'w-full bg-transparent outline-none': true,
                'text-md': true,
                'mobile:text-sm': true,
              })}
            />
            {searchParam && (
              <button
                className="bg-opacity-10 rounded-full p-1 hover:bg-opacity-20"
                style={{
                  backgroundColor: 'var(--zesho-purple)',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => setSearchParam('')}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  style={{ color: 'var(--zesho-purple)' }}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Call to Action Buttons */}
          <div
            className={classNames({
              'flex gap-4 mt-6 slide-up': true,
              'flex-wrap md:flex-nowrap': true,
              'mobile:justify-center': true,
            })}
          >
            <Link to="/resources">
              <button
                className={classNames({
                  'zesho-btn': true,
                  'mobile:text-sm mobile:py-2 mobile:px-3': true,
                })}
                style={{
                  background: 'var(--gradient-purple)',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '1rem',
                  fontWeight: '600',
                  letterSpacing: '0.02em',
                  padding: '0.9rem 2rem',
                  color: 'white',
                  textShadow: '0 1px 1px rgba(0,0,0,0.2)',
                }}
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 mobile:w-4 mobile:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Explore Resources
                </div>
              </button>
            </Link>
            <Link to="/signup">
              <button
                className={classNames({
                  'zesho-btn': true,
                  'mobile:text-sm mobile:py-2 mobile:px-3': true,
                })}
                style={{
                  background: 'transparent',
                  border: '2px solid var(--zesho-purple)',
                  color: 'var(--zesho-purple)',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '1rem',
                  fontWeight: '600',
                  boxShadow: 'none',
                  letterSpacing: '0.02em',
                  padding: '0.9rem 2rem',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--gradient-purple)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 4px 10px var(--button-shadow)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--zesho-purple)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 mobile:w-4 mobile:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Join Community
                </div>
              </button>
            </Link>
          </div>
        </section>

        {/* Illustration */}
        <section
          className={classNames({
            'w-3/5 h-full overflow-hidden': true,
            'flex items-center justify-center': true,
            'hero-section-sm:hidden': true,
            'mobile:w-full mobile:h-auto mobile:pb-12': true,
          })}
        >
          <div
            className={classNames({
              'bg-no-repeat bg-cover bg-left-top': true,
              'w-[55rem] h-[55rem]': true,
              'bg-[url("/yellowBlob-cropped.webp")]': true,
              'flex items-center justify-end': true,
              'mobile:justify-center mobile:w-full mobile:h-auto': true,
            })}
          >
            <img
              src={'/fileSharing3.webp'}
              alt={'File Sharing Illustration'}
              className={classNames({
                'hero-section:min-w-[21.5rem] w-[47.5vw]': true,
                'mobile:w-[85%] mobile:max-w-[400px]': true,
              })}
            />
          </div>
        </section>
      </div>

      <div
        className={classNames({
          'w-screen h-fit mt-[0.9rem]': true,
          'flex items-center justify-center gap-3': true,
          'mobile:mt-4': true,
        })}
      >
        <div className="w-10 h-1 rounded-full" style={{ background: 'var(--gradient-purple)', opacity: 0.8 }}></div>
        <div className="w-5 h-1 rounded-full" style={{ background: 'var(--gradient-blue)', opacity: 0.6 }}></div>
        <div className="w-10 h-1 rounded-full" style={{ background: 'var(--gradient-purple)', opacity: 0.8 }}></div>
      </div>
    </main>
  );
};

export default HeroSection;
