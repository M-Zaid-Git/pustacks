import React from 'react';
import { Link } from 'react-router-dom';

const MaterialCard = (props) => {
  let key = 0;
  return (
    <div className="flex items-center justify-center flex-col slide-up">
      <div
        style={{
          backgroundColor: 'var(--card-bg)',
          boxShadow: '0 8px 20px var(--box-shadow)',
          transition: 'all 0.4s ease',
          border: '1px solid var(--card-border)',
        }}
        className="w-[90vw] flex items-center justify-center m-5 rounded-xl max-md:flex-col px-4 hover:shadow-lg hover:transform hover:translate-y-[-5px]"
      >
        <img
          className="w-64 h-48 rounded-xl m-3 object-cover"
          src={props.material.image}
          alt=""
          style={{ boxShadow: '0 5px 15px var(--box-shadow)' }}
        />
        <div className="flex items-center justify-center w-full flex-col m-2 max-md:p-3">
          <div className="flex items-center justify-center w-full mb-2">
            <div
              style={{
                color: 'var(--text-primary)',
                fontFamily: 'Montserrat, sans-serif',
              }}
              className="flex items-center justify-left text-2xl w-full font-semibold"
            >
              {props.material.title}
            </div>
            <div
              style={{
                background: 'var(--gradient-purple)',
                boxShadow: '0 3px 8px var(--button-shadow)',
              }}
              className="rounded-lg m-2 p-1.5 flex items-center justify-center hover:opacity-90 transition-all duration-200"
            >
              <button>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-left w-full flex-wrap my-3">
            {props.material.fields.map((item, index) => (
              <div
                style={{
                  background: index % 2 === 0 ? 'var(--gradient-blue)' : 'var(--gradient-purple)',
                  color: 'var(--text-bright)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
                className="m-1 px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow"
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: '1px solid var(--form-border)',
              paddingTop: '1rem',
              marginTop: '0.5rem',
            }}
            className="flex items-center justify-end w-full h-20"
          >
            <button
              className="zesho-btn flex items-center justify-center"
              style={{
                background: 'var(--gradient-blue)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                margin: '0 0.5rem',
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </button>
            <Link to={`/details/${props.id}`}>
              <button
                className="zesho-btn flex items-center justify-center"
                style={{
                  background: 'var(--gradient-purple)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  margin: '0 0.5rem',
                }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;
