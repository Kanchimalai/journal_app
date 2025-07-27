'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import JournalCard from '../../components/JournalCard';
import styles from '../../components/JournalCard.module.css'; // Re-using some styles

export default function EntriesPage() {
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEntries = async () => {
    setLoading(true);
    let url = '/api/entries?';
    if (filterCategory) {
      url += `category=${filterCategory}&`;
    }
    if (searchTerm) {
        url += `search=${searchTerm}&`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
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
  }, [filterCategory, searchTerm]);

  const handleDelete = (deletedId) => {
    setEntries(entries.filter(entry => entry._id !== deletedId));
  };

  return (
    <div className="container">
      <div className={styles.header}>
        <h1>Your Journal Entries</h1>
        <Link href="/new-entry" className="btn btn-primary">New Entry</Link>
      </div>
      
      <div className={styles.filters}>
        <input 
            type="text"
            placeholder="Search by title..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-control"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading entries...</p>
      ) : entries.length > 0 ? (
        <div className={styles.cardGrid}>
          {entries.map(entry => (
            <JournalCard key={entry._id} entry={entry} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p>No entries found. <Link href="/new-entry">Create one now!</Link></p>
      )}
    </div>
  );
}