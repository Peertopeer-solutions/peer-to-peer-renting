import React from 'react'

const Pagination = ({ currentPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / 10);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={currentPage === i ? "border-2 bg-gray-300  w-6" : "bg-gray-100 w-6"}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="max-w-max mx-auto m-3 ">
      <ul className='space-x-2'>{pages}</ul>
    </div>
  );
};

export default Pagination
