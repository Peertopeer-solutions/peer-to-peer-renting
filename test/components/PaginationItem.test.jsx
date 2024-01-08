import PaginationItem from '../../src/components/PaginationItem';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { vi, expect, describe, test, afterEach } from 'vitest';

afterEach(cleanup);

describe('Pagination Item Component', () => {
	test('test if pagination item is being rendered', async () => {
		render(<PaginationItem pageNumber={2} />);
		expect(screen.getByText('2')).toBeInTheDocument();
	});

	test('test that on click works', async () => {
		const onPageChangeMock = vi.fn();

		render(<PaginationItem onClick={onPageChangeMock} />);
		const button = screen.getByRole('button');
		fireEvent.click(button);
		screen.debug();
		expect(onPageChangeMock).toHaveBeenCalled();
	});
});
