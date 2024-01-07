import PaginationItem from '../../src/components/PaginationItem';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { vi, expect, describe, test, afterEach } from 'vitest';

afterEach(cleanup);
describe('Pagination Component', () => {
	async function getOriginalComponent() {
		return (await vi.importActual('../../src/components/PaginationItem'))
			.default;
	}

	test('test if pagination item is being rendered', async () => {
		const PaginationItem = await getOriginalComponent();

		render(<PaginationItem pageNumber={2} />);
		expect(screen.getByText('2')).toBeInTheDocument();
	});

	test('test if correct props are being passed to pagination item', () => {
		// console.log(PaginationItem,);
		vi.mock('../../src/components/PaginationItem');
		const props = {
			pageNumber: 2,
			isCurrentPage: true,
			onClick: vi.fn(),
		};
		render(<PaginationItem {...props} />);
		expect(PaginationItem).toBeCalledWith({ ...props }, expect.anything());
	});

	test('test that on click works', async () => {
		const PaginationItem = await getOriginalComponent();
		const onPageChangeMock = vi.fn();

		render(<PaginationItem onClick={onPageChangeMock} />);
		const button = screen.getByRole('button');
		fireEvent.click(button);
		screen.debug();
		expect(onPageChangeMock).toHaveBeenCalled();
	});
});
