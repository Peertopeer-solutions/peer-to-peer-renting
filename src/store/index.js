import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './products-slice';
import uiSlice from './ui-slice';

const store = configureStore({
	reducer: {
		products: productsSlice.reducer,
		ui: uiSlice.reducer,
	},
});

export default store;
