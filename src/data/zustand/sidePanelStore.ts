import { create } from 'zustand';
type State = {
	open: boolean;
};

type Actions = {
	actions: {
		openSidePanel: () => void;
		closeSidePanel: () => void;
	};
};
const useSidePanel = create<State & Actions>()((set) => ({
	open: false,
	actions: {
		openSidePanel: () => set(() => ({ open: true })),
		closeSidePanel: () => set(() => ({ open: false })),
	},
}));

export default useSidePanel;
