import React, { useEffect, useState } from 'react';
import { toDirectDownload } from '../utils/drive';
import useTilt from '../utils/useTilt';
import { isSaved, toggleSaved } from '../utils/collection';

const BookCard = ({ book }) => {
  const driveUrl = book.driveUrl || '#';
  const directUrl = toDirectDownload(driveUrl);
  const key = book._id || book.driveUrl || book.title;
  const [saved, setSaved] = useState(isSaved(key));

  const handleDownload = () => {
    if (directUrl && directUrl !== '#') {
      window.open(directUrl, '_blank');
    }
  };

  const handleView = () => {
    if (driveUrl && driveUrl !== '#') {
      window.open(driveUrl, '_blank');
    }
  };

  const tiltRef = useTilt({ maxTilt: 10, scale: 1.02, glare: true });

  useEffect(() => {
    const onChanged = (e) => {
      const keys = e.detail?.keys || [];
      setSaved(keys.includes(key));
    };
    window.addEventListener('collection:changed', onChanged);
    return () => window.removeEventListener('collection:changed', onChanged);
  }, [key]);

  const handleToggleSave = () => {
    toggleSaved(key);
    setSaved(isSaved(key));
  };

  return (
    <div
      ref={tiltRef}
      className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 tilt-base tilt-shadow shine"
    >
      {/* Book-like cover header */}
      <div className="book-cover h-40 relative">
        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">PDF</div>
        <div
          className="absolute top-0 right-4 w-0 h-0 border-l-8 border-r-8 border-b-[14px] border-l-transparent border-r-transparent border-b-rose-400"
          title="Bookmark"
        />
        <button
          onClick={handleToggleSave}
          className={
            'absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold shadow-sm transition ' +
            (saved
              ? 'bg-amber-400/90 hover:bg-amber-500 text-black'
              : 'bg-slate-800/70 hover:bg-slate-800 text-white')
          }
          title={saved ? 'Remove from Collection' : 'Add to Collection'}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/overview-image.jpg';
            }}
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            loading="lazy"
          />
        ) : (
          <img
            src="/overview-image.jpg"
            alt="Default cover"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            loading="lazy"
          />
        )}
        <div className="book-title-overlay">
          <span className="line-clamp-1">{book.title}</span>
        </div>
        <div data-glare className="absolute inset-0 pointer-events-none" />
      </div>

      {/* Book Info */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 leading-tight">
          <span className="mr-1">📘</span>
          <span className="line-clamp-2">{book.title}</span>
        </h3>

        {book.author && (
          <div className="text-sm text-slate-600 dark:text-slate-300 mb-2">by {book.author}</div>
        )}

        {book.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3 leading-relaxed">
            {book.description}
          </p>
        )}

        {book.category && (
          <div className="mb-4">
            <span className="inline-block bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900 dark:to-indigo-900 text-violet-800 dark:text-violet-200 px-3 py-1 rounded-full text-xs font-medium">
              {book.category}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            📥 Download
          </button>

          <button
            onClick={handleView}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            👁️ Open
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
