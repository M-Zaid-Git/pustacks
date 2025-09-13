import React, { useEffect, useMemo, useState } from 'react';
import { getSavedKeys } from '../utils/collection';
import BookCard from './BookCard';

const BooksSection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [savedKeys, setSavedKeys] = useState([]);
  
  useEffect(() => {
    // initialize query from URL and listen to global search events from Topbar
    const qs = new URLSearchParams(window.location.search);
    const initialQ = qs.get('q') || '';
    if (initialQ) setQuery(initialQ);
    const onGlobalSearch = (e) => {
      setQuery(e.detail?.q || '');
    };
    const onNavigateCollection = () => {
      setSelectedCategory('My Collection');
    };
    window.addEventListener('global:search', onGlobalSearch);
    window.addEventListener('ui:navigate:collection', onNavigateCollection);
    return () => {
      window.removeEventListener('global:search', onGlobalSearch);
      window.removeEventListener('ui:navigate:collection', onNavigateCollection);
    };
  }, []);

  useEffect(() => {
    // keep URL in sync when local query changes via BooksSection input
    const qs = new URLSearchParams(window.location.search);
    if (query) qs.set('q', query);
    else qs.delete('q');
    const newUrl = `${location.pathname}${qs.toString() ? `?${qs.toString()}` : ''}${location.hash}`;
    window.history.replaceState({}, '', newUrl);
  }, [query]);

  useEffect(() => {
    // initialize from localStorage on mount
    setSavedKeys(getSavedKeys());
    const onChanged = (e) => {
      setSavedKeys(e.detail?.keys || []);
    };
    window.addEventListener('collection:changed', onChanged);
    return () => window.removeEventListener('collection:changed', onChanged);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
  const res = await fetch('/api/books?revalidate=1');
        if (!res.ok) throw new Error('api failed');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setBooks(data);
          return;
        }
        throw new Error('api empty');
      } catch {
        try {
          const res2 = await fetch('/.netlify/functions/books?revalidate=1');
          if (!res2.ok) throw new Error('fn failed');
          const data2 = await res2.json();
          if (Array.isArray(data2) && data2.length > 0) {
            setBooks(data2);
            return;
          }
          throw new Error('fn empty');
        } catch (e) {
          console.error('Books load failed via API and Function:', e);
          try {
            const res3 = await fetch('/fallback-books.json');
            if (!res3.ok) throw new Error('fallback failed');
            const data3 = await res3.json();
            setBooks(Array.isArray(data3) ? data3 : []);
          } catch (e2) {
            console.error('Fallback books also failed:', e2);
            setError('Failed to load books');
          }
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = useMemo(() => {
    const priority = [
      'Programming Fundamentals',
      'Computer Networks',
      'Applied Physics',
      'OOPs',
      'Ideology & Constitution of Pakistan',
      "Qur'an",
      'DLD',
      'ICT',
    ];
    const uniq = Array.from(new Set(books.map((b) => b.category).filter(Boolean)));
    // Sort by priority first, then alphabetical
    const byPriority = [...uniq].sort((a, b) => {
      const ia = priority.indexOf(a);
      const ib = priority.indexOf(b);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return a.localeCompare(b);
    });
    return ['All', 'My Collection', ...byPriority];
  }, [books]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = selectedCategory === 'All' || selectedCategory === 'My Collection' ? books : books.filter((b) => b.category === selectedCategory);
    const withCollection = selectedCategory === 'My Collection'
      ? all.filter((b) => {
          const key = b._id || b.driveUrl || b.title;
          return savedKeys.includes(key);
        })
      : all;
    if (!q) return withCollection;
    return withCollection.filter((b) =>
      [b.title, b.description, b.category].filter(Boolean).some((t) => String(t).toLowerCase().includes(q))
    );
  }, [books, query, selectedCategory, savedKeys]);

  return (
    <div id="books" className="w-full h-fit flex flex-col items-center justify-center gap-8 py-16">
      {/* Header */}
  <span className="w-full h-fit flex flex-col items-center justify-center gap-2 mb-6">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-200 tracking-tight mb-2">
          PUstacks Library
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center mt-2">
          All books in one place. Click to open or download via Google Drive.
        </p>
      </span>

      {/* Subjects / Categories */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Subjects</h3>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 snap-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={
                `whitespace-nowrap snap-start px-3 py-1 rounded-full text-sm border transition ` +
                (selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow'
                  : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 border-slate-200/70 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700')
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div className="w-full">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition" />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-1">
            <div className="flex items-center bg-slate-50 dark:bg-slate-700 rounded-xl px-4 py-3 gap-3">
              <span aria-hidden>🔎</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, description, subject..."
                className="flex-1 bg-transparent outline-none text-slate-700 dark:text-slate-200 text-base placeholder-slate-400 dark:placeholder-slate-500"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  aria-label="Clear search"
                >
                  ✖
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="w-full">
        {loading ? (
          <div className="text-center py-12 text-xl text-blue-600 dark:text-blue-300 animate-pulse">
            Loading books...
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((book) => (
              <BookCard key={book._id || book.driveUrl || book.title} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {selectedCategory === 'My Collection'
                ? 'No saved books yet'
                : query
                ? 'No results match your search'
                : 'No books found'}
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {selectedCategory === 'My Collection'
                ? 'Click “Save” on any book to add it to your collection.'
                : query
                ? 'Try a different keyword or clear the search.'
                : 'The library is currently empty.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksSection;
