import { render, screen } from '@testing-library/react';
import { describe, test, vi, afterEach, expect } from 'vitest';
import Pagination from '../../src/components/Pagination/Pagination';

describe('Pagination Component', () => {
	test('test that pagination item are being rendered', () => {
		const { container } = render(
			<Pagination currentPage={1} totalItems={50} onPageChange={vi.fn()} />
		);
		expect(container).toBeInTheDocument();
		const paginationItems = screen.getAllByRole('button');
		expect(paginationItems).toHaveLength(5);
	});
});
