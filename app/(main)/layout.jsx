"use client";
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar user={user} />
      <main>
        {loading ? <p>Loading...</p> : children}
      </main>
    </div>
  );
}