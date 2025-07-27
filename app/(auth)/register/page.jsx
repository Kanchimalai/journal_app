"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './register.module.css';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added state for confirm password
  const [message, setMessage] = useState({ type: '', text: '' }); // Consolidated message state for error/success
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' }); // Clear previous messages

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Registration successful! Redirecting to login...' });
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.message || 'Failed to register' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    }
  };

  return (
    <div className={styles.pageContainer}> {/* Applied for full-page centering and background */}
      <div className={styles.formCard}> {/* Applied for the card-like styling */}
        <h1 className={styles.formTitle}>Register</h1> {/* Applied for title styling */}

        {/* Display messages (error or success) */}
        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.registrationForm}> {/* Applied for form width */}
          <div className={styles.inputGroup}> {/* Applied for input grouping and spacing */}
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Full Name"
              required
            />
          </div>
          <div className={styles.inputGroup}>
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
              minLength="6"
            />
          </div>
          <div className={styles.inputGroup}> {/* New input group for confirm password */}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Register</button> {/* Applied for button styling */}
        </form>
        <p className={styles.loginPrompt}> {/* Applied for redirect text styling */}
          Already have an account? <Link href="/login" className={styles.loginLink}>Login here</Link> {/* Applied for link styling */}
        </p>
      </div>
    </div>
  );
}
