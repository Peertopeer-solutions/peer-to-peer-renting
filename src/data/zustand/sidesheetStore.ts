import { create } from 'zustand';

type State = {
	element?: string;
	props: Record<string, any>;
};

type Actions = {
	actions: {
		updateSheet: (element: string, props?: Record<string, any>) => void;
	};
};

const useSideSheet = create<State & Actions>()((set) => ({
	element: undefined,
	props: {},
	actions: {
		updateSheet: (element, props) => {
			set((state) => ({
				element: element || state.element,
				props: props || {},
			}));
		},
	},
}));

export default useSideSheet;
