import React from 'react';
import PaginationItem from './PaginationItem';
import { useDispatch } from 'react-redux';
import { productsAction } from '../../store/products-slice';
import { FaArrowLeft } from 'react-icons/fa';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

const Pagination = ({ currentPage, totalItems, onPageChange }) => {
	const dispatch = useDispatch();
	function updateCurrentPage(pageNumber) {
		dispatch(productsAction.setPage({ page: pageNumber }));
	}
	const totalPages = Math.ceil(totalItems / 8);

	const pages = [];
	// pages.push();
	for (let i = 1; i <= totalPages; i++) {
		pages.push(
			<PaginationItem
				key={`page-number-${i}`}
				isCurrentPage={currentPage === i}
				onClick={updateCurrentPage.bind(null, i)}
			>
				{i}
			</PaginationItem>
		);
	}
	return (
		<div className='m-3 mx-auto max-w-max '>
			<ul className='border flex border-gray-300 rounded overflow-hidden'>
				<PaginationItem>Prev</PaginationItem>
				{pages}
				<PaginationItem>Next</PaginationItem>
			</ul>
		</div>
	);
};

export default Pagination;
