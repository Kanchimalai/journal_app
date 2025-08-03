"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [dateInfo, setDateInfo] = useState({ day: '', month: '', dayOfWeek: '' });

    // Set the date information when the component mounts
    useEffect(() => {
        const today = new Date();
        const day = today.getDate().toString().padStart(2, '0');
        const month = today.toLocaleString('default', { month: 'long' });
        const dayOfWeek = today.toLocaleString('default', { weekday: 'long' });
        setDateInfo({ day, month, dayOfWeek });
    }, []);

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        fetchUser();
    }, []);

    if (!user) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.backgroundShapes}>
                <div className={styles.shape1}></div>
                <div className={styles.shape2}></div>
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.dateDisplay}>
                    <div className={styles.dateDay}>{dateInfo.day}</div>
                    <div className={styles.dateMonthYear}>
                        <span className={styles.dateMonth}>{dateInfo.month}</span>
                        <span className={styles.dateDayOfWeek}>{dateInfo.dayOfWeek}</span>
                    </div>
                </div>

                <div className={styles.welcomeMessage}>
                    <h1 className={styles.welcomeTitle}>Welcome, {user.name}</h1>
                    <p className={styles.welcomeSubtitle}>What's on your mind today?</p>
                </div>

                <div className={styles.actionButtons}>
                    <Link href="/new-entry" className={styles.mainAction}>
                        <span>Start Today's Entry</span>
                        <span className={styles.arrowIcon}>→</span>
                    </Link>
                    <Link href="/entries" className={styles.secondaryAction}>
                        View Past Entries
                    </Link>
                </div>
            </div>
        </div>
    );
}