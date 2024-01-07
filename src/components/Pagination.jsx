import React from 'react';
import PaginationItem from './PaginationItem';

const Pagination = ({ currentPage, totalItems, onPageChange }) => {
	const totalPages = Math.ceil(totalItems / 10);

	const pages = [];
	for (let i = 1; i <= 4; i++) {
		pages.push(
			<PaginationItem
				key={`page-number-${i}`}
				pageNumber={i}
				isCurrentPage={currentPage === i}
				onClick={onPageChange.bind(null, i)}
			/>
		);
	}
	return (
		<div className='m-3 mx-auto max-w-max '>
			<ul className='space-x-2'>{pages}</ul>
		</div>
	);
};

export default Pagination;
