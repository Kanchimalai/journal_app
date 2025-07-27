'use client';
import { useRouter } from 'next/navigation';
import JournalForm from '../../components/JournalForm';
import styles from './new-entry.module.css';

export default function NewEntryPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/entries');
  };

  return (
    <div className={styles.container}>
      <h1>Create a New Journal Entry</h1>
      <JournalForm onSuccess={handleSuccess} />
    </div>
  );
}