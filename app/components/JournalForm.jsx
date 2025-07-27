'use client';
import { useState, useEffect } from 'react';
import styles from './JournalForm.module.css';

export default function JournalForm({ onSuccess, initialData }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [categories, setCategories] = useState(''); // Comma-separated string
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setDate(new Date(initialData.date).toISOString().split('T')[0]);
      setCategories(initialData.categories.map(cat => cat.name).join(', '));
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const categoryNames = categories.split(',').map(cat => cat.trim()).filter(Boolean);

    const entryData = {
      title,
      content,
      date,
      categoryNames
    };

    try {
      const url = initialData ? `/api/entries/${initialData._id}` : '/api/entries';
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entryData),
      });

      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className="form-control"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="categories">Categories</label>
        <input
          id="categories"
          type="text"
          className="form-control"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          placeholder="e.g., Work, Personal, Ideas"
        />
        <small>Separate categories with a comma.</small>
      </div>
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Saving...' : 'Save Entry'}
      </button>
    </form>
  );
}