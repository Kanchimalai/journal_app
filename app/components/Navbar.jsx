
"use client";
import Link from 'next/link';
import Image from 'next/image'; 
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar({ user  }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href={user ? "/dashboard" : "/"} className={styles.brandLink}>
          <Image src="/journal.png" alt="Daily Journal Logo" width={30} height={30} className={styles.brandLogo} />
          Daily Journal
        </Link>
        <div className={styles.navLinks}>
          {user ? (
            <>
          
              <Link href="/dashboard" className={styles.navItem}>Dashboard</Link>
              <Link href="/entries" className={styles.navItem}>All Entries</Link>
              <Link href="/new-entry" className={styles.navItem}>New Entry</Link>
              
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
             
              <Link href="/login" className={styles.loginButton}>Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
