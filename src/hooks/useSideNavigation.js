import { SIDE_NAVIGATION } from '@src/constant/sidesheet';
import useSidePanel from '@src/data/zustand/sidePanelStore';
import useSideSheet from '@src/data/zustand/sidesheetStore';
import AuthContext from '@src/FirebaseAuthContext';
import useAuthStatus from '@src/hooks/useAuthStatus';
import { useCallback, useContext } from 'react';

export default function useSideNavigation() {
	const openPanel = useSidePanel((state) => state.actions.openSidePanel);
	const closePanel = useSidePanel((state) => state.actions.closeSidePanel);
	const updateSheet = useSideSheet((state) => state.actions.updateSheet);

	const openSideNavigation = useCallback(() => {
		updateSheet(SIDE_NAVIGATION, { test: 'test' });
		openPanel();
	}, [updateSheet, openPanel]);

	return { openSideNavigation, closeSideNavigation: closePanel };
}
