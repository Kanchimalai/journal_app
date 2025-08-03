'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import JournalCard from '../../components/JournalCard';
import styles from './AllEntries.module.css'; // This will be our main layout CSS

export default function EntriesPage() {
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEntries = async () => {
    setLoading(true);
    let url = '/api/entries?'; // No pagination parameters here
    if (filterCategory) {
      url += `category=${filterCategory}&`;
    }
    if (searchTerm) {
      url += `search=${searchTerm}&`;
    }

    // Remove trailing '&' if any
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      // Assuming your API now returns just an array of entries
      setEntries(data);
    } catch (error) {
      console.error("Failed to fetch entries", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [filterCategory, searchTerm]); // Re-fetch only when filters/search change

  const handleDelete = (deletedId) => {
    // Optimistically update UI
    setEntries(prevEntries => prevEntries.filter(entry => entry._id !== deletedId));
    // Consider re-fetching entries after deletion to ensure the list is accurate
    // fetchEntries();
  };

  return (
    <div className={styles.pageLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Filters</h2>
          <Link href="/new-entry" className={styles.addNewButton}>New Entry</Link>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="search-input" className={styles.filterLabel}>Search by Title</label>
          <input
            id="search-input"
            type="text"
            placeholder="Search..."
            className={styles.filterInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="category-select" className={styles.filterLabel}>Filter by Category</label>
          <select
            id="category-select"
            className={styles.filterSelect}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <h1 className={styles.mainContentTitle}>Your Journal Entries</h1>

        {loading ? (
          <p className={styles.loadingState}>Loading entries...</p>
        ) : entries.length > 0 ? (
          <div className={styles.cardGrid}>
            {entries.map(entry => (
              <JournalCard key={entry._id} entry={entry} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>No entries found matching your criteria. <Link href="/new-entry" className={styles.emptyStateLink}>Create one now!</Link></p>
        )}
      </main>
    </div>
  );
}