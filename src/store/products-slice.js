import { createSlice } from '@reduxjs/toolkit';
const productsSlice = createSlice({
	name: 'products',
	initialState: { currentPage: 1 },
	reducers: {
		setPage(state, { payload: { page } }) {
			state.currentPage = page;
		}
	},
});

export const productsAction = productsSlice.actions;
export default productsSlice;
