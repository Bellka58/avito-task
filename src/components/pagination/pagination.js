import React from 'react';
import './pagination.css';

const Pagination = ({ currentPage, setCurrentPage, pagesCount = 1 }) => {
  const pagesList = Array.from({ length: pagesCount }, (_, k) => k + 1);
  
  const renderPaginationItem = (page) => {
    return (
      <div
        onClick={() => setCurrentPage(page)}
        key={page}
        className={`pagination__item ${page === currentPage ? "active" : ""}`}
      >
        {page}
      </div>
    );
  };
  return (
    <div className="pagination">
      {pagesList.map(renderPaginationItem)}
    </div>
  )
};

export default Pagination;