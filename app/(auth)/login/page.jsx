"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' }); 
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' }); 

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Login successful! Redirecting to dashboard...' }); 
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh(); 
        }, 1500); 
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.message || 'Failed to login' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    }
  };

  return (
    <div className={styles.pageContainer}> 
      <div className={styles.formCard}> 
        <h1 className={styles.formTitle}>Login</h1> 

        
        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.loginForm}> 
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
            />
          </div>
          <button type="submit" className={styles.submitButton}>Login</button> 
        </form>
        <p className={styles.registerPrompt}> 
          Don't have an account? <Link href="/register" className={styles.registerLink}>Register here</Link> 
        </p>
      </div>
    </div>
  );
}
