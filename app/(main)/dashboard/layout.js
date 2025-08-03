"use client";
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

// This is the correct layout for the protected section of your app.
// It provides the Navbar and then renders the specific page (like the dashboard).
export default function MainLayout({ children }) {
  const [user, setUser] = useState(null);

  // We still need to fetch the user here to pass it to the Navbar
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to fetch user for navbar', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <main>{children}</main>
    </>
  );
}