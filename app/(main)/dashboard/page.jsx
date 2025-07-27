// app/(main)/dashboard/page.jsx
"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css'; // Import the CSS module

export default function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                // Handle case where user is not authenticated or session expired
                // Optionally redirect to login
                // router.push('/login');
            }
        };
        fetchUser();
    }, []);

    if (!user) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.loadingContent}>
                    <p>Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.dashboardContent}>
                <h1 className={styles.welcomeTitle}>Hi, {user.name}!</h1>
                <p className={styles.welcomeSubtitle}>Welcome back to your daily journal. What would you like to do today?</p>
                <div className={styles.buttonGroup}>
                    <Link href="/new-entry" className={styles.dashboardButton}>
                        ➕ Add New Journal
                    </Link>
                    <Link href="/entries" className={styles.dashboardButton}>
                        📂 View All Entries
                    </Link>
                </div>
            </div>
        </div>
    );
}
