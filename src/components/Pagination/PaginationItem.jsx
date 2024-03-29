import { productsAction } from '../../store/products-slice';
import { twMerge } from 'tailwind-merge';

const PaginationItem = ({ isCurrentPage, onClick, children }) => {
	const selectedStyle = isCurrentPage ? 'bg-gray-300 hover:bg-gray-300' : '';
	return (
		<button
			onClick={onClick}
			className={twMerge(
				'bg-gray-100 py-1 px-3 border-r border-gray-300 last:border-none flex items-center hover:bg-gray-200',
				selectedStyle
			)}
		>
			<span className='flex flex-col'>{children}</span>
		</button>
	);
};

export default PaginationItem;
