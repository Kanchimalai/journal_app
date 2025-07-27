// HomePage.js
import Link from 'next/link';
import Image from 'next/image'; // Import Image component for the logo
import styles from './HomePage.module.css';
import journal from "./journal.png"

export default function HomePage() {
  return (
    <div className={styles.pageContainer}>
      {/* Background shapes */}
      <div className={`${styles.shape} ${styles.shapeOne}`}></div>
      <div className={`${styles.shape} ${styles.shapeTwo}`}></div>
      <div className={`${styles.shape} ${styles.shapeThree}`}></div>

      {/* Integrated Navigation Bar */}
      <nav className={styles.homeNavbar}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.homeBrandLink}> {/* Changed to homeBrandLink to wrap both logo and text */}
            {/* Logo Image */}
            <Image
              src={journal} // Placeholder logo URL
              alt="Daily Journal Logo"
              width={30}
              height={30}
              className={styles.homeLogo}
            />
            Daily Journal
          </Link>
          <div className={styles.navLinks}>
            {/* The login button, styled transparent */}
            <Link href="/login" className={styles.homeLoginButton}>
              Login
            </Link>
          </div>
        </div>
      </nav>

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Text content container - now on the left */}
          <div className={styles.textContainer}>
            <h1 className={styles.title}>Welcome to Your Daily Journal</h1>
            <p className={styles.subtitle}>
              Capture your thoughts, track your progress, and find clarity, one entry at a time.
            </p>
            <Link href="/register" className={styles.ctaButton}>
              Get Started
            </Link>
          </div>

          {/* Phone preview container - now on the right, with detailed UI */}
          <div className={styles.phonePreview}>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneScreen}>
                {/* Status Bar */}
                <div className={styles.statusBar}>
                  <span className={styles.time}>9:41</span>
                  <div className={styles.signalIcons}>
                    {/* Wi-Fi icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="20" x2="12" y2="12"></line>
                      <line x1="16" y1="16" x2="16" y2="12"></line>
                      <line x1="8" y1="16" x2="8" y2="12"></line>
                    </svg>
                    {/* Battery icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"></path>
                      <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"></path>
                      <line x1="17" y1="6" x2="17" y2="18"></line>
                    </svg>
                  </div>
                </div>

                {/* App Header */}
                <div className={styles.appHeader}>
                  Daily Journal
                </div>

                {/* Content Card */}
                <div className={styles.contentCard}>
                  <div className={styles.cardImage}>
                    {/* Mimicking the water image with a gradient */}
                  </div>
                  <p className={styles.cardText}>
                    Fiomycote reactiygtihn ambototeo recatinga the minutorel.
                  </p>
                </div>

                {/* Floating Action Button */}
                <button className={styles.fabButton}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
