import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emptyForm = { title: '', description: '', category: '', driveUrl: '' };

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const adminKey = useMemo(() => localStorage.getItem('adminKey') || '', []);

  useEffect(() => {
    if (!adminKey) {
      navigate('/admin');
      return;
    }
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/books');
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (e) {
      setError('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const upsertBook = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/books/${editingId}` : '/api/books';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg.error || 'Request failed');
      }
      setForm(emptyForm);
      setEditingId(null);
      await fetchBooks();
    } catch (e) {
      setError(e.message);
    }
  };

  const startEdit = (book) => {
    setForm({
      title: book.title || '',
      description: book.description || '',
      category: book.category || '',
      driveUrl: book.driveUrl || '',
    });
    setEditingId(book._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteBook = async (id) => {
    if (!confirm('Delete this book?')) return;
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      });
      if (!res.ok) throw new Error('Failed to delete');
      await fetchBooks();
    } catch (e) {
      setError(e.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminKey');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl"
          >
            Logout
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={upsertBook}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">Title</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">Category</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">Description</label>
            <textarea
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">
              Google Drive URL
            </label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
              value={form.driveUrl}
              onChange={(e) => setForm({ ...form, driveUrl: e.target.value })}
              required
            />
          </div>
          {error && <div className="md:col-span-2 text-red-600">{error}</div>}
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              {editingId ? 'Update Book' : 'Add Book'}
            </button>
            {editingId && (
              <button
                type="button"
                className="px-5 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-xl"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow divide-y divide-slate-200 dark:divide-slate-700">
          <div className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-200">Books ({books.length})</div>
          {loading ? (
            <div className="p-6 text-slate-500">Loading...</div>
          ) : books.length === 0 ? (
            <div className="p-6 text-slate-500">No books yet.</div>
          ) : (
            books.map((b) => (
              <div key={b._id} className="p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <div className="flex-1">
                  <div className="font-medium text-slate-900 dark:text-white">{b.title}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{b.description}</div>
                  <div className="text-xs mt-1 text-blue-700 dark:text-blue-300">{b.category}</div>
                  <a
                    href={b.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-green-700 dark:text-green-300 break-all"
                  >
                    {b.driveUrl}
                  </a>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
                    onClick={() => startEdit(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    onClick={() => deleteBook(b._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
