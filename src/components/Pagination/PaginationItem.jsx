const PaginationItem = ({ pageNumber, onClick, isCurrentPage }) => {
	return (
		<button
			onClick={onClick}
			className={
				isCurrentPage ? 'border-2 bg-gray-300  w-6' : 'bg-gray-100 w-6'
			}
		>
			{pageNumber}
		</button>
	);
};

export default PaginationItem;
