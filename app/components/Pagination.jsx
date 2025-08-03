// components/Pagination.jsx
import React from 'react';
import styles from './Pagination.module.css'; // Create this CSS file

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Logic to show a limited number of page buttons around the current page
  const maxPageButtons = 5; // Max number of page buttons to display
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  const displayedPageNumbers = pageNumbers.slice(startPage - 1, endPage);

  return (
    <nav className={styles.paginationContainer}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        Previous
      </button>
      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={styles.paginationButton}>1</button>
          {startPage > 2 && <span className={styles.paginationEllipsis}>...</span>}
        </>
      )}
      {displayedPageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${styles.paginationButton} ${currentPage === number ? styles.active : ''}`}
        >
          {number}
        </button>
      ))}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className={styles.paginationEllipsis}>...</span>}
          <button onClick={() => onPageChange(totalPages)} className={styles.paginationButton}>{totalPages}</button>
        </>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.paginationButton}
      >
        Next
      </button>
    </nav>
  );
}