"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css'; // Import the new CSS module

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' }); // Consolidated message state for error/success
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' }); // Clear previous messages

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Login successful! Redirecting to dashboard...' }); // Added success message
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh(); // Important to refresh and let middleware redirect
        }, 1500); // Short delay for message visibility
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.message || 'Failed to login' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    }
  };

  return (
    <div className={styles.pageContainer}> {/* Applied for full-page centering and background */}
      <div className={styles.formCard}> {/* Applied for the card-like styling */}
        <h1 className={styles.formTitle}>Login</h1> {/* Applied for title styling */}

        {/* Display messages (error or success) */}
        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.loginForm}> {/* Applied for form width */}
          <div className={styles.inputGroup}> {/* Applied for input grouping and spacing */}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Login</button> {/* Applied for button styling */}
        </form>
        <p className={styles.registerPrompt}> {/* Applied for redirect text styling */}
          Don't have an account? <Link href="/register" className={styles.registerLink}>Register here</Link> {/* Applied for link styling */}
        </p>
      </div>
    </div>
  );
}
