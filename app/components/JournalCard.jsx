'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './JournalCard.module.css';

export default function JournalCard({ entry, onDelete }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        const res = await fetch(`/api/entries/${entry._id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          onDelete(entry._id);
        } else {
          alert('Failed to delete entry.');
        }
      } catch (error) {
        console.error('Error deleting entry:', error);
        alert('An error occurred while deleting the entry.');
      }
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{entry.title}</h3>
        <p className={styles.cardDate}>{new Date(entry.date).toLocaleDateString()}</p>
        <p className={styles.cardContent}>
            {entry.content.substring(0, 150)}{entry.content.length > 150 && '...'}
        </p>
        <div className={styles.categories}>
            {entry.categories.map(cat => (
                <span key={cat._id} className={styles.categoryTag}>{cat.name}</span>
            ))}
        </div>
      </div>
      <div className={styles.cardFooter}>
        <Link href={`/entries/${entry._id}/edit`} className={styles.editLink}>Edit</Link>
        <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
}