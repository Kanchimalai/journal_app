'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import JournalForm from '../../../../components/JournalForm';
import styles from '../../../new-entry/new-entry.module.css'; // Reuse style

export default function EditEntryPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchEntry = async () => {
        try {
          const res = await fetch(`/api/entries/${id}`);
          if (res.ok) {
            const data = await res.json();
            setInitialData(data);
          } else {
            console.error('Failed to fetch entry');
            router.push('/entries');
          }
        } catch (error) {
          console.error('Error fetching entry:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchEntry();
    }
  }, [id, router]);

  const handleSuccess = () => {
    router.push('/entries');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Edit Journal Entry</h1>
      {initialData ? (
        <JournalForm onSuccess={handleSuccess} initialData={initialData} />
      ) : (
        <p>Entry not found.</p>
      )}
    </div>
  );
}