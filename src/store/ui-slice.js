import { createSlice } from '@reduxjs/toolkit';
const uiSlice = createSlice({
  name: 'ui',
  initialState: { isBannerVisible: true },
  reducers: {
    showBanner(state) {
      state.isBannerVisible = true;
    },
    hideBanner(state) {
      state.isBannerVisible = false;
    }
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
