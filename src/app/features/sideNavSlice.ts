import { createSlice } from "@reduxjs/toolkit";

interface ISideNavState {
  showSideNav: boolean;
}
const initialState: ISideNavState = {
  showSideNav: false,
};
const sideNavSlice = createSlice({
  name: "sideNav",
  initialState,
  reducers: {
    toggleSideNav: (state) => {
      state.showSideNav = !state.showSideNav;
    },
    openSideNav: (state) => {
      state.showSideNav = true;
    },
    closeSideNav: (state) => {
      state.showSideNav = false;
    },
  },
});

export const { toggleSideNav, openSideNav, closeSideNav } =
  sideNavSlice.actions;
export default sideNavSlice.reducer;
