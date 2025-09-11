import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

const CategoryCards = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // For touch devices, make sure card has hover effect when tapped
  const handleTouchStart = () => {
    if (isMobile) {
      setIsHovered(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--form-bg)',
        boxShadow: '0 10px 25px var(--box-shadow)',
        transition: 'all 0.4s ease',
        border: '1px solid var(--card-border)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
      className={classNames({
        'overflow-hidden relative cursor-pointer': true,
        'rounded-xl': true,
        'flex justify-center items-center': true,
        'anti-mobile:rounded-xl': true,
        'w-60 h-60 lg:w-72 lg:h-72': true,
        'mobile:w-[85vw] mobile:h-[200px]': true,
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 1000)}
    >
      <Link to={props.card.link} className="w-full h-full">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: isHovered ? 'var(--gradient-purple)' : 'var(--gradient-blue)',
            opacity: 0.05,
            transition: 'all 0.4s ease',
          }}
        ></div>
        <div
          className={classNames({
            'absolute rounded-full flex items-center justify-center': true,
            'w-32 h-32': true,
            'mobile:w-24 mobile:h-24': true,
          })}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -80%)',
            background: isHovered ? 'var(--gradient-purple)' : 'var(--gradient-blue)',
            opacity: 0.1,
            transition: 'all 0.4s ease',
          }}
        >
          <img
            style={{
              opacity: 0.8,
              filter: 'var(--card-icon-filter)',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.4s ease',
            }}
            className={classNames({
              'object-contain': true,
              'w-16 h-16': true,
              'mobile:w-12 mobile:h-12': true,
            })}
            src={`/${props.card.image}`}
            alt={props.card.domain}
          />
        </div>
        <div className="flex flex-col items-center justify-end relative w-full h-full pb-10">
          <h3
            style={{
              color: 'var(--text-primary)',
              fontFamily: 'Montserrat, sans-serif',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
            className={classNames({
              'font-bold text-center': true,
              'text-2xl': true,
              'mobile:text-xl': true,
            })}
          >
            {props.card.domain}
          </h3>
          <div
            className={classNames({
              'mt-3 inline-flex items-center font-medium': true,
              'text-sm': true,
              'mobile:text-xs': true,
            })}
            style={{
              color: isHovered ? 'var(--zesho-purple)' : 'var(--zesho-blue)',
              transition: 'all 0.3s ease',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              opacity: isHovered ? 1 : 0.8,
            }}
          >
            Explore
            <svg
              className={classNames({
                'ml-1': true,
                'w-5 h-5': true,
                'mobile:w-4 mobile:h-4': true,
              })}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{
                transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                transition: 'all 0.3s ease',
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCards;
